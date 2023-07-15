// https://leetcode.com/problems/koko-eating-bananas/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
  let start = 1;
  let end = Math.max(...piles);;

  while (start <= end) {
      // our speed to test
      const mid = start + Math.floor((end - start) / 2);
      if (checkSpeed(mid, piles, h)) {
          end = mid - 1;
      } else {
          start = mid + 1;
      }
  }

  return start;
};

const checkSpeed = (s, piles, target) => {
  let spent = 0;
  for (let p of piles) {
      spent += Math.ceil(p / s);
      if (spent > target) {
          return false;
      }
  }
  return true;
}