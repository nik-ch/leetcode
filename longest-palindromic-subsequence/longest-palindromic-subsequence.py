# https://leetcode.com/problems/longest-palindromic-subsequence/

# 1st approach, using memoization and recursion
# Time: O(N ^ 2)
# Space: O(N ^ 2)
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        memo = {}

        def lps(left, right):
            if left > right:
                return 0
            if left == right:
                return 1
            if (left, right) in memo:
                return memo[(left, right)]
            if s[left] == s[right]:
                memo[(left, right)] = 2 + lps(left + 1, right - 1)
            else:
                memo[(left, right)] = max(lps(left + 1, right), lps(left, right - 1))
            return memo[(left, right)]

        return lps(0, len(s) - 1)

# 2nd approach, bottom-up DP.
# Time: O(N ^ 2)
# Space: O(N ^ 2)
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        length = len(s)
        memo = [[0] * length for _ in range(length)]

        for i in range(length - 1, -1, -1):
            memo[i][i] = 1
            for j in range(i + 1, length):
                if s[i] == s[j]:
                    memo[i][j] = 2 + memo[i + 1][j - 1]
                else:
                    memo[i][j] = max(memo[i][j - 1], memo[i + 1][j])
        
        return memo[0][length - 1]

# 3rd approach, bottom-up DP with lower space
# Time: O(N ^ 2)
# Space: O(N)
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        length = len(s)
        prev_row = [0] * length

        for i in range(length - 1, -1, -1):
            curr_row = [0] * length
            curr_row[i] = 1

            for j in range(i + 1, length):
                if s[i] == s[j]:
                    curr_row[j] = 2 + prev_row[j - 1]
                else:
                    curr_row[j] = max(curr_row[j - 1], prev_row[j])
            
            prev_row = curr_row
        
        return prev_row[length - 1]
