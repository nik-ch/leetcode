// https://leetcode.com/problems/reverse-nodes-in-k-group/

/**
 * 1st approach, modifying listnodes (adding prev pointer). Iterate over k elements, set prev pointers,
 * then walk back and reset order, clear prev pointers.
 * Time: O(N)
 * Space: O(1) - only few additional pointers used
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  const dummy = new ListNode();
  dummy.next = head;
  head.prev = dummy;

  let slow = dummy;
  let fast = head;
  let prev = null;

  while (true) {
      let i = 0;
      for (; i < k && fast !== null; i++) {
          if (prev !== null) {
              fast.prev = prev;
          }
          prev = fast;
          fast = fast.next;
      }

      // we've reached end of list, clean prev links and return
      if (fast === null && i < k) {
          while (prev !== slow) {
              const oldPrev = prev.prev;
              prev.prev = undefined;
              prev = oldPrev;
          }

          break;
      }

      let p = prev;
      while (p !== null && p.prev !== slow) {
          const oldPrev = p.prev;
          p.next = p.prev;
          p.prev = undefined;
          p = oldPrev || null;
      }

      p.next = fast;
      p.prev = undefined;
      slow.next = prev;
      prev = p;
      slow = prev;
  }

  return dummy.next;
};


/**
 * 2ns approach - iterative, without modifying nodes (only updating next links). Basically the same principle as above.
 * Time: O(N)
 * Space: O(1)
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  let newHead = null;
  let p = head;
  let tail = null;

  while (true) {
      let i = 0;

      for (; i < k && p !== null; i++) {
          p = p.next;
      }

      // end of list            
      if (p === null && i < k) {
          break;
      }

      const reversedHead = reverseList(head, k);

      if (newHead === null) {
          newHead = reversedHead;
      }

      if (tail !== null) {
          tail.next = reversedHead;
      }

      tail = head;
      head = p;
      tail.next = head;
  }

  return newHead || head;
};

const reverseList = (head, k) => {
  let newHead = null;
  let p = head;

  while (k > 0) {
      const oldNext = p.next;
      p.next = newHead;
      newHead = p;
      p = oldNext;
      k--;
  }

  return newHead;
};



