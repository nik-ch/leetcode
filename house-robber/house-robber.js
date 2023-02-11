// https://leetcode.com/problems/house-robber

// 1st approach, using recursion.
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 1) {
      return nums[0];
  }
  const cache = new Map();

  const countSumm = (i) => {
      if (i >= nums.length) {
          return 0;
      }
      if (cache.has(i)) {
          return cache.get(i);
      } else {
          const firstSumm = countSumm(i + 1);
          const secondSumm = countSumm(i + 2);
          const maxVal = Math.max(firstSumm, secondSumm + nums[i]);
          cache.set(i, maxVal);
          return maxVal;
      }
  };

  return countSumm(0, 0);
};

// 2nd approach, using dynamic programming
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 1) {
      return nums[0];
  }
  const maxRobbedMap = new Map();
  const n = nums.length;
  maxRobbedMap.set(n, 0);
  maxRobbedMap.set(n - 1, nums[n - 1]);

  let next = nums[n - 1];
  let nextPlusOne = 0;
  for (let i = nums.length - 2; i >= 0; i--) {
      const newVal = Math.max(next, nextPlusOne + nums[i]);
      maxRobbedMap.set(i, newVal);
      nextPlusOne = next;
      next = newVal;
  }

  return maxRobbedMap.get(0);
};

// 3rd approach, optimised 2nd approach using less memory (O(1))
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 1) {
      return nums[0];
  }

  const n = nums.length;
  let next = nums[n - 1];
  let nextPlusOne = 0;

  for (let i = n - 2; i >= 0; i--) {
      const newVal = Math.max(next, nextPlusOne + nums[i]);
      nextPlusOne = next;
      next = newVal;
  }

  return next;
};
