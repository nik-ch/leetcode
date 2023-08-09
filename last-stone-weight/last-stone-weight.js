// https://leetcode.com/problems/last-stone-weight/

/**
  1st approach, using priority queue.
  Time: in case if PQ implements heapify algorithm, building of queue will take O(N) time, then for each elements we will call 'pop' operation,
  that takes O(log N) time. So in total we have O(N * log N) time.
  Space: O(N)
*/

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    const queue = new PriorityQueue((a, b) => b - a, stones);

    while (queue.size() > 1) {
      const top1 = queue.pop();
      const top2 = queue.pop();
      if (top1 !== top2) {
        queue.push(Math.abs(top1 - top2));
      }
    }

    return queue.size() > 0 ? queue.pop() : 0;
};

/**
  2nd approach, using bucket sort.
  Time: O(N + W), where N - length of stones array, W - maximum stone weight
  Space: O(W), as we need an array for possible stone weights only.
*/


/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  const weights = new Array(1001).fill(0);
  let start = 0;
  for (let weight of stones) {
    weights[weight]++;
    start = Math.max(start, weight);
  }  

  let maxWeight = 0;
  let currentWeight = start;

  while (currentWeight > 0) {
    if (weights[currentWeight] === 0) {
      currentWeight--;
      continue;
    }
    if (maxWeight === 0) {
      maxWeight = weights[currentWeight] % 2 > 0 ? currentWeight : 0;
      currentWeight--;
    } else {
      const diff = maxWeight - currentWeight;
      weights[currentWeight] -= 1;
      if (diff > currentWeight) {
        maxWeight = diff;
      } else {
        weights[diff] += 1;
        maxWeight = 0;
      }
    }
  }

  return maxWeight;
};

