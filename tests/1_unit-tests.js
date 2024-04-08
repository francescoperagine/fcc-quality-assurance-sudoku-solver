const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

suite('Unit Tests', () => {
    let solver;
    setup(() => {
        solver = new Solver();
    });

    suite('Function validate(puzzleString)', () => {
        test('Valid puzzle string of 81 characters', () => {
            // solver = new Solver();
            let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isTrue(solver.validate(puzzleString));
        });
        test('Invalid puzzle string with invalid characters (not 1-9 or .)', () => {
            // solver = new Solver();
            let puzzleString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678A';
            assert.isObject(solver.validate(puzzleString));
        });
            test('Invalid puzzle string that is not 81 characters in length', () => {
            // solver = new Solver();
            let puzzleString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678';
            assert.isObject(solver.validate(puzzleString));
        });
    });

    suite('Function checkRowPlacement(puzzleString, row, column, value)', () => {

        test('Valid row placement', () => {
            let puzzleString = '.23456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let row = 0;
            let value = '1';
            assert.isTrue(solver.checkRowPlacement(puzzleString, row, value));
        });
        test('Invalid row placement', () => {
            let puzzleString = '123456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let row = 0;
            let value = '1';
            assert.isFalse(solver.checkRowPlacement(puzzleString, row, value));
        });
    });

    suite('Function checkColPlacement(puzzleString, column, value)', () => {

        test('Valid column placement', () => {
            let puzzleString = '.s23456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let column = 0;
            let value = '1';
            assert.isTrue(solver.checkColPlacement(puzzleString, column, value));
        });
        test('Invalid column placement', () => {
            let puzzleString = '123456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let column = 0;
            let value = '1';
            assert.isFalse(solver.checkColPlacement(puzzleString, column, value));
        });
    });

    suite('Function checkRegionPlacement(puzzleString, row, column, value)', () => {
        test('Valid region (3x3 grid) placement', () => {

            let puzzleString = '.23456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let row = 0;
            let column = 0;
            let value = '5';
            assert.isTrue(solver.checkRegionPlacement(puzzleString, row, column, value));
        });
        test('Invalid region (3x3 grid) placement', () => {

            let puzzleString = '123456789123456789123456789123456789123456789123456789123456789123456789123456789';
            let row = 0;
            let column = 0;
            let value = '2';
            assert.isFalse(solver.checkRegionPlacement(puzzleString, row, column, value));
        });
    });

    suite('Function solve(puzzleString)', () => {
        test('Valid puzzle strings pass the solver', () => {
            solver = new Solver();
            let puzzleString = '123456789123456789123456789123456789123456789123456789123456789123456789123456789';

            let solution = solver.solve(puzzleString);
            assert.isObject(solution);
        });
        test('Invalid puzzle strings fail the solver', () => {
            solver = new Solver();
            let puzzleString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678A';
            let solution = solver.solve(puzzleString);
            assert.isObject(solution);
        });

        test('Solver returns the expected solution for an incomplete puzzle', () => {
            solver = new Solver();
            let puzzleString = '12345678912345678912345678912345678912345678912345678912345678912345678912345678';
            let solution = solver.solve(puzzleString);
            assert.isObject(solution);
        });
    });

});
