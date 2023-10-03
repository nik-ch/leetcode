# https://leetcode.com/problems/word-ladder/

# 1st approach
# Time: O(N * M ^ 2), where N - wordList length, M - endWord length
# Space: O(N * M ^ 2)
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        length = len(endWord)
        combos = {}
        for word in wordList:
            for i in range(length):
                combination = word[0:i] + '*' + word[i + 1:length]
                if combination in combos:
                    combos[combination].append(word)
                else:
                    combos[combination] = [word]

        visited = set()
        queue = deque()
        queue.append((beginWord, 1))

        while queue:
            (prev_word, level) = queue.popleft()
            if prev_word in visited:
                continue

            new_level = level + 1
            visited.add(prev_word)
            for i in range(length):
                combination = prev_word[0:i] + '*' + prev_word[i + 1:length]
                if combination not in combos:
                    continue
                
                for word in combos[combination]:
                    if word == endWord:
                        return new_level
                    queue.append((word, new_level))
        
        return 0

# 2nd approach, similar to the 1st one, but running BFS both from the top and from the bottom. Should cut approx half of iterations.
# Time: O(N * M ^ 2), where N - wordList length, M - endWord length
# Space: O(N * M ^ 2)

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        length = len(endWord)
        combos = {}
        end_word_met = False
        for word in wordList:
            if word == endWord:
                end_word_met = True

            for i in range(length):
                combination = word[0:i] + '*' + word[i + 1:length]
                if combination in combos:
                    combos[combination].append(word)
                else:
                    combos[combination] = [word]
        
        if end_word_met == False:
            return 0

        visited_top = {}
        visited_bottom = {}
        queue_top = deque()
        queue_bottom = deque()
        queue_top.append((beginWord, 1))
        queue_bottom.append((endWord, 1))

        def iterate(queue, visited, other_visited):
            q_size = len(queue)
            for _ in range(q_size):
                (word, level) = queue.popleft()
                if word in visited:
                    continue

                if word in other_visited:
                    return level + other_visited[word] - 1
                
                visited[word] = level
                new_level = level + 1
                for i in range(length):
                    combination = word[0:i] + '*' + word[i + 1:length]
                    if combination not in combos:
                        continue

                    for neighbor in combos[combination]:
                        queue.append((neighbor, new_level))
            
            return 0

        while queue_top and queue_bottom:
            ans = 0
            if len(queue_top) < len(queue_bottom):
                ans = iterate(queue_top, visited_top, visited_bottom)
            else:
                ans = iterate(queue_bottom, visited_bottom, visited_top)
            
            if ans != 0:
                return ans

        return 0
        