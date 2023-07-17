// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array


/**
 * Finding point of inflection - element within array where previous element is bigger
 * than current one or current is bigger than the next one. Doing that for halfs of the array,
 * because we know that it is asc ordered.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  if (nums.length === 1) {
      return nums[0];
  }

  let minEl = 5001;
  let start = 0;
  let end = nums.length;

  if (nums[start] < nums[end - 1]) {
      return nums[0];
  }

  while (minEl === 5001) {
      const mid = Math.floor((end + start) / 2);
      if (nums[mid] < nums[mid - 1]) {
          minEl = nums[mid];
      } else if (nums[mid] > nums[mid + 1]) {
          minEl = nums[mid + 1];
      } else if (nums[mid] < nums[start]) {
          end = mid - 1;
      } else {
          start = mid + 1;
      }
  }

  return minEl;
};
