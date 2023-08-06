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
  return checkBST(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};

const checkBST = (node, min, max) => {
  if (node === null) {
      return true;
  }
  let isValid = node.val < max && node.val > min;
  return isValid && checkBST(node.left, min, node.val) && checkBST(node.right, node.val, max);
};