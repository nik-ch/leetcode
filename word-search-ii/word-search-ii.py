# https://leetcode.com/problems/word-search-ii/

# Time complexity: O(N * 4 * 3 ^ (L - 1)), where N - number of cells, L - max word length. At the beginning we have 4 directions for algorithm to go,
# then for each cell we only have 3 directions (because we cant reuse previous cells)
# Space complexity: O(M) - where M is total number of letters in the dictionary.

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # build trie from incoming words
        word_key = 'word'
        trie = {}
        for word in words:
            node = trie
            for char in word:
                node.setdefault(char, {})
                node = node[char]
            node[word_key] = word
        
        #  define backtrack function
        result = []
        rows = len(board)
        cols = len(board[0])

        def backtrack(node, row, col):
            if row < 0 or row >= rows or col < 0 or col >= cols:
                return

            if board[row][col] not in node:
                return

            char = board[row][col]
            child = node[char]
            word_match = child.pop(word_key, False)

            if word_match:
                result.append(word_match)
            
            directions = [
                [0, 1], [1, 0], [0, -1], [-1, 0]
            ]
            for direction in directions:
                board[row][col] = '#'
                backtrack(child, row + direction[0], col + direction[1])
                board[row][col] = char
            
            if not child:
                node.pop(char)


        # call backtrack function
        for (row_idx, row) in enumerate(board):
            for (col_idx, col) in enumerate(row):
                backtrack(trie, row_idx, col_idx)

        return result
