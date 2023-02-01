// https://leetcode.com/problems/course-schedule-ii

/**
 * 1st approach, DFS. Time complexity: O(V + E), space complexity: O(V).
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  if (numCourses === 1) {
      return [0];
  }

  const WHITE = 0;
  const GREY = 1;
  const BLACK = 2;

  // holds colors for nodes
  const colors = new Map();
  // adjacency map
  const adj = new Map();
  // holds result
  const res = [];
  // flag to stop if cycle detected
  let possible = true;

  // build adjacency map
  prerequisites.forEach(([dst, src]) => {
      const adjVal = adj.get(src);
      if (!adjVal) {
          adj.set(src, [dst]);
      } else {
          adjVal.push(dst);
      }
  });

  const dsf = (n) => {
      if (!possible) {
          return;
      }
      // processing only white colors
      if (!colors.get(n)) {
          colors.set(n, GREY);
          const neighbours = adj.get(n);
          if (neighbours) {
              neighbours.forEach(neigh => {
                  const color = colors.get(neigh) || 0;
                  if (color === WHITE) {
                      dsf(neigh);
                  } else if (color === GREY) {
                      possible = false;
                  }
              });
          }
          colors.set(n, BLACK);
          res.push(n);
      }
  };

  for (let i = 0; i < numCourses && possible; i++) {
    dsf(i);
  }

  if (possible) {
      const answer = [];
      for (let i = res.length - 1; i >= 0; i--) {
          answer.push(res[i]);
      }
      return answer;
  } else {
      return [];
  }

};



/**
 * 2nd approach, Kahn's algorithm. Time complexity: O(V + E), space complexity: O(V).
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    if (numCourses === 1) {
        return [0];
    }

    // holds indegress for every course
    const indegrees = new Map();
    // holds adjacency for all nodes;
    const adj = new Map();
    // holds topologically sorted graph
    const result = [];

    // building adj map as well as indegree map
    prerequisites.forEach(prereq => {
      const [dst, src] = prereq;
      const neighbours = adj.get(src);
      if (!neighbours) {
          adj.set(src, [dst]);
      } else {
          neighbours.push(dst);
      }
      indegrees.set(dst, (indegrees.get(dst) || 0) + 1);
    });

    // building queue that holds all elements with 0 indegree
    const q = [];
    for (let i = 0; i < numCourses; i++) {
      if (!indegrees.get(i)) {
          q.push(i);
      }
    }

    // iterating over 0-indegree queue
    while(q.length !== 0) {
        const course = q.shift();
        // put this course to the result array
        result.push(course);
        // decrease neighbours indegree values
        const neighbours = adj.get(course);
        if (neighbours) {
            neighbours.forEach(n => {
                const indegree = indegrees.get(n) - 1;
                indegrees.set(n, indegree);
                // put neighbour to the proccessed queue if it's indegree become 0
                if (indegree === 0) {
                    q.push(n);
                }
            });
        }
    }

    if (result.length === numCourses) {
        return result;
    } else {
        return [];
    }
};