// https://leetcode.com/problems/product-of-array-except-self/description/

/**
 * 1st approach. Fill up two arrays: for each element [i] in [1, 2, 3, 4, 5]
 * in 'leftProducts' we store product of all the elements before i (i.e. for i = 2 leftProducts[2] = nums[0] * nums[1]),
 * in 'rightProducts' we store product of all the elements after i (i.e. for i = 2 rightProducts[2] = nums[3] * nums[4]).
 * Then for each i result will be equal to leftProducts[i] * rightProducts[i].
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const leftProducts = [1];
  for (let i = 1; i < nums.length; i++) {
      leftProducts.push(leftProducts[i - 1] * nums[i - 1]);
  }
  const rightProducts = [];
  for (let i = nums.length - 1; i >= 0; i--) {
      if (i === nums.length - 1) {
          rightProducts[i] = 1;
      } else {
          rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
      }
  }
  const res = [];
  for (let i = 0; i < nums.length; i++) {
      res.push(leftProducts[i] * rightProducts[i]);
  }
  return res;
};

/**
 * 2nd approach (O(1) space). Almost the same as the previous one, except that we don't store elements on the right side,
 * we just iterating over the elements from the end and saving right product in one variable.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const result = [1];
  for (let i = 1; i < nums.length; i++) {
      result.push(result[i - 1] * nums[i - 1]);
  }
  let r = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= r;
    r *= nums[i];
  }
  return result;
};