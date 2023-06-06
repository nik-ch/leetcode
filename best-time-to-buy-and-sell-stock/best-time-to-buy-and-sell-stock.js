// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let minimum = 10001;
  let answer = 0;
  prices.forEach(p => {
     if (p < minimum) {
         minimum = p;
     } else {
         answer = Math.max(p - minimum, answer);
     }
  });
  return answer;
};
