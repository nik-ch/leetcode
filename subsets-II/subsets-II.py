# https://leetcode.com/problems/subsets-ii/

# Sort initial array so that we could dismiss repeating values while iterating over it. Other than that, apply the same approach as
# in subsets problem - build superset adding current element, start recursion for it with next elements in the array.
# 
# Time complexity: O(N * 2 ^ N) - for each values we decide if we add it to the result or not, that gives us 2^N. Also for reach superset value
# we add it to the final result array, which takes O(N) time to copy it.
# 
# Space complexity: O(N), as we dive as deep as number of elements is.

class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        result = [[]]

        nums.sort()

        def backtrack(start, superset):
            if start == len(nums):
                return
            for idx in range(start, len(nums)):
                num = nums[idx]
                can_iterate = idx > 0 and idx > start and nums[idx] != nums[idx - 1]
                if can_iterate or idx == start:
                    new_superset = superset + [num]
                    result.append(new_superset)
                    backtrack(idx + 1, new_superset)

        backtrack(0, [])

        return result
