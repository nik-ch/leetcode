# https://leetcode.com/problems/longest-common-subsequence/

# 1st approach, recursion with memoization
# Time: O(N * M), N - text1 length, M - text2 length
# Space: O(N * M)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        memo = [[-1 for _ in range(len(text2))] for i in range(len(text1))] 

        def search(i, j, n, m):
            if i == n or j == m:
                return 0
            if memo[i][j] != -1:
                return memo[i][j]

            if text1[i] == text2[j]:
                memo[i][j] = 1 + search(i + 1, j + 1, n, m)
            else:
                memo[i][j] = max(
                    search(i + 1, j, n, m),
                    search(i, j + 1, n, m)
                )

            return memo[i][j]

        return search(0, 0, len(text1), len(text2))

# 2nd approach, dynamic programming
# Time: O(N * M), N - text1 length, M - text2 length
# Space: O(N * M)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        dp = [[0 for j in range(m + 1)] for i in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        
        return dp[n][m]

# 3rd approach, dynamic programming, optimized space
# Time: O(N * M), N - text1 length, M - text2 length
# Space: O(M)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        prev = [0] * (m + 1)

        for i in range(1, n + 1):
            curr = [0] * (m + 1)
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    curr[j] = 1 + prev[j - 1]
                else:
                    curr[j] = max(prev[j], curr[j - 1])
            prev = curr

        return prev[m]