const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validString = '123456789123456789123456789123456789123456789123456789123456789123456789123456789';
const invalidLengthString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678123';
const invalidCharString = '123-56789123456789123456789123456789123456@8912345678912345678912345678912345678';

suite('Functional Tests', () => {
    suite('POST request to /api/check', () => {
        test('Check a puzzle placement with all fields', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A1',
                    value: 1
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, true);
                    done();
                });
        });
        test('Check a puzzle placement with single placement conflict', (done) => {
            chai.request(server)
                .post('/api/check')
                .send({
                    puzzle: validString,
                    coordinate: 'A1',
                    value: 2
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, false);
                    assert.include(res.body.conflict, 'row');
                    done();
                });
        });
    //     test('Check a puzzle placement with multiple placement conflicts', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A1',
    //                 value: 3
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.valid, false);
    //                 assert.include(res.body.conflict, 'row');
    //                 assert.include(res.body.conflict, 'column');
    //                 done();
    //             });
    //     });
    //     test('Check a puzzle placement with all placement conflicts', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A1',
    //                 value: 4
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.valid, false);
    //                 assert.include(res.body.conflict, 'row');
    //                 assert.include(res.body.conflict, 'column');
    //                 assert.include(res.body.conflict, 'region');
    //                 done();
    //             });
    //     });
    //     test('Check a puzzle placement with missing required fields', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A1'
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Required field(s) missing');
    //                 done();
    //             });
    //     });


    //     test('Check a puzzle placement with invalid characters', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: invalidCharString,
    //                 coordinate: 'A1',
    //                 value: 1
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Invalid characters in puzzle');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with invalid length', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: invalidLengthString,
    //                 coordinate: 'A1',
    //                 value: 1
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with missing puzzle string', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 coordinate: 'A1',
    //                 value: 1
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Required field missing');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with missing coordinate', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 value: 1
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Required field missing');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with missing value', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A1'
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Required field missing');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with invalid coordinate', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A10',
    //                 value: 1
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Invalid coordinate');
    //                 done();
    //             });
    //     });

    //     test('Check a puzzle placement with invalid value', (done) => {
    //         chai.request(server)
    //             .post('/api/check')
    //             .send({
    //                 puzzle: validString,
    //                 coordinate: 'A1',
    //                 value: 10
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Invalid value');
    //                 done();
    //             });
    //     });

    // });

    // suite('POST request to /api/solve', () => {
    //     test('Solve a puzzle with valid puzzle string', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({ puzzle: validString })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.solution, validString);
    //                 done();
    //             });
    //     });

    //     test('Solve a puzzle with missing puzzle string', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({})
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Required field missing');
    //                 done();
    //             });
    //     });

    //     test('Solve a puzzle with invalid characters', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({ puzzle: invalidCharString })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Invalid characters in puzzle');
    //                 done();
    //             });
    //     });

    //     test('Solve a puzzle with invalid length', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({ puzzle: invalidLengthString })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
    //                 done();
    //             });
    //     });

        
    //     test('Solve a puzzle with incomplete puzzle', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({
    //                 puzzle: missingString
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Puzzle cannot be solved');
    //                 done();
    //             });
    //     });

    //     test('Solve a puzzle that cannot be solved', (done) => {
    //         chai.request(server)
    //             .post('/api/solve')
    //             .send({
    //                 puzzle: unsolvableString
    //             })
    //             .end((err, res) => {
    //                 assert.equal(res.status, 200);
    //                 assert.equal(res.body.error, 'Puzzle cannot be solved');
    //                 done();
    //             });
    //     });
    });


});

