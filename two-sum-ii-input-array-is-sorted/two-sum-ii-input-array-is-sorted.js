// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 * 
 * This solution does not meet constant space requirement, but I was intereseted to implement it anyway.
 * (recursion for binary search takes up to log N space).
 */
var twoSum = function(numbers, target) {
    const binSearch = (start, end, goal) => {
        if (start > end) {
            return -1;
        }
        const mid = Math.floor((start + end) / 2);
        if (numbers[mid] !== goal) {
            if (numbers[mid] > goal) {
                return binSearch(start, mid - 1, goal);
            } else {
                return binSearch(mid + 1, end, goal);
            }
        }
        return mid;
    };

    let answer;
    numbers.forEach((n, i) => {
        const goal = target - n;
        const check = binSearch(i + 1, numbers.length, goal);
        if (check !== -1) {
            answer = [i + 1, check + 1];
            return;
        }
    });

    return answer;
};


/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 * 
 * Constant space used.
 */
var twoSum = function(numbers, target) {
    let start = 0;
    let end = numbers.length - 1;
    while (true) {
        const summ = numbers[start] + numbers[end];
        if (summ === target) {
            return [start + 1, end + 1];
        } else if (summ > target) {
            end--;
        } else {
            start++;
        }
    }
};

