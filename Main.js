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
  // const game2 = new Game();
  game.init();
  if (levels <= 3) {
    window.requestAnimationFrame(update);
  } else {
    restart.style.display = "block";
    // document.getElementsByClassName("score_modal")[0].innerHTML = "Your score: "+SCORE;
  }
  // if (levels > 3) {
  //   nextLevel.innerText = "Restart";
  //   window.location.reload();
  // }

  // console.log(levels);
  // window.location.reload();
});

game.init();
// console.log(levels);

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - game.lastTime) / 1000.0;

  if (game.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    document.getElementsByClassName("score_modal")[2].innerHTML = "Your score: "+SCORE;

    return;
  }

  if (player.won()) {
    // document.querySelector(".congratulations").style.display = "block";

    document.querySelector("#next-level").style.display = "block";
    document.getElementsByClassName("score_modal")[1].innerHTML = "Your score: "+SCORE;
    // levels++;
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
document.getElementById("mute").addEventListener("click", function(){AUDIO = !AUDIO})
window.requestAnimationFrame(update);
