// https://leetcode.com/problems/car-fleet/

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    let fleets = 0;

    const posSpeed = position.map((p, i) => [p, speed[i]]);
    posSpeed.sort((a, b) => a[0] - b[0]);
    let currTime = 0;

    for (let i = position.length - 1; i >= 0; i--) {
        const [p, s] = posSpeed[i];
        const time = (target - p) / s;
        if (currTime < time) {
            currTime = time;
            fleets++;
        }
    }

    return fleets;
};
