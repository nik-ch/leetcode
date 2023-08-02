// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

/**
 * 1st approach, recursive. O(n) time and space.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q);
  } else if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q);
  } else {
      return root;
  }
};


/**
 * 2nd approach, iterative. O(n) time, O(1) space.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  while (true) {
      if (p.val > root.val && q.val > root.val) {
          root = root.right;
      } else if (p.val < root.val && q.val < root.val) {
          root = root.left;
      } else {
          return root;
      }
  }
};
