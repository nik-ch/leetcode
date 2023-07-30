// https://leetcode.com/problems/merge-k-sorted-lists

/**
 * 1st approach - merge every list one by one on each step (select minimum element and move current linked list pointer).
 * O (k * N) time complexity, O (1) space.
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let newHead = null;
  let prev = null;

  while (true) {
      let counter = 0;
      let minInd = 0;
      for (let i = 0; i < lists.length; i++) {
          if (lists[i] !== null && (lists[minInd] === null || lists[i].val <= lists[minInd].val)) {
              minInd = i;
          } else if (lists[i] === null) {
              counter++;
          }
      }
      if (counter === lists.length) {
          break;
      }
      if (newHead === null) {
          newHead = lists[minInd];
          prev = lists[minInd];
      } else {
          prev.next = lists[minInd];
          prev = lists[minInd];
      }
      lists[minInd] = lists[minInd].next;
  }

  return newHead;
};


/**
 * 2nd approach - using PQ to decrease time on searching minimum on every step.
 * O (N * log K) time complexity, O (K) space.
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let newHead = null;
  let prev = null;
  const q = new PriorityQueue({
      compare: (a, b) => a.val - b.val
  });

  for (let i = 0; i < lists.length; i++) {
      if (lists[i] !== null) {
          q.enqueue(lists[i]);
      }
  }

  while (!q.isEmpty()) {
      let el = q.dequeue();
      if (newHead === null) {
          newHead = el;
          prev = el;
      } else {
          prev.next = el;
          prev = el;
      }
      el = el.next;
      if (el) {
          q.enqueue(el);
      }
  }

  return newHead;
};

/**
 * 3rd approach - splitting merging lists to sub-problems, merge between themselves and merging to the final list.
 * O (N log K) time complexity, O(1) space.
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (lists.length === 0) {
      return null;
  }

  while (lists.length > 1) {
      const mergedLists = [];
      for (let i = 0; i < lists.length; i += 2) {
          const p1 = lists[i];
          const p2 = lists[i + 1] || null;
          mergedLists.push(merge(p1, p2));
      }
      lists = mergedLists;
  }

  return lists[0];
};

const merge = (p1, p2) => {
  const dummy = new ListNode();
  let tail = dummy;
  while (p1 !== null && p2 !== null) {
      if (p1.val <= p2.val) {
          tail.next = p1;
          p1 = p1.next;
      } else {
          tail.next = p2;
          p2 = p2.next;
      }
      tail = tail.next;
  }
  tail.next = p1 !== null ? p1 : p2;
  return dummy.next;
}








