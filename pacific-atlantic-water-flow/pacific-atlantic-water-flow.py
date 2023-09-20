#  https://leetcode.com/problems/pacific-atlantic-water-flow/

# DFS implementation
# Time: O(N * M), N - number of rows, M - number of columns
# Space: O(N * M)
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        rows = len(heights)
        cols = len(heights[0])
        directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]
        reached_pacific = set()
        reached_atlantic = set()

        def dfs(row, col, reachable):
            reachable.add((row, col))
            for [diff_row, diff_col] in directions:
                new_row = row + diff_row
                new_col = col + diff_col
                if new_row < 0 or new_col < 0 or new_row == rows or new_col == cols:
                    continue
                if (new_row, new_col) in reachable:
                    continue
                if heights[new_row][new_col] < heights[row][col]:
                    continue
                dfs(new_row, new_col, reachable)

        for row in range(rows):
            dfs(row, 0, reached_pacific)
            dfs(row, cols - 1, reached_atlantic)
        for col in range(cols):
            dfs(0, col, reached_pacific)
            dfs(rows - 1, col, reached_atlantic)

        result = []
        for (row, col) in reached_pacific:
            if (row, col) in reached_atlantic:
                result.append([row, col])

        return result


# BFS implementation
# Time: O(N * M), N - number of rows, M - number of columns
# Space: O(N * M)
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        rows = len(heights)
        cols = len(heights[0])
        directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]
        reached_pacific = set()
        reached_atlantic = set()

        pacific_queue = deque()
        atlantic_queue = deque()

        for row in range(rows):
            pacific_queue.append((row, 0))
            atlantic_queue.append((row, cols - 1))
        for col in range(cols):
            pacific_queue.append((0, col))
            atlantic_queue.append((rows - 1, col))

        def bfs(queue, reachable):
            while queue:
                (row, col) = queue.popleft()
                reachable.add((row, col))
                for [diff_row, diff_col] in directions:
                    new_row = row + diff_row
                    new_col = col + diff_col
                    if new_row < 0 or new_col < 0 or new_row == rows or new_col == cols:
                        continue
                    if (new_row, new_col) in reachable:
                        continue
                    if heights[new_row][new_col] < heights[row][col]:
                        continue
                    queue.append((new_row, new_col))

        bfs(pacific_queue, reached_pacific)
        bfs(atlantic_queue, reached_atlantic)

        result = []
        for (row, col) in reached_pacific:
            if (row, col) in reached_atlantic:
                result.append([row, col])

        return result
