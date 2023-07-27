// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

/**
 * Keeping distance in n elements between first pointer and second. Then the element to remove is the next one for the slowest pointer.
 * 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let first = head, second = head;
  for (let i = 0; i < n; i++) {
      first = first.next;
  }
  if (first === null) {
      return head.next;
  }
  while (first !== null && first.next !== null) {
      first = first.next;
      second = second.next;
  }
  second.next = second.next.next;
  return head;
};