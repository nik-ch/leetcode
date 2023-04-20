// https://leetcode.com/problems/backspace-string-compare

/**
 * 1st approach, using O(N + M) space (for stacks to hold rows). O(N + M) time.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    const sStack = [];
    const tStack = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] !== '#') {
            sStack.push(s[i]);
        } else {
            sStack.pop(s[i]);
        }
    }

    for (let i = 0; i < t.length; i++) {
        if (t[i] !== '#') {
            tStack.push(t[i]);
        } else {
            tStack.pop(t[i]);
        }
    }

    if (sStack.length !== tStack.length) {
        return false;
    }

    for (let i = 0; i < sStack.length; i++) {
        if (sStack[i] !== tStack[i]) {
            return false;
        }
    }

    return true;
};


/**
 * 2nd approach, using O(1) space and O(N + M) time.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    let sCounter = 0;
    let tCounter = 0;
    let i = s.length - 1;
    let j = t.length - 1;

    while (i >= 0 || j >= 0) {
        while (i >= 0) {
            if (s[i] === '#') {
                sCounter++;
                i--;
            } else {
                if (sCounter > 0) {
                    sCounter--;
                    i--;
                } else {
                    break;
                }
            }
        }

        while (j >= 0) {
            if (t[j] === '#') {
                tCounter++;
                j--;
            } else {
                if (tCounter > 0) {
                    tCounter--;
                    j--;
                } else {
                    break;
                }
            }
        }

        if (i >= 0 && j >= 0 && s[i] !== t[j]) {
            return false;
        }
        if (i <= 0 && j <= 0 && (i < j || j < i)) {
            return false;
        }

        i--;
        j--;
    }

    return true;
};
