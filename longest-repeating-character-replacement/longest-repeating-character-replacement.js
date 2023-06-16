// https://leetcode.com/problems/longest-repeating-character-replacement/

// best explanation:
// https://www.youtube.com/watch?v=gqXU1UyA8pk


/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  const charsMap = new Map();
  let l = 0;
  let ans = 0;
  for (let r = 0; r < s.length; r++) {
      increaseMeetingsCount(charsMap, s[r]);
      // if we are outside of current sliding window - move left border;
      while (((r - l + 1) - maxNumberOfCharsInWindow(charsMap)) > k) {
          decreaseMeetingsCount(charsMap, s[l]);
          l++;
      }
      ans = Math.max(ans, r - l + 1);
  }
  return ans;
};

var maxNumberOfCharsInWindow = (map) => map.size && (Math.max(...map.values())) || 0;
var increaseMeetingsCount = (map, char) => map.set(char, (map.get(char) || 0) + 1);
var decreaseMeetingsCount = (map, char) => map.set(char, (map.get(char) || 0) - 1);


// ----------------------------------------------------------------------

/**
 * longestSeq stores longest sequence of repeating characters inside current window on each step. Result will be increased
 * only when we are meeting new longest sequence (window length - longest sequence <= k)
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  const charsMap = new Map();
  let l = 0;
  let ans = 0;
  let longestSeq = 0;
  for (let r = 0; r < s.length; r++) {
      increaseMeetingsCount(charsMap, s[r]);
      longestSeq = Math.max(longestSeq, charsMap.get(s[r]));
      // if we are outside of current sliding window - move left border;
      while (((r - l + 1) - longestSeq) > k) {
          decreaseMeetingsCount(charsMap, s[l]);
          l++;
      }
      ans = Math.max(ans, r - l + 1);
  }
  return ans;
};

var increaseMeetingsCount = (map, char) => map.set(char, (map.get(char) || 0) + 1);
var decreaseMeetingsCount = (map, char) => map.set(char, (map.get(char) || 0) - 1);

