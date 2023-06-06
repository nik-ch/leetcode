// https://leetcode.com/problems/longest-consecutive-sequence/

/**
 * 1. Create set from income numbers array.
 * 2. Iterate over set. We start new sequence to measure path length when there is no element smaller than the current one by 1
 *    (because that would mean that we are already on another path).
 * 3. If path has begun, we continue to increase it' values by one, while they are presented in the set.
 * 4. After each path checking, update found longest path.
 * 
 * O(n) space usage (creating Set)
 * O(n) time (we will iterate over the nums arrays twice, despite of inner while cycle).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  if (nums.length === 0) {
      return 0;
  }
  if (nums.length === 1) {
      return 1;
  }

  const numsSet = new Set();
  for (let i = 0; i < nums.length; i++) {
      numsSet.add(nums[i]);
  }

  let longestPath = 1;
  let currentStreak;
  numsSet.forEach(num => {
      currentStreak = 1;
      // if there is no element to the left of the current, start sequenece
      if (!numsSet.has(num - 1)) {
          let j = 1;
          while (numsSet.has(num + j)) {
              currentStreak++;
              j++;
          }
          longestPath = Math.max(currentStreak, longestPath);
      }
  });

  return longestPath;
};

// ------------------------------------------------------


/**
 * Union-find alike solution.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // O(N)
    // put every element to initial map
    const map = new Map();
    nums.forEach(n => {
        markRecursive(map, n);
        if (!map.has(n)) {
            map.set(n, 0);
        }
    });

    // O(N)
    // recursievly mark root for every element that belongs to one union group
    nums.forEach(n => {
        markRecursive(map, n);
    });

    // O(N)
    // count how many times each union group appears
    const sizesMap = new Map();
    for (let v of map.values()) {
        if (!sizesMap.has(v)) {
            sizesMap.set(v, 1);
        } else {
            sizesMap.set(v, sizesMap.get(v) + 1);
        }
    }

    // O(N)
    // return group that appears max times
    let max = 0;
    for (let s of sizesMap.values()) {
        max = Math.max(s, max);
    }

    return max;
};

var markRecursive = (map, el) => {
    if (map.get(el) !== 0) {
        return map.get(el);
    }
    if (!map.has(el + 1)) {
        map.set(el, el);
        return el;
    } else {
        const root = markRecursive(map, el + 1);
        map.set(el, root);
        return root;
    }
}
