// https://leetcode.com/problems/counting-bits


/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    if (n === 0) {
        return [0];
    }
    if (n === 1) {
        return [0, 1];
    }

    const answer = [0, 1];
    for (let i = 2; i <= n; i++) {
        const rest = Math.floor(i / 2);
        const mod = i % 2;
        answer.push(answer[rest] + answer[mod]);
    }

    return answer;
};
