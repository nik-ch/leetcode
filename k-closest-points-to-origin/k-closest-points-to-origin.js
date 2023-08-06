// https://leetcode.com/problems/k-closest-points-to-origin/description/

/**
 * 1st approach, using priority queue.
 * Time: O (N lg N)
 * Space: O (N)
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
  const pq = new PriorityQueue({
    compare: (a, b) => {
      const [[x1, y1], distance1] = a;
      const [[x2, y2], distance2] = b;
      return distance1 - distance2;
    }
  });

  for (let [x, y] of points) {
    const distance = Math.sqrt(x ** 2 + y ** 2);
    pq.enqueue([[x, y], distance]); 
  }

  const result = [];
  for (let i = 0; i < k; i++) {
      result.push(pq.dequeue()[0]);
  }

  return result;
};


/**
 * 2nd approach, using quick select algorithm.
 * Time: O(N), O(N) to count all distances, ~O(N) for quick select.
 * Space: O(N)
 */


/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    if (k === points.length) {
      return points;
    }

    const distances = points.reduce((accum, [x, y]) => {
        accum.push([[x ,y], Math.sqrt(x ** 2 + y ** 2)]);
        return accum;
    }, []);

    let start = 0, end = distances.length - 1;
    let target = k;
    while (end > start) {
        const p = partition(distances, start, end);
        const left = p - start + 1;
        if (left > target) {
          end = p - 1;
        } else if (left < target) {
            start = p + 1;
            target -= left;
        } else {
          break;
        }
    }

    return distances.slice(0, k).map(([coords]) => coords);
}

const partition = (array, start, end) => {
  const p = start;
  let i = start + 1, j = end;

  while (true) {
    while (i < end && array[i][1] < array[p][1]) i++;
    while (j > start && array[j][1] >= array[p][1]) j--;
    if (j > i) {
      swap(array, i, j);
    } else {
      break;
    }
  }
  swap(array, j, p);

  return j;
};

const swap = (a, i, j) => {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
};
