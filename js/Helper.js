function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}
function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}
function touch(r1, r2) {
  var is_colliding = function (div1, div2) {
    var d1_height = div1.offsetHeight;
    var d1_width = div1.offsetWidth;
    var d1_distance_from_top = div1.offsetTop + d1_height;
    var d1_distance_from_left = div1.offsetLeft + d1_width;

    var d2_height = div2.offsetHeight;
    var d2_width = div2.offsetWidth;
    var d2_distance_from_top = div2.offsetTop + d2_height;
    var d2_distance_from_left = div2.offsetLeft + d2_width;

    var not_colliding =
      d1_distance_from_top < div2.offsetTop ||
      div1.offsetTop > d2_distance_from_top ||
      d1_distance_from_left < div2.offsetTop ||
      div1.offsetLeft > d2_distance_from_left;

    return !not_colliding;
  };
}
