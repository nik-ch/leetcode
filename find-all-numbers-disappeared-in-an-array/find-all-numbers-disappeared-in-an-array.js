// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/

/**
 * O(n) time and O(1) space solution (but with input array modified).
 * 1st step: for every element in the array, mark element under corresponding index as visited by chaning it's magnitude.
 * E.g. array [3, 1, 1]:
 * 1) el = 3, mark element with index 2 as visited
 * 2) el = 1, mark element with index 0 as visited
 * 3) el = 1, mark element with index 0 as visited
 * After this step input array will turn to [-3, 1, -1].
 * 2nd step: iterate over array again. If element is bigger than zero, then it's index + 1 value is missing.
 */


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    if (nums.length === 1) {
        return [];
    }
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        const el = Math.abs(nums[i]);
        nums[el - 1] = -Math.abs(nums[el - 1]);
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    return result;
};