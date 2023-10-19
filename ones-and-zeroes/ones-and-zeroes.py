# https://leetcode.com/problems/ones-and-zeroes/

# 1st approach, using memoization
# Time: O((k * m * n) + (k * l)), where l - average row length, k - number of rows
# Space: O(k * m * n)

class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        zeroes = [0] * len(strs)
        ones = [0] * len(strs)
        for (i, row) in enumerate(strs):
            for c in row:
                if c == '1':
                    ones[i] += 1
                else:
                    zeroes[i] += 1

        memo = {}

        def find(i, zeroes_left, ones_left):
            if i == len(strs):
                return 0

            if (i, (zeroes_left, ones_left)) in memo:
                return memo[(i, (zeroes_left, ones_left))]

            skip = find(i + 1, zeroes_left, ones_left)
            take = 0
            if (zeroes_left - zeroes[i] >= 0) and (ones_left - ones[i] >= 0):
                take = find(i + 1, zeroes_left - zeroes[i], ones_left - ones[i]) + 1

            memo[(i, (zeroes_left, ones_left))] = max(skip, take)
            return memo[(i, (zeroes_left, ones_left))]

        return find(0, m, n)


# 2nd approach, using bottom-up DP approach
# Time: O(m * n * l * k), where l - average row length, k - number of rows
# Space: O(m * n)

class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]

        for row in strs:
            [zeroes, ones] = self.count_numbers(row)
            for i in range(m, zeroes - 1, -1):
                for j in range(n, ones - 1, -1):
                    dp[i][j] = max(dp[i][j], 1 + dp[i - zeroes][j - ones])

        return dp[m][n]

    def count_numbers(self, row):
        result = [0, 0]
        for c in row:
            if c == '1':
                result[1] += 1
            else:
                result[0] += 1
        return result
        