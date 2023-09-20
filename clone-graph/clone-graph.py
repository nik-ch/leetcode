# https://leetcode.com/problems/clone-graph/

"""
Time complexity: O(V), V - number of vertices
Space complexity: O(V)


# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

from typing import Optional
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if node == None:
            return None
        
        clones = {}
        visited = set()
        nodes_q = deque()
        nodes_q.append(node)

        while nodes_q:
            n = nodes_q.popleft()
            if n in visited:
                continue

            visited.add(n)
            clone = clones[n] if n in clones else Node(n.val)

            for neighbor in n.neighbors:
                nodes_q.append(neighbor)
                if not neighbor in clones:
                    clones[neighbor] = Node(neighbor.val)
                clone.neighbors.append(clones[neighbor])
            
            clones[n] = clone

        return clones[node]
        