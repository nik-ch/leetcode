// https://leetcode.com/problems/word-search/description/
/**
 * For each cell in the given matrix check if word could be found in one of three possible directions
 * (three since we don't go back on the same line). Solution uses DFS (depth first search) strategy,
 * where we go as far as possible before we try next direction. Time complexity is O(N * 3 ^ L), where
 * L - length of the word.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const m = board.length;
  const n = board[0].length;
  if (n === 0) {
      return false;
  }

  let found = false;
  for (let i = 0; i < m && !found; i++) {
      for (let j = 0; j < n && !found; j++) {
          if (board[i][j] === word[0]) {
              found = checkWord(i, j, 1, m, n, board, word);
          }
      }
  }

  return found;
};

checkWord = (i, j, k, m, n, board, word) => {
  if (k === word.length) {
      return true;
  }
  // mark the path
  board[i][j] = '#';
  let res = false;
  // check to the right
  if (j + 1 < n) {
      if (board[i][j + 1] === word[k]) {
          res = checkWord(i, j + 1, k + 1, m, n, board, word);
          if (res) {
              return true;
          }
      }
  }
  // check to the bottom
  if (i + 1 < m) {
      if (board[i + 1][j] === word[k]) {
          res = checkWord(i + 1, j, k + 1, m, n, board, word);
          if (res) {
              return true;
          }
      }
  }
  // check to the left
  if (j - 1 >= 0) {
      if (board[i][j - 1] === word[k]) {
          res = checkWord(i, j - 1, k + 1, m, n, board, word);
          if (res) {
              return true;
          }
      }
  }
  // check to the top
  if (i - 1 >= 0) {
      if (board[i - 1][j] === word[k]) {
          res = checkWord(i - 1, j, k + 1, m, n, board, word);
          if (res) {
              return true;
          }
      }
  }
  // cleanup
  board[i][j] = word[k-1];
  return res;
}