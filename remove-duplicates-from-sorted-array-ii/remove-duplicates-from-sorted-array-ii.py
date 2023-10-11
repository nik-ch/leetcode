# https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l = 0
        counter = 0
        for r in range(1, len(nums)):
            if nums[l] != nums[r]:
                l += 1
                nums[l] = nums[r]
                counter = 0
            elif counter == 0:
                l += 1
                nums[l] = nums[r]
                counter += 1

        return l + 1 if l > 0 else 1
