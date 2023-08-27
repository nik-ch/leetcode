# https://leetcode.com/problems/network-delay-time/

# Implementation using dijkstra algorithm
# Time complexity: O(E * log E)
# Space complexity: O(E)

from queue import PriorityQueue

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = [[] for _ in range((n + 1))] 
        for [src, to, w] in times:
            adj[src].append([to, w])

        minq = PriorityQueue()
        minq.put((0, k))
        result = 0
        counted_paths = set()

        while not minq.empty():
            (path_len, v) = minq.get()
            if v in counted_paths:
                continue
            
            result = path_len
            counted_paths.add(v)

            for [neighbour, weight] in adj[v]:
                if neighbour not in counted_paths:
                    minq.put((path_len + weight, neighbour))
        
        return result if len(counted_paths) == n else -1
