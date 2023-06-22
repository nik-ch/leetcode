// https://leetcode.com/problems/permutation-in-string/description/


/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  const s1Map = new Map();
  const s2Map = new Map();
  for (let i = 0; i < s1.length; i++) {
      s1Map.set(s1[i], (s1Map.get(s1[i]) || 0) + 1);
      s2Map.set(s2[i], (s2Map.get(s2[i]) || 0) + 1);
  }

  let i = 0;
  while (i <= s2.length - s1.length) {
      if (checkMapsEqual(s1Map, s2Map)) {
          return true;
      }
      s2Map.set(s2[i], s2Map.get(s2[i]) - 1);
      s2Map.set(s2[i + s1.length], (s2Map.get(s2[i + s1.length]) || 0) + 1);
      i++;
  }

  return false;
};

var checkMapsEqual = (map1, map2) => {
  for (let [key, val] of map1.entries()) {
      if (map2.get(key) !== val) {
          return false;
      }
  }
  return true;
};


// -----------------------------------

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) {
      return false;
  }

  const s1Map = new Array(26).fill(0);
  const s2Map = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s1.length; i++) {
      s1Map[s1[i].charCodeAt(0) - aCode]++;
      s2Map[s2[i].charCodeAt(0) - aCode]++;
  }

  for (let i = 0; i < s2.length - s1.length; i++) {
      if (checkMapsEqual(s1Map, s2Map)) {
          return true;
      }
      s2Map[s2[i].charCodeAt(0) - aCode]--;
      s2Map[s2[i + s1.length].charCodeAt(0) - aCode]++;
  }

  return checkMapsEqual(s1Map, s2Map);
};

const checkMapsEqual = (map1, map2) => {
  for (let i = 0; i < map1.length; i++) {
      if (map1[i] !== map2[i]) {
          return false;
      }
  }
  return true;
};
