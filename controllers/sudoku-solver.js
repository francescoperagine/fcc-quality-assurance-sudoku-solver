const validStringRegex = /^[1-9.]{81}$/
const validValueRegex = /^[1-9.]$/

const requiredFieldMissing = { error: 'Required field missing' };
const invalidCharacters = { error: 'Invalid characters in puzzle' };
const invalidLength = { error: 'Expected puzzle to be 81 characters long' };
const puzzleCannotBeSolved = { error: 'Puzzle cannot be solved' };



class SudokuSolver {

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
    return !colValues.includes(value.toString());
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
    console.log(regionValues);

    return !regionValues.includes(value.toString());
  }

  validateValue(value) {
    if(!validValueRegex.test(value)) {
      return invalidValue;
    } else {
      return true;
    }
  }

  validate(puzzleString) {
    if (!puzzleString) {
      return requiredFieldMissing;
    } else if (puzzleString.length !== 81) {
      return invalidLength;
    } else if (!validStringRegex.test(puzzleString)) {
      return invalidCharacters;
    } else {
      return true;
    }
  }

  solve(puzzleString) {
    let result;
    const isValid = this.validate(puzzleString);
    if (isValid !== true) {
      result = isValid;
    } else {
      const solved = this.solvePuzzle(puzzleString);
      if (solved === false) {
        result = puzzleCannotBeSolved;
      } else {
        result = { solution: solved };
      }
    }

    return result
  }

  solvePuzzle(puzzleString) {
    const emptyIndex = puzzleString.indexOf('.');
    if (emptyIndex === -1) {
      return puzzleString;
    }

    const row = Math.floor(emptyIndex / 9);
    const col = emptyIndex % 9;

    for (let value = 1; value <= 9; value++) {
      if (this.checkRowPlacement(puzzleString, row, value) &&
        this.checkColPlacement(puzzleString, col, value) &&
        this.checkRegionPlacement(puzzleString, row, col, value)) {
        const newPuzzleString = puzzleString.slice(0, emptyIndex) + value + puzzleString.slice(emptyIndex + 1);
        const result = this.solvePuzzle(newPuzzleString);
        if (result) {
          return result;
        }
      }
    }

    return false;
  }
}

module.exports = SudokuSolver;

