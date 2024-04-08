const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
const invalidLengthString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678123';
const invalidCharString = '123-56789123456789123456789123456789123456@89123456789123456789123456789123456781';

suite('Functional Tests', () => {
    suite('POST request to /api/check', () => {
        test('Check a puzzle placement with all fields', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: ".69235418851496372432178956174569283395842761628713549283657194516924837947381625",
                    coordinate: 'A1',
                    value: "7"
                })
                .end((err, res) => {
                    assert.isOk(res.status, 200);
                    assert.property(res.body, 'valid');
                    assert.equal(res.body.valid, true);
                    done();
                });
        });
        test('Check a puzzle placement with single placement conflict', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
                    coordinate: 'A1',
                    value: "6"
                })
                .end((err, res) => {
                    assert.isOk(res.status, 200);
                    assert.property(res.body, 'valid');
                    assert.equal(res.body.valid, false);
                    assert.property(res.body, 'conflict');
                    assert.equal(res.body.conflict.length, 1);
                    done();
                });
        });
        test('Check a puzzle placement with multiple placement conflicts', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
                    coordinate: 'A1',
                    value: "9"
                })
                .end((err, res) => {
                    assert.isOk(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.isTrue(res.body.conflict.length > 1);
                    done();
                });
        });
        test('Check a puzzle placement with all placement conflicts', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'B3',
                    value: "2"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.isTrue(res.body.conflict.length == 3);
                    done();
                });
        });
        test('Check a puzzle placement with missing required fields', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A1'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Check a puzzle placement with invalid characters', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: invalidCharString,
                    coordinate: 'A1',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('Check a puzzle placement with incorrect length', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: invalidLengthString,
                    coordinate: 'A1',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('Check a puzzle placement with missing required string', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    coordinate: 'A1',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement coordinate', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A10',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid coordinate');
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement value', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A1',
                    value: 10
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value');
                    done();
                });
        });

    });

    suite('POST request to /api/solve', () => {
        test('Solve a puzzle with valid puzzle string', (done) => {
            chai.request(server)
                .post('/api/solve')
                .send({ puzzle: validString })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.solution, validString);
                    done();
                });
        });

        test('Solve a puzzle with missing puzzle string', (done) => {
            chai.request(server)
                .post('/api/solve')
                .send({})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field missing');
                    done();
                });
        });

        test('Solve a puzzle with invalid characters', (done) => {
            chai.request(server)
                .post('/api/solve')
                .send({ puzzle: invalidCharString })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('Solve a puzzle with incorrect length', (done) => {
            chai.request(server)
                .post('/api/solve')
                .send({ puzzle: invalidLengthString })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('Solve a puzzle that cannot be solved', (done) => {
            chai.request(server)
                .post('/api/solve')
                .send({
                    puzzle: "9.9.....8123456789234567891345678912456789123567891234678912345789123456891234567"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Puzzle cannot be solved');
                    done();
                });
        });
    });


});

