// https://leetcode.com/problems/diameter-of-binary-tree

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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  let max = 0;

  const dive = (node) => {
      let fromLeft = 0;
      let fromRight = 0;
      if (node.left !== null) {
          fromLeft = dive(node.left);
      }
      if (node.right !== null) {
          fromRight = dive(node.right);
      }
      const currentD = fromLeft + fromRight;
      max = Math.max(max, currentD);
      return Math.max(fromLeft, fromRight) + 1;
  };

  dive(root);

  return max;
};