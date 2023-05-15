// https://leetcode.com/problems/index-pairs-of-a-string


/**
 * @param {string} text
 * @param {string[]} words
 * @return {number[][]}
 */
var indexPairs = function(text, words) {
  const resPairs = [];

  words.forEach(w => {
      const first = w[0];
      let i = 0;
      while (i < text.length) {
          if (text[i] === first) {
              let j = i + 1;
              let k = 1;
              while (j < text.length && k < w.length && text[j] === w[k]) {
                  j++;
                  k++;
              }
              // we found indexes - save result
              if (j <= text.length && k === w.length) {
                  resPairs.push([i, j - 1]);
              }
          }
          i++;
      }
  });

  // sort result before return
  resPairs.sort((a, b) => {
     const [f1, f2] = a;
     const [s1, s2] = b;
     if (f1 > s1) {
         return 1;
     } else if (f1 < s1) {
         return -1;
     } else if (f2 > s2) {
         return 1;
     } else if (f2 < s2) {
         return -1;
     } else {
         return 0;
     }
  });

  return resPairs;
};
