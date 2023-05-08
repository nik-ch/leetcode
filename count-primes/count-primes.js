// https://leetcode.com/problems/count-primes

/**
 * 1st approach
 */

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  if (n <= 2) {
      return 0;
  }

  const checked = [];

  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
      if (!checked[i]) {
          let num = i * i;
          while (num < n) {
              checked[num] = true;
              num += i;
          }
      }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
      if (!checked[i]) {
          count++;
      }
  }

  return count;
};


/**
 * 2nd approach
 */
/**
 * @param {number} n
 * @return {number}
 */

var countPrimes = function(n) {
  if (n <= 2) {
      return 0;
  }

  let count = 0;
  const checked = [];

  for (let i = 2; i < n; i++) {
      if (checked[i]) {
          continue;
      } else {
          count++;
      }
      for (let j = i * i; j < n; j += i) {
          checked[j] = true;
      }
  }

  return count;
};

