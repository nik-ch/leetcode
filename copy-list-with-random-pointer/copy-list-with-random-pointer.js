// https://leetcode.com/problems/copy-list-with-random-pointer/description/

/**
  Modify entry list so that each node points firstly to newly created node, then to the next element. E.g.:
  list A -> B -> C will be modified to A -> A' -> B -> B' -> C -> C'. Then, iterate over modified list and
  set random pointers. In the last cycle, set correct 'next' links in both lists.
  O(N) time, O(1) space complexity.
*/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if (head === null) {
    return null;
  }
  let p = head;
  while (p !== null) {
    const n = new Node(p.val, p.next, null);
    const next = p.next;
    p.next = n;
    p = next;
  }

  p = head;
  while (p !== null) {
    if (p.random !== null) {
      p.next.random = p.random.next;
    }
    p = p.next.next;
  }

  p = head;
  const newHead = p.next;

  while (p !== null) {
    const pNew = p.next;
    const pNext = pNew.next;
    if (pNext !== null) {
      pNew.next = pNext.next;
    }
    p.next = pNext;
    p = pNext;
  }

  return newHead;
};
