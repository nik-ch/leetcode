// https://leetcode.com/problems/squares-of-a-sorted-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const result = [];

  // 1: find first non-negative value
  let i = 0;
  let found = false;
  while (i < nums.length && !found) {
      if (nums[i] >= 0) {
          found = true;
      } else {
          i++;
      }
  }

  // 2: iterate to the left and to the right from the value on previous step
  // choose smallest element every time and push it into result array
  let j = i - 1;
  while (j >= 0 && i < nums.length) {
      const squareLeft = nums[j] * nums[j];
      const squareRight = nums[i] * nums[i];
      if (squareLeft <= squareRight) {
          result.push(squareLeft);
          j--;
      } else {
          result.push(squareRight);
          i++;
      }
  }

  // 3: one of two indexes will end up first. fill array with the left one
  while (j >= 0) {
      result.push(nums[j] * nums[j]);
      j--;
  }
  while (i < nums.length) {
      result.push(nums[i] * nums[i]);
      i++;
  }

  return result;
};
