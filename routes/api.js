'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      const { puzzle: puzzleString, coordinate, value } = req.body;

      if (!puzzleString || !coordinate || value === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (puzzleString.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      if (!/^[1-9.]+$/.test(puzzleString)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      

      if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      let row = coordinate[0].toUpperCase().charCodeAt(0) - 65;
      let column = parseInt(coordinate[1], 10) - 1;

      let index = row * 9 + column;
      let currentValue = puzzleString[index];

      if (currentValue === value.toString()) {
          return res.json({ valid: true });
      }
      let validRow = solver.checkRowPlacement(puzzleString, row, value);
      let validCol = solver.checkColPlacement(puzzleString, column, value);
      let validRegion = solver.checkRegionPlacement(puzzleString, row, column, value);


      let conflicts = [];
      if (!validRow) {
        conflicts.push('row');
      }
      if (!validCol) {
        conflicts.push('column');
      }
      if (!validRegion) {
        conflicts.push('region');
      }

      let response;
      if (conflicts.length === 0) {
        response = { valid: true };
      } else {
        response = { valid: false, conflict: conflicts };
      }

      console.log(response);
      return res.json(response)
    });
    
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let solution = solver.solve(puzzleString);
      return res.json(solution);
    });
};
