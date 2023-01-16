// https://leetcode.com/problems/rotate-image/
/**
 * Inside cycle: iterating over each side of the 'square' (top -> right -> bottom -> left),
 * moving items from current side to the next one (e.g. from top to right, and so on).
 * Outer cycle: reducing matrix size by 'cutting of' outer sides:
 * - - - - -
 * - - - - -          - - -
 * - - - - -    ->    - - -    ->    -
 * - - - - -          - - -
 * - - - - -
 */


/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    if (matrix.length === 1) {
        return;
    }
    const n = matrix.length;
    let columnStart = 0;
    let columnEnd = n - 1;
    let rowStart = 0;
    let rowEnd = n - 1;
    // using lastIndex to count third and fourth items since indeces are
    // related to the global columns and rows count, and not to reduced ones
    const lastIndex = n - 1;

    while (rowStart <= rowEnd && columnStart <= columnEnd) {
        for (let i = columnStart, j = rowStart; i < columnEnd && j < rowEnd; i++, j++) {
            // saving second item
            const temp = matrix[j][columnEnd];
            // updating second with first
            matrix[j][columnEnd] = matrix[rowStart][i];
            // updating first with fourth
            matrix[rowStart][i] = matrix[lastIndex - j][columnStart];
            // updating fourth with third
            matrix[lastIndex - j][columnStart] = matrix[rowEnd][lastIndex - i];
            // updating third with saved second
            matrix[rowEnd][lastIndex - i] = temp;
        }
        columnStart++;
        columnEnd--;
        rowStart++;
        rowEnd--;
    }
};
