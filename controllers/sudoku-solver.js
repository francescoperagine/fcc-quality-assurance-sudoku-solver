const validStringRegex = /^[1-9.]{81}$/

class SudokuSolver {

  validate(puzzleString) {
    let result;
    if (puzzleString.length !== 81) {
      result = { error: 'Expected puzzle to be 81 characters long' }
    } else if (!validStringRegex.test(puzzleString)) {
      result = { error: 'Invalid characters in puzzle' }
    } else {
      result = true
    }
    return result
  }

  getValues(puzzleString, startIndex, step, length) {
    return Array.from({ length }, (_, index) => puzzleString[startIndex + step * index]);
  }

  checkRowPlacement(puzzleString, row, value) {
    const rowStart = row * 9;
    const rowValues = this.getValues(puzzleString, rowStart, 1, 9);
    return !rowValues.includes(value.toString());
  }

  checkColPlacement(puzzleString, column, value) {
    const colValues = this.getValues(puzzleString, column, 9, 9);
    const isValidPlacement = !colValues.some(val => val === value.toString() && val !== '.');
    return isValidPlacement;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;
    const regionValues = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionValues.push(puzzleString[(regionRowStart + i) * 9 + regionColStart + j]);
      }
    }

    return !regionValues.includes(value);
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return { error: 'Invalid characters in puzzle' }
    }
    return { solution: puzzleString }    
  }
}

module.exports = SudokuSolver;

