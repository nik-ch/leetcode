# https://leetcode.com/problems/n-queens/

# Time complexity: N! to place each queen - for the first queen there are N cells available, for the second one - at least N - 2 (minus column from the first
# and minus diagonal from the first), and so on. Time to build final desk to add to ouput - N ^ 2, so final complexity: N! + N^2 = O(N!)
# 
# Space complexity - O(N ^ 2)

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        result = []
        total = n * n

        def backtrack(row, desk, col_set, diag_set, anti_diag_set):
            if row == n:
                desk_result = [''.join(row) for row in desk]
                result.append(desk_result)
                return
            for col in range(n):
                diag = row - col
                anti_diag = row + col

                if col in col_set or diag in diag_set or anti_diag in anti_diag_set:
                    continue

                col_set.add(col)
                diag_set.add(diag)
                anti_diag_set.add(anti_diag)
                desk[row][col] = 'Q'

                backtrack(row + 1, desk, col_set, diag_set, anti_diag_set)

                col_set.remove(col)
                diag_set.remove(diag)
                anti_diag_set.remove(anti_diag)
                desk[row][col] = '.'

        backtrack(0, [['.'] * n for _ in range(n)], set(), set(), set())

        return result
