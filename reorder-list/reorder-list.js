// https://leetcode.com/problems/reorder-list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  // 1. find middle part
  let fast = head, slow = head;
  while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
  }

  // 2.reverse second half
  let prev = null;
  let p = slow;
  while (p !== null) {
      const oldNext = p.next;
      p.next = p === slow ? null : prev;
      prev = p;
      p = oldNext;
  }

  // 3. iterate over first and reversed second half of the list and merge
  // now prev stores new middle (previously last element), slow stores new end
  p = head;
  let p2 = prev;
  while (p2.next !== null) {
      let next = p.next;
      p.next = p2;
      p = next;

      next = p2.next;
      p2.next = p;
      p2 = next;
  }
};