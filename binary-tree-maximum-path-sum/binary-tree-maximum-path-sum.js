// https://leetcode.com/problems/binary-tree-maximum-path-sum/

/**
 * Recursievly iterate over the tree, for each node update current maximum. To return from recursion,
 * decide if we will start path from node itself, or continue path from the child.
 *
 * O(N) space and time
 */



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
var maxPathSum = function(root) {
  let maximum = -1001;

  const findWeights = (node) => {
    if (node === null) {
      return 0;
    }
    const leftWeight = findWeights(node.left);
    const rightWeight = findWeights(node.right);
    const maxChildWeight = Math.max(leftWeight, rightWeight);
    maximum = Math.max(maximum, node.val, node.val + maxChildWeight, node.val + leftWeight + rightWeight);
    return Math.max(node.val, node.val + maxChildWeight);
  };

  findWeights(root);

  return maximum;
};