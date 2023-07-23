// https://leetcode.com/problems/reverse-linked-list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = head;
  let curr = head;
  while (curr != null) {
      const next = curr.next;
      curr.next = curr === head ? null : prev;
      prev = curr;
      curr = next;
  }

  return prev;
};


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (head === null) {
      return null;
  }

  let newHead = null;
  const dive = (node) => {
      if (node.next === null) {
          newHead = node;
          return node;
      }
      const parent = dive(node.next);
      parent.next = node;
      return node;
  };
  const oldHead = dive(head);
  oldHead.next = null;
  return newHead;
};
