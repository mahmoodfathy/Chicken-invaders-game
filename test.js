// import Game from "./js/Game.js";
// import Helper from "./js/Helper.js";

// const game = new Game(110, 80);
// const helper = new Helper();
// game.setConfig();
// game.init();
// console.log(helper.clamp(10, 5, 9));
// console.log(window.game);
const element = document.querySelector("#element");
let start;

function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  // `Math.min()` is used here to make sure that the element stops at exactly 200px.
  element.style.transform =
    "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

  if (elapsed < 5000) {
    // Stop the animation after 2 seconds
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
