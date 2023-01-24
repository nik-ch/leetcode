// https://leetcode.com/problems/word-search/description/
/**
 * For each cell in the given matrix check if word could be found in one of three possible directions
 * (three since we don't go back on the same line). Solution uses DFS (depth first search) strategy,
 * where we go as far as possible before we try next direction. We also use backtracking method, to mark visited cells.
 * Time complexity is O(N * 3 ^ L), where L - length of the word.
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // rows count
    const m = board.length;
    // columns count
    const n = board[0].length;

    if (n === 0) {
        return false;
    }

    // [row, column]
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    const isSafe = (row, col) => {
        return row < m && row >= 0 && col < n && col >= 0;
    };

    const lookup = (indexInWord, row, col) => {
        if (indexInWord === word.length) {
            return true;
        }
        if (!isSafe(row, col) || word[indexInWord] !== board[row][col]) {
            return false;
        }
        // mark visisted cell
        board[row][col] = '#';
        for (let [rowDir, colDir] of directions) {
            const result = lookup(indexInWord + 1, row + rowDir, col + colDir);
            if (result) {
                return true;
            }
        }
        // cleanup
        board[row][col] = word[indexInWord];
        return false;
    };


    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const result = lookup(0, row, col);
            if (result) {
                return true;
            }
        }
    }

    return false;  
};