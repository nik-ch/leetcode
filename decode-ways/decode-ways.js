// https://leetcode.com/problems/decode-ways

/**
 * 1st approach, using recursion.
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  const memo = new Map();

  const decode = (i) => {
      if (memo.has(i)) {
          return memo.get(i);
      }
      if (s[i] === '0') {
          return 0;
      }
      if (i === s.length || i === s.length - 1) {
          return 1;
      }

      let res = decode(i + 1);
      if (parseInt(s.substring(i, i + 2), 10) <= 26) {
          res += decode(i + 2);
      }

      memo.set(i, res);
      return res;
  };

  return decode(0, '') || 0;
};

/**
 * 2nd approach, using dynamic programming.
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  const memo = new Map();
  memo.set(0, 1);
  memo.set(1, s[0] === '0' ? 0 : 1);

  for (let i = 2; i <= s.length; i++) {
      let result = 0;
      if (s[i - 1] !== '0') {
          result += memo.get(i - 1);
      }
      const substr = parseInt(s.substring(i - 2, i), 10);
      if (substr > 9 && substr < 27) {
          result += memo.get(i - 2);
      }
      memo.set(i, result);
  }

  return memo.get(s.length);
};

/**
 * 3rd approach, improving second one by using constant space.
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  let prevMinusOne = 1;
  let prev = s[0] === '0' ? 0 : 1;

  for (let i = 2; i <= s.length; i++) {
      let result = 0;
      if (s[i - 1] !== '0') {
          result += prev;
      }
      const substr = parseInt(s.substring(i - 2, i), 10);
      if (substr > 9 && substr < 27) {
          result += prevMinusOne;
      }
      prevMinusOne = prev;
      prev = result;
  }

  return prev;
};
