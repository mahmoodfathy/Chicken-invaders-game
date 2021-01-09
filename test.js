import Game from "./js/Game.js";
import Helper from "./js/Helper.js";

const game = new Game(110, 80);
const helper = new Helper();
game.setConfig();
game.init();
console.log(helper.clamp(10, 5, 9));
