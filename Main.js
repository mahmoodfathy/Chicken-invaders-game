const game = new Game();
const player = new Player();

game.init(player);

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - game.lastTime) / 1000.0;

  if (game.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    return;
  }

  if (player.won()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }

  const $container = document.querySelector(".game");
  player.update(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);
  updatePresents(dt, $container);

  game.lastTime = currentTime;
  window.requestAnimationFrame(update);
}
function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    game.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    game.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    game.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    game.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    game.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    game.spacePressed = false;
  }
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
