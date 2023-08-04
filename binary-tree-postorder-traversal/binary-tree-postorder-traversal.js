// https://leetcode.com/problems/binary-tree-postorder-traversal/description/

/**
  Recursive approach. O(n) time and space.
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
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const result = [];

  const postOrder = (node) => {
    if (node === null) {
      return;
    }
    postOrder(node.left);
    postOrder(node.right);
    result.push(node.val);
  };

  postOrder(root);

  return result;
};

// ----------------------------------------------------------------------


/**
  Iterative approach. First we build stack in such order: right child -> node -> left child.
  Pop top element from stack. If it is leftmost node - add it to result. Otherwise pick another
  node from stack, exchange it with current one and continue. O(n) time and space.
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
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const result = [];
  const stack = [];
  let p = root;

  while (p !== null || stack.length > 0) {
    while (p !== null) {
      if (p.right !== null) {
        stack.push(p.right);
      }
      stack.push(p);      
      p = p.left;
    }

    p = stack.pop();

    if (stack.length > 0 && p.right === stack[stack.length - 1]) {
      // we are not done with right subtree - exchange current (parent) node with right child and proceed
      stack.pop();
      stack.push(p);
      p = p.right;
    } else {
      // we are on the leftmost subtree
      result.push(p.val);
      p = null;
    }
  }
  
  return result;
};
