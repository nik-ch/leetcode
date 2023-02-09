// https://leetcode.com/problems/generate-parentheses/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (n === 1) {
      return ['()'];
  }

  const result = [];

  const buildRow = (row, diff, currInd) => {
      if (currInd === 2 * n) {
          if (diff === 0) {
              result.push(row);
          }
          return;
      } else {
          // check if we can't continue building current path
          // if available positions could not align parenthesis' count difference
          if (Math.abs(diff) > 2 * n - currInd) {
              return;
          } else {
              buildRow(row + '(', diff + 1, currInd + 1);
              if (diff > 0) {
                  buildRow(row + ')', diff - 1, currInd + 1);
              }
          }
      }
  };

  buildRow('', 0, 0);

  return result;
};