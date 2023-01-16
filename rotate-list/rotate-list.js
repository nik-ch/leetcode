// https://leetcode.com/problems/rotate-list/description/
/**
 * Creating a ring from given linked list, finding a new head and tail in it, breaking old connection
 * and returning new head. Using 'mod' operator to find new indices.
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
var rotateRight = function(head, k) {
    if (head === null) {
        return null;
    }
    if (k === 0 || head.next === null) {
        return head;
    }
    // count total nodes count
    let len = 1;
    let n = head;
    while (n.next !== null) {
        n = n.next;
        len++;
    }
    // find new head index
    const start = len - (k % len);
    if (start === len) {
        return head;
    }
    // close the ring
    n.next = head;
    // break old connection and return new head
    const end = start - 1;
    n = head;
    let i = 0;
    while (i < end) {
        n = n.next;
        i++;
    }
    const newHead = n.next;
    n.next = null;
    return newHead;
};