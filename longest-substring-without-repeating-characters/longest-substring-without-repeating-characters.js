// https://leetcode.com/problems/longest-substring-without-repeating-characters

/**
 * 1st approach. Using map to to store characters and their index in the given row. Once we meet
 * repeating character, we remove characters that stays prior to previous one, thus we move the window.
 * 
 * Space complexity: O(N), as every symbol might be distinct.
 * Time complexity: ~O(N), amortized.
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let result = 0;
  let subMap = new Map();

  for (let i = 0; i < s.length; i++) {
      // check substring for repeating symbol
      if (subMap.has(s[i])) {
          const repeatingIndex = subMap.get(s[i]);
          result = Math.max(subMap.size, result);
          for (const [key, value] of subMap.entries()) {
              if (value <= repeatingIndex) {
                  subMap.delete(key);
              }
          }
      }
      subMap.set(s[i], i);
  }

  return Math.max(result, subMap.size);
};

/**
 * 2nd approach (1st one improved). Instead of removing characters from the map on every repeating character met,
 * we can only move starting index.
 * 
 * O(N) time and space complexity.
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let result = 0;
  let start = 0;
  let subMap = new Map();

  for (let i = 0; i < s.length; i++) {
      // check substring for repeating symbol
      if (subMap.has(s[i])) {
          const repeatingIndex = subMap.get(s[i]);
          result = Math.max(i - start, result);
          start = Math.max(start, repeatingIndex + 1);
      }
      subMap.set(s[i], i);
  }

  return Math.max(result, s.length - start);
};