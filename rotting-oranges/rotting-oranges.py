# https://leetcode.com/problems/rotting-oranges

# Times: O(M * N)
# Space: O(M * N)

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        # for every rotten orange count how much time it will take to rot every other orange
        # when working with new rotten orange set, update time to rot as minimum between two
        rows = len(grid)
        cols = len(grid[0])
        directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        visited = {}

        q = deque()
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 2:
                    q.append([row, col, 0])
                    visited[(row, col)] = 0

        while q:
            [row, col, time] = q.popleft()
            for [row_diff, col_diff] in directions:
                new_row = row + row_diff
                new_col = col + col_diff
                new_time = time + 1

                if new_row < 0 or new_col < 0 or new_row == rows or new_col == cols:
                    continue
                if grid[new_row][new_col] == 0:
                    continue
                if (new_row, new_col) in visited and visited[(new_row, new_col)] <= new_time:
                    continue

                visited[(new_row, new_col)] = new_time
                q.append([new_row, new_col, new_time])

        max_time = 0
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 1:
                    if (row, col) not in visited:
                        return -1
                    else:
                        max_time = max(max_time, visited[(row, col)])
        
        return max_time