# https://leetcode.com/problems/combination-sum/


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # sort incoming array
        candidates.sort()

        result = []

        # define backtrack function
        def backtrack(nums, nums_sum, idx):
            if nums_sum == target:
                result.append(nums)
                return True
            elif nums_sum > target:
                return True
            else:
                for i in range(idx, len(candidates)):
                    dive_res = backtrack(nums + [candidates[i]], nums_sum + candidates[i], i)
                    if dive_res == True:
                        break

        backtrack([], 0, 0)

        return result
