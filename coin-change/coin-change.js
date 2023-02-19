// https://leetcode.com/problems/coin-change/

/**
 * Building solution from the bottom to the top using dynamic programming approach. We build solution for every amount from 0 to the final one
 * and for each coin we decide if it will suggest the minimum number of coins for current amount.
 * Space complexity: O(S), where S - amount.
 * Time complexity: O(N * S).
 */


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  if (amount === 0) {
      return 0;
  }
  const maxValue = Math.pow(2, 31);
  const amounts = new Map();
  amounts.set(0, 0);

  const extractVal = (i) => {
      const val = amounts.get(i);
      return val === undefined ? maxValue : val;
  };

  for (let i = 1; i <= amount; i++) {
      coins.forEach(coin => {
          if (i - coin < 0) {
              // skipping current coin
              return;
          }
          const currAmount = extractVal(i); 
          const prevAmount = extractVal(i - coin); 
          amounts.set(i, Math.min(currAmount, prevAmount + 1));
      });
  }

  const answer = amounts.get(amount);
  if (answer !== maxValue && answer !== undefined) {
      return answer;
  } else {
      return -1;
  }
};