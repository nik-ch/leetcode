# https://leetcode.com/problems/permutations

# Time complexity: O(N * N!)

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(permutations):
            if len(permutations) == len(nums):
                result.append(permutations.copy())
                return
            for num in nums:
                if num not in permutations:
                    permutations.append(num)
                    backtrack(permutations)
                    permutations.pop()

        backtrack([])

        return result