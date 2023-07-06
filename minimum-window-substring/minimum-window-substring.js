// https://leetcode.com/problems/minimum-window-substring/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  const m = s.length;

  // fill the map to see what symbols and how often they are met
  const map = new Map();
  for (let char of t) {
      map.set(char, (map.get(char) || 0) + 1);
  }

  // filter symbols in s to process only those that are met in t
  const filteredS = [];
  for (let i = 0; i < m; i++) {
      if (map.has(s[i])) {
          filteredS.push({i, c: s[i]});
      }
  }

  const answer = [-1, 0, 0];
  let l = 0, r = 0;
  // increases when all entrances for each unique symbol are met
  let found = 0;
  const metMap = new Map();

  while (r < filteredS.length) {
      const symb = filteredS[r].c;
      metMap.set(symb, (metMap.get(symb) || 0) + 1);

      if (map.has(symb) && metMap.get(symb) === map.get(symb)) {
          found++;
      }

      while (l <= r && found === map.size) {
          const leftChar = filteredS[l].c;
          const start = filteredS[l].i;
          const end = filteredS[r].i;
          
          if (answer[0] === -1 || (end - start) < answer[0]) {
              answer[0] = end - start + 1;
              answer[1] = start;
              answer[2] = end;
          }

          // left part of the sliding window is now moved - reset occurrences counts
          const newVal = metMap.get(leftChar) - 1;
          metMap.set(leftChar, newVal);
          if (map.has(leftChar) && newVal < map.get(leftChar)) {
              found--;
          }

          l++;
      }

      r++;
  }

  return answer[0] === -1 ? '' : s.slice(answer[1], answer[2] + 1);
};