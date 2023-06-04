// https://leetcode.com/problems/reverse-bits/

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 * 
 * 1st approach.
 */
var reverseBits = function(n) {
    let result = n & 1;
    for (let i = 1; i < 32; i++) {
        result <<= 1;
        n >>= 1;
        result = result | (n & 1);
    }
    return result >>> 0;
};

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 * 
 * 2nd approach.
 */
var reverseBits = function(n) {
    let result = 0;
    let pow = 31;
    while (pow >= 0) {
        result = result + ((n & 1) << pow);
        n >>= 1;
        pow--;
    }
    return result >>> 0;
};