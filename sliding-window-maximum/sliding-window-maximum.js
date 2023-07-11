// https://leetcode.com/problems/sliding-window-maximum/

/**
 Using monotonic deque data structure to store indeces of values in decreasing order (beginning of the deque will
 always store maximum value for the current window). When attempting to add new element to the deque - check if we
 are still within the sliding window range, and remove elements starting from the end to beginning of the deque that
 are lower than new element.

 O(N) time, where N - nums.length
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const answer = [];

    let dq = [];

    // 1. building first window
    for (let i = 0; i < k; i++) {
        while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
            dq.pop();
        }
        dq.push(i);
    }

    answer.push(nums[dq[0]]);

    // 2. iterating over the left elements
    for (let i = k; i < nums.length; i++) {
        if (dq[0] === i - k) {
            dq.shift();
        }
        while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
            dq.pop();
        }
        dq.push(i);
        answer.push(nums[dq[0]]);
    }

    return answer;
};


