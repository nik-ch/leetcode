// https://leetcode.com/problems/letter-case-permutation/description/

/**
 * Consider example: 'a1b2'. Possible ways are:
 *          a
 *       /      \
 *     A1        a1
 *    /  \     /    \
 * A1b2  A1B2  a1B2 a1b2
 *
 * So for each encountered letter we should create two new strings (one with initial case, one with altered).
 * O(n * 2 ^ n) time
 * O(n * 2 ^ n) space
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
  const result = [];

  const changeCase = (letter) => {
      return letter.match(/[A-Z]/) ? letter.toLowerCase() : letter.toUpperCase();
  }

  const appendRow = (prefix, i) => {
      while (i < s.length && !s[i].match(/[A-Z]|[a-z]/)) {
          prefix += s[i];
          i++;
      }
      if (i === s.length) {
          result.push(prefix);
      } else {
          let pathOne = prefix + s[i];
          let pathTwo = prefix + changeCase(s[i]);
          appendRow(pathOne, i + 1);
          appendRow(pathTwo, i + 1);
      }
  };

  appendRow('', 0);

  return result;
};
