# https://leetcode.com/problems/palindromic-substrings/

# Time: O(N ^ 2)
# Space: O(1)
class Solution:
    def countSubstrings(self, s: str) -> int:
        res = 0
        length = len(s)
        for i in range(length):
            # odd
            res += self.check(s, i, i, 0, length)
            # even
            res += self.check(s, i, i + 1, 0, length)

        return res

    def check(self, row, left, right, start, end):
        counter = 0
        while left >= start and right < end and row[left] == row[right]:
            counter += 1
            left -= 1
            right += 1
        return counter