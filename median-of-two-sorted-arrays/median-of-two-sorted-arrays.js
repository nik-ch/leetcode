// https://leetcode.com/problems/median-of-two-sorted-arrays/

// best explanation: https://www.youtube.com/watch?v=q6IEA26hvXc

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length < nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const x = nums1.length;
  const y = nums2.length;
  const totalLen = x + y;
  const half = Math.floor(totalLen / 2);

  let start = 0, end = y - 1;
  while (true) {
    const midY = Math.floor((start + end) / 2);
    const midX = half - midY - 2; // - 2 because arrays are zero-based

    let y1 = midY >= 0 ? nums2[midY] : Number.NEGATIVE_INFINITY;
    let y2 = (midY + 1) >= y ? Number.POSITIVE_INFINITY : nums2[midY + 1];
    let x1 = midX >= 0 ? nums1[midX] : Number.NEGATIVE_INFINITY;
    let x2 = (midX + 1) >= x ? Number.POSITIVE_INFINITY : nums1[midX + 1];

    if (x1 <= y2 && y1 <= x2) { // found
      if (totalLen % 2 === 0) {
        return (Math.max(x1, y1) + Math.min(x2, y2)) / 2;
      } else {
        return Math.min(x2, y2);
      }
    } else if (y1 > x2) {
      // we are too right
      end = midY - 1;
    } else if (x1 > y2) {
      // we are too left
      start = midY + 1;
    }
  }
};
