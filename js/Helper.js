class Helper {
  clamp(v, min, max) {
    if (v < min) {
      return min;
    } else if (v > max) {
      return max;
    } else {
      return v;
    }
  }
  rand(min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = 1;
    return min + Math.random() * (max - min);
  }
  rectsIntersect(r1, r2) {
    return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
    );
  }
}
export default Helper;
