// https://leetcode.com/problems/search-a-2d-matrix/description/


/**
 * 1st approach - find row using binary search, then find element in that row, also using binary search. O(log n) + O(log m)
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let start = 0;
  let end = m;
  let rowInd = -1;

  while (start < end) {
      const mid = start + Math.floor((end - start) / 2);
      if (isInRow(matrix, mid, target)) {
          rowInd = mid;
          break;
      } else if (matrix[mid][0] > target) {
          end = mid;
      } else {
          start = mid + 1;
      }
  }

  if (rowInd === -1) {
      return false;
  }

  start = 0;
  end = n;
  const row = matrix[rowInd];
  while (start < end) {
      const mid = start + Math.floor((end - start) / 2);
      if (row[mid] === target) {
          return true;
      } else if (row[mid] > target) {
          end = mid;
      } else {
          start = mid + 1;
      }
  }

  return false;
};

const isInRow = (matrix, rowInd, value) => {
  const first = matrix[rowInd][0];
  const last = matrix[rowInd][matrix[0].length - 1];
  return value <= last && value >= first ? true : false;
};


/**
 * 2nd approach - think of matrix as of array. Same time complexity, less code.
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let start = 0;
  let end = m * n;

  while (start < end) {
      const mid = start + Math.floor((end - start) / 2);
      const matrixEl = matrix[Math.floor(mid / n)][mid % n];
      if (matrixEl === target) {
          return true;
      } else if (matrixEl > target) {
          end = mid;
      } else {
          start = mid + 1;
      }
  }

  return false;
};