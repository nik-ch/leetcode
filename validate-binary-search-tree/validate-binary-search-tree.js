// https://leetcode.com/problems/validate-binary-search-tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  return check(root, null, null);
};

const check = (n, max, min) => {
  if (n === null) {
      return true;
  }
  if (max !== null && n.val >= max || min !== null && n.val <= min) {
      return false;
  }
  return check(n.left, n.val, min) && check(n.right, max, n.val);
};
