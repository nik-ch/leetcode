# https://leetcode.com/problems/course-schedule/

# 1st approach, using DFS.
# Time complexity: O(V + E), where V - number of vertices, E - number of edges.
# Space complexity: O(V)

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        if len(prerequisites) == 0:
            return True

        adj = {}
        for pair in prerequisites:
            if pair[1] in adj:
                adj[pair[1]].append(pair[0])
            else:
                adj[pair[1]] = [pair[0]]

        path = set()
        visited = set()
        for i in range(numCourses):
            res = self.dfs(i, visited, path, adj)
            if res == False:
                return False

        return True

    def dfs(self, course, visited, path, adj):
        if course in path:
            return False

        if course in visited:
            return True

        if course not in adj:
            visited.add(course)
            return True    

        path.add(course)
        for n in adj[course]:
            res = self.dfs(n, visited, path, adj)
            if res == False:
                return False

        visited.add(course)
        path.remove(course)
        return True


# 2nd approach, using Kahn's algorithm
# Time complexity: O(V + E), where V - number of vertices, E - number of edges.
# Space complexity: O(V)

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        if len(prerequisites) == 0:
            return True

        indegree = [0] * numCourses
        adj = [[] for _ in range(numCourses)]

        for pair in prerequisites:
            adj[pair[1]].append(pair[0])
            indegree[pair[0]] += 1

        queue = deque()
        for n in range(numCourses):
            if indegree[n] == 0:
                queue.append(n)

        visited_nodes = 0
        while len(queue) > 0:
            node = queue.popleft()
            visited_nodes += 1

            for neighbour in adj[node]:
                indegree[neighbour] -= 1
                if indegree[neighbour] == 0:
                    queue.append(neighbour)

        return visited_nodes == numCourses
