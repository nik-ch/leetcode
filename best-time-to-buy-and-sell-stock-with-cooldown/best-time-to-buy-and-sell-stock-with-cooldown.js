// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown

/**
 * 1st approach (using state machine).
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length === 1) {
      return 0;
  }

  let sold = -Infinity;
  let held = -Infinity;
  let reset = 0;

  for (let i = 0; i < prices.length; i++) {
      const tempSold = sold;
      sold = held + prices[i];
      held = Math.max(held, reset - prices[i]);
      reset = Math.max(reset, tempSold);
  }

  return Math.max(reset, sold);
};

// TODO: also check approach from here: 
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solutions/240097/come-on-in-you-will-not-regret-most-general-java-code-like-all-other-dp-solutions/