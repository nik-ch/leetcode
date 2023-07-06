// https://leetcode.com/problems/trapping-rain-water/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let answer = 0;
  let s = [];
  let i = 0;

  while (i < height.length) {
      while (s.length > 0 && height[i] > height[stackTop(s)]) {
          const top = s.pop();
          if (s.length === 0) {
              break;
          }
          const d = i - stackTop(s) - 1;
          const h = Math.min(height[i], height[stackTop(s)]) - height[top];
          answer += d * h;
      }
      s.push(i++);
  }

  return answer;
};

var stackTop = (s) => s[s.length - 1];
