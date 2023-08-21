# https://leetcode.com/problems/palindrome-partitioning/

# Time complexity: O(N * 2 ^ N)
# Space complexity: O(N)

class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []

        def is_palindrome(row):
            length = len(row)
            for i in range(0, length // 2):
                if row[i] != row[length - 1 - i]:
                    return False
            return True


        def backtrack(start, list):
            if start == len(s):
                result.append(list.copy())
                return
            for i in range(start, len(s)):
                row = s[start:i + 1]
                if is_palindrome(row):
                    list.append(row)
                    backtrack(i + 1, list)
                    list.pop()

        backtrack(0, [])
        return result