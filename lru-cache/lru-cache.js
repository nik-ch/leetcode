// https://leetcode.com/problems/lru-cache/

/**
 * Our DS will containt two internal structures - map and linked list. Map stores keys and corresponding linked list nodes.
 * Linked list will have two sentinel nodes - head and tail, to simplify edge cases for 1 el-t capacity. When we accessing or adding
 * new element in the cache - we move it to the end of list. If we are trying to put new element in the cache and it's capacity is
 * full, we remove element from head.
 * 
 */

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.head = new Node();
  this.tail = new Node();
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.capacity = capacity;
  this.map = new Map();
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if (this.map.has(key) && this.map.size > 1) {
      const node = this.map.get(key);
      this.remove(node);
      this.add(node);
      return node.val;
  } else if (this.map.has(key)) {
      return this.map.get(key).val;
  } else {
      return -1;
  }
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if (!this.map.has(key)) {
      if (this.map.size < this.capacity) {
          const n = new Node(key, value);
          this.add(n);
          this.map.set(key, n);
      } else {
          const realHead = this.head.next;
          this.remove(realHead);
          this.map.delete(realHead.key);
          const n = new Node(key, value);
          this.add(n);
          this.map.set(key, n);
      }
  } else {
      if (this.map.size === 1) {
          this.map.get(key).val = value;
      } else {
          const nodeValue = this.map.get(key);
          nodeValue.val = value;
          this.remove(nodeValue);
          this.add(nodeValue);
      }
  }
};

LRUCache.prototype.remove = function(node) {
  const prev = node.prev;
  const next = node.next;
  prev.next = next;
  next.prev = prev;
};

LRUCache.prototype.add = function(node) {
  const realTail = this.tail.prev;
  realTail.next = node;
  node.prev = realTail;
  node.next = this.tail;
  this.tail.prev = node;
};



/** 
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/

class Node {
  val;
  key;
  next;
  prev;
  constructor(key, value) {
      this.key = key;
      this.val = value;
  }
}

