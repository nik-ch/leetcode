// https://leetcode.com/problems/valid-sudoku/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  const n = 9;
  const rowSets = [];
  const colSets = [];
  const boxSets = [];
  for (let i = 0; i < n; i++) {
      rowSets.push(new Set());
      colSets.push(new Set());
      boxSets.push(new Set());
  }

  for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
          if (board[r][c] === '.') {
              continue;
          }
          // check current row
          if (rowSets[r].has(board[r][c])) {
              return false;
          } else {
              rowSets[r].add(board[r][c]);
          }
          // check current column
          if (colSets[c].has(board[r][c])) {
              return false;
          } else {
              colSets[c].add(board[r][c]);
          }
          // check current box
          const boxInd = Math.floor(r / 3) * 3 + Math.floor(c / 3);
          if (boxSets[boxInd].has(board[r][c])) {
              return false;
          } else {
              boxSets[boxInd].add(board[r][c]);
          }
      }
  }

  return true;
};
