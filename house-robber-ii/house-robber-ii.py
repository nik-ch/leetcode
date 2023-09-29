# https://leetcode.com/problems/house-robber-ii/

# approach 1, using memoization
# O(N) time, O(N) space
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        def memoize(i, n, memo):
            if i >= n:
                return 0
            if i in memo:
                return memo[i]
            
            skip = memoize(i + 1, n, memo)
            loot = nums[i] + memoize(i + 2, n, memo)
            memo[i] = max(skip, loot)
            return memo[i]
        
        return max(
            memoize(0, len(nums) - 1, {}),
            memoize(1, len(nums), {})
        ) 

# approach 2, DP
# O(N) time, O(1) space
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        if len(nums) == 2:
            return max(nums[0], nums[1])
        
        prev_m = 0
        prev = nums[0]
        for i in range(1, len(nums) - 1):
            temp = prev
            prev = max(prev_m + nums[i], prev)
            prev_m = temp
        
        cur_max = prev

        prev_m = 0
        prev = nums[1]
        for i in range(2, len(nums)):
            temp = prev
            prev = max(prev_m + nums[i], prev)
            prev_m = temp

        return max(cur_max, prev)