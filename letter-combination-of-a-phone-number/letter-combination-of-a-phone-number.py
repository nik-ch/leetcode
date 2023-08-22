# https://leetcode.com/problems/letter-combinations-of-a-phone-number/

# Time complexity: O(N * 4 ^ N)
# Space complexity: O(N)

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if len(digits) == 0:
            return []

        digits_to_letters = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }

        result = []

        def backtrack(start, superset):
            if start == len(digits):
                result.append(''.join(superset))
                return
            chars = digits_to_letters[digits[start]]
            for char in chars:
                superset.append(char)
                backtrack(start + 1, superset)
                superset.pop()
        
        backtrack(0, [])

        return result
