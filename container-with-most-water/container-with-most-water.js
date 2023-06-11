// https://leetcode.com/problems/container-with-most-water

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let answer = 0;
    let i = 0;
    let j = height.length - 1;

    while (i < j) {
        answer = Math.max(answer, (j - i) * Math.min(height[i], height[j]));
        if (height[i] <= height[j]) {
            i++;
        } else {
            j--;
        }
    }

    return answer;
};