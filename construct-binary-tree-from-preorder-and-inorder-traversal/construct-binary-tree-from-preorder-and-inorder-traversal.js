// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  const valToIndexMap = inorder.reduce((accum, curr, i) => accum.set(curr, i), new Map());
  let preorderIndex = 0;

  const arrayToTree = (start, end) => {
      if (start > end) {
          return null;
      }
      const root = new TreeNode(preorder[preorderIndex++]);
      root.left = arrayToTree(start, valToIndexMap.get(root.val) - 1);
      root.right = arrayToTree(valToIndexMap.get(root.val) + 1, end);
      return root;
  };

  const root = arrayToTree(0, inorder.length - 1);

  return root;
};

