const game = new Game();
const player = new Player();
const nextLevel = document.querySelector("#next");
const restart = document.querySelector("#restart");
restart.style.display = "none";

nextLevel.addEventListener("click", () => {
  console.log("clicked");
  levels++;

  document.querySelector("#next-level").style.display = "none";
  const container = document.querySelector(".game");
  player.destroy(container, document.querySelector(".player"));

  game.init();
  if (levels <= 3) {
    window.requestAnimationFrame(update);
  } else {
    restart.style.display = "block";
  }
});

game.init();

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - game.lastTime) / 1000.0;

  if (game.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    document.getElementsByClassName("score_modal")[2].innerHTML =
      "Your score: " + SCORE;

    return;
  }

  if (player.won()) {
    document.querySelector("#next-level").style.display = "block";
    document.getElementsByClassName("score_modal")[1].innerHTML =
      "Your score: " + SCORE;
    save_progress();
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
  } else if (e.key === "m" || e.key == "M") {
    mute_game();
    game.spacePressed = false;
  }
}

function mute_game() {
  AUDIO = !AUDIO;
  if (AUDIO) document.getElementById("mute_icon").style.display = "none";
  else document.getElementById("mute_icon").style.display = "block";
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
document.getElementById("mute").addEventListener("click", mute_game);
document.getElementById("mute_icon").addEventListener("click", function () {
  AUDIO = !AUDIO;
  document.getElementById("mute_icon").style.display = "none";
});
window.requestAnimationFrame(update);
