// https://leetcode.com/problems/largest-rectangle-in-histogram


/*
Iterating over given heights. While heights increasing - we add them to the stack (index and value)
(if heights[i] >= heights[i-1], that means that our area might be extended to the right for each bar).

Once we met decreasing bar - we are starting to pop elements from our stack until we meet element less than the current bar
(if stack[top] < heights[i] -> we can't extend area to the left). Once we finished with poping from stack, we are adding current
bar to the stack, but we add it with the index of the last poped element from the stack (extending our area to the left).

Once we finished iterating over array, we might have elements left in stack. That means that all these elements might
be extended to the end of the array. We iterate over them and updating current max area.

O(N) time and space complexity
*/



/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  const stack = [[0, heights[0]]];
  let maxArea = heights[0];

  for (let i = 1; i < heights.length; i++) {
      const h = heights[i];
      let ind = i;
      while (stack.length > 0 && stack[stack.length - 1][1] > h) {
          const [topInd, topVal] = stack.pop();
          maxArea = Math.max(maxArea, topVal * (i - topInd));
          ind = topInd;
      }
      stack.push([ind, h]);
  }

  for (let i = stack.length - 1; i >= 0; i--) {
      const [topInd, topVal] = stack[i];
      maxArea = Math.max(maxArea, topVal * (heights.length - topInd));
  }

  return maxArea;
};
