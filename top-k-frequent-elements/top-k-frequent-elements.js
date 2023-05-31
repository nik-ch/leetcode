// https://leetcode.com/problems/top-k-frequent-elements

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * 1st approach
 */
var topKFrequent = function(nums, k) {
  if (nums.length === 1) {
      return nums;
  }

  // 1st step - save how much times we have seen each value
  // O(N), N - nums size
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
      seen.set(nums[i], (seen.get(nums[i]) || 0) + 1);
  }

  // 2nd step - sort map by seen times number values
  // O(M) - iterate over entries, M - number of different entries
  const pairs = Array.from(seen.entries());
  // sort by desc, O(M * log M)
  pairs.sort(([firstKey, firstVal], [secondKey, secondVal]) => {
      if (firstVal > secondVal) {
          return -1;
      } else if (firstVal < secondVal) {
          return 1;
      } else {
          return 0;
      }
  });

  // 3rd step - pick first k elements
  // O(K)
  const answer = [];
  for (let i = 0; i < k; i++) {
      answer.push(pairs[i][0]);
  }

  return answer;
};



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * 2nd approach.
 */
var topKFrequent = function(nums, k) {
    if (nums.length === 1) {
        return nums;
    }

    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        seen.set(nums[i], (seen.get(nums[i]) || 0) + 1);
    }

    const frequences = [];
    for (const [num, times] of seen.entries()) {
        if (frequences[times]) {
            frequences[times].push(num);
        } else {
            frequences[times] = [num];
        }
    }

    const answer = [];
    for (let i = nums.length, j = k; i > 0 && j > 0; i--) {
        if (!!frequences[i]) {
            frequences[i].forEach(f => {
                if (j <= 0) {
                    return;
                }
                answer.push(f);
                j--;
            });
        }
    }

    return answer;
};