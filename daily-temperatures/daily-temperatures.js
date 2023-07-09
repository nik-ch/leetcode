// https://leetcode.com/problems/daily-temperatures/

/**
 * 1st approach
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const tempStack = [];

  temperatures.forEach((t, i) => {
      while (tempStack.length > 0 && tempStack[tempStack.length - 1][0] < t) {
          const [temp, ind] = tempStack.pop();
          answer[ind] = i - ind;
      }
      tempStack.push([t, i]);
  });

  return answer;
}

/**
 * 2nd approach.
 * 
 * 
 * Let's use the example test case 
 * temperatures = [73, 74, 75, 71, 69, 72, 76, 73]. Iterating backwards, after 5 days we have: 
 * answer = [0, 0, 0, 2, 1, 1, 0, 0].
 * 
 * The next day to calculate is the day at index 2 with temperature 75. How can we use answer to help us do this? 
 * Well, let's first check the next day - we might be lucky and it could be warmer. The next day (at index 3) has 
 * a temperature of 71, which is not warmer. However, answer[3] tells us that the day at index 3 will not see a warmer 
 * temperature for 2 more days. A temperature warmer than 75 must also be warmer than 71 - so we know it is pointless 
 * to check answer[4]. We should check temperatures[3 + answer[3]] = temperatures[5] = 72, which is not warmer than 75. 
 * Again, we know from answer[5] that we will not have a warmer temperature than 72 for 1 day. Therefore, the next day to 
 * check is temperatures[5 + answer[5]] = temperatures[6] = 76, which is warmer - we found our day.
 * 
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  let hottest = 0;

  for (let i = temperatures.length - 1; i >= 0; i--) {
      const curr = temperatures[i];
      if (curr >= hottest) {
          hottest = curr;
          answer[i] = 0;
          continue;
      }
      let days = 1;
      while (temperatures[i + days] <= curr) {
          days += answer[i + days];
      }
      answer[i] = days;
  }

  return answer;
}
