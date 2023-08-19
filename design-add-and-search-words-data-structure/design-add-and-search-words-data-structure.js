// https://leetcode.com/problems/design-add-and-search-words-data-structure/

/**
 * Solved using Trie data structure.
 * Time comlpexity: O(N * M), where N - number of paths from root to every leaf, M - number of characters in the searched word.
 * Space complexity: O(M)
 */


class WordDictionaryNode {
  word = false;
  children = new Map();
}

var WordDictionary = function() {
  this.root = new WordDictionaryNode();
};

/** 
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function(word) {
  let node = this.root;
  for (let char of word) {
      if (!node.children.has(char)) {
          node.children.set(char, new WordDictionaryNode());
      }
      node = node.children.get(char);
  }
  node.word = true;
};

/** 
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function(word) {
  const iterateOverWord = (wordIndex, node) => {
      if (wordIndex === word.length) {
          return node.word;
      }

      for (let i = wordIndex; i < word.length; i++) {
          if (word[i] === '.') {
              for (let childNode of node.children.values()) {
                  if (iterateOverWord(i + 1, childNode)) {
                      return true;
                  }
              }
              return false;
          } else {
              if (node.children.has(word[i])) {
                  node = node.children.get(word[i]);
              } else {
                  return false;
              }
          }
      }

      return node.word;
  };
  return iterateOverWord(0, this.root);
};

/** 
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/