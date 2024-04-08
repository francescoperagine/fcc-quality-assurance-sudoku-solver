'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      let row = coordinate[0].charCodeAt(0) - 65;
      let column = parseInt(coordinate[1]) - 1;
      let validRow = solver.checkRowPlacement(puzzleString, row, column, value);
      let validCol = solver.checkColPlacement(puzzleString, row, column, value);
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
      if (conflicts.length === 0) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false, conflict: conflicts });
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let solution = solver.solve(puzzleString);
      if (solution.error) {
        res.json({ error: solution.error });
      } else {
        res.json({ solution: solution.solution });
      }
    });
};
