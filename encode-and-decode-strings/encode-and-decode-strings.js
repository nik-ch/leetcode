// https://leetcode.com/problems/encode-and-decode-strings

/**
 * Straightforward approach - using non ASCII character as delimiter.
 */

/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
  const encoded = strs.join('\U0001f600');
  return encoded;
};

/**
* Decodes a single string to a list of strings.
*
* @param {string} s
* @return {string[]}
*/
var decode = function(s) {
  const answer = [];
  let buffer = '';
  for (let symb of s) {
      if (symb !== '\U0001f600') {
          buffer += symb;
      } else {
          answer.push(buffer);
          buffer = '';
      }
  }
  answer.push(buffer);
  return answer;
};

// ------------------------------------------------------------------------

/**
 * More general approach (allows unicode characters inside given rows)
 */

/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
  let buffer = '';
  strs.forEach(s => {
      const bytesNumber = s.length * 2;
      const bytesNumRow = intToRow(bytesNumber);
      buffer += bytesNumRow + s;
  });
  return buffer;
};

/**
* Decodes a single string to a list of strings.
*
* @param {string} s
* @return {string[]}
*/
var decode = function(s) {
  const result = [];
  let i = 0;
  while (i < s.length) {
      const bytesNumRow = s.slice(i, i + 32);
      i += 32;
      const bytesNum = parseInt(bytesNumRow, 2);
      const row = s.slice(i, i + (bytesNum / 2));
      i += (bytesNum / 2);
      result.push(row);
  }
  return result;
};


var intToRow = (num) => {
  let row = '';
  for (let i = 0; i < 32; i++) {
      const lastDigit = num & 1;
      if (lastDigit === 0) {
          row = '0' + row;
      } else {
          row = '1' + row;
      }
      num >>>= 1;
  }
  return row;
}
