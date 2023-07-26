// https://leetcode.com/problems/find-the-duplicate-number

/**
1st approach (does not satisfies follow up). For each N there should be always exactly N numbers lower or equal than it. This means that we should find
the smallest number, which violates this condition. O(N log N) timex complexity, O(1) space.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let low = 1;
    let high = nums.length - 1;
    let repeats = -1;

    while (low <= high) {
        const current = Math.floor((low + high) / 2);
        let count = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= current) {
                count++;
            }
        }
        if (count > current) {
            repeats = current;
            high = current - 1;
        } else {
            low = current + 1;
        }
    }

    return repeats;
};

/**
2nd approach uses FLoyd's algorithm for cycle detection. We interpret our array as linked list, operating with it's values as pointers.
Because one number is repeating, there will be cycle in our list. Intersection point for slow and fast pointers will be X points far from
cycle beginning, where X is equal to distance between beginning of an array and cycle entering for slow pointer. Math explained here:
https://youtu.be/wjYnzkAhcNk
O(N) times, O(1) space.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  let slow = 0, fast = 0;
  // 1. find intersection point
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // 2. find cycle starting point
  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
};

