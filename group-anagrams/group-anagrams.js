// https://leetcode.com/problems/group-anagrams/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const seenMap = new Map();

  for (let i = 0; i < strs.length; i++) {
      const rowArray = Array.from(strs[i]);
      rowArray.sort((a, b) => {
          if (a > b) {
              return 1;
          } else if (a < b) {
              return -1;
          } else {
              return 0;
          }
      });
      const sortedRow = rowArray.join('');
      if (!seenMap.has(sortedRow)) {
          seenMap.set(sortedRow, [strs[i]]);
      } else {
          const rows = seenMap.get(sortedRow);
          rows.push(strs[i]);
      }
  }

  return Array.from(seenMap.values());
};