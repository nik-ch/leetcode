// https://leetcode.com/problems/subsets/

/**
 * 1st approach. Probably using dynamic programming, bottom-up way.
 * Time complexity: O(N * 2 ^ N). Space complexity is same.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  if (nums.length === 1) {
      return [[], nums];
  }

  let result = [[]];

  const fillSubsets = (i) => {
      const newSubsets = [];
      for (let subset of result) {
          newSubsets.push(subset.concat(nums[i]))
      }
      for (let subset of newSubsets) {
          result.push(subset);
      }
  };

  for (let i = 0; i < nums.length; i++) {
      fillSubsets(i);
  }

  return result;
};


/**
 * 2nd approach, using backtrack pattern.
 * Time complexity: O(N * 2 ^ N). Space complexity is same.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  if (nums.length === 1) {
      return [[], nums];
  }

  const result = [];
  backTrack(result, nums, [], 0);

  return result;
};

const backTrack = (result, nums, curr, start) => {
  result.push([...curr]);
  for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      backTrack(result, nums, curr, i + 1);
      curr.splice(curr.length - 1, 1);
  }
};
