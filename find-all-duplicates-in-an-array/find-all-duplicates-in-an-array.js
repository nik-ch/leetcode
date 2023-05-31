// https://leetcode.com/problems/find-all-duplicates-in-an-array

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
  const repeated = [];
  for (let i = 0; i < nums.length; i++) {
      const num = Math.abs(nums[i]) - 1;
      if (nums[num] < 0) {
          repeated.push(num + 1);
      } else {
          nums[num] = -nums[num];
      }
  }
  return repeated;
};