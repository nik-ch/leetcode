// https://leetcode.com/problems/serialize-and-deserialize-binary-tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  if (root === null) {
      return '';
  }

  const serialized = [];

  const serialize = (node) => {
      serialized.push(node === null ? null : node.val);
      if (node !== null) {
          serialize(node.left);
          serialize(node.right);
      }
  };

  serialize(root);

  return serialized.join(',');
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
  if (data === '') {
      return null;
  }

  const preorder = data.split(',');
  let preorderIdx = 0;

  const buildTree = () => {
      if (preorder[preorderIdx] === '') {
          preorderIdx++;
          return null;
      }
      const node = new TreeNode(parseInt(preorder[preorderIdx++]));
      const left = buildTree();
      const right = buildTree();
      node.left = left;
      node.right = right;
      return node;
  };

  return buildTree();
};


/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/