// https://leetcode.com/problems/3sum/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * Sort takes O(N * log N) time to complete. Outer cycle takes O(N) time, inner cycle - O(N), so in total
 * it's O(N ^ 2) time. Constant space is used (if sort is made in-place).
 */
var threeSum = function(nums) {
  nums.sort((a, b) => {
      if (a > b) {
          return 1;
      } else if (a < b) {
          return -1;
      } else {
          return 0;
      };
  });

  const triplets = [];

  const twoSum = (start, end, first, target) => {
      while (start < end) {
          const summ = nums[start] + nums[end];
          if (summ === target) {
              triplets.push([first, nums[start], nums[end]]);
              start++;
              end--;
              while (nums[start] === nums[start - 1]) {
                  start++;
              }
          } else if (summ < target) {
              start++;
          } else {
              end--;
          }
      }
  };

  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
      if (i > 0 && nums[i - 1] === nums[i]) {
          continue;
      }
      twoSum(i + 1, nums.length - 1, nums[i], 0 - nums[i]);
  }

  return triplets;
};
