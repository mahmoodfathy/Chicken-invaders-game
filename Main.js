const game = new Game();
game.init();
function playerHasWon() {
  return game.enemies.length === 0;
}
function updatePlayer(dt, $container) {
  if (game.leftPressed) {
    game.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (game.rightPressed) {
    game.playerX += dt * PLAYER_MAX_SPEED;
  }

  game.playerX = clamp(game.playerX, PLAYER_WIDTH, GAME_WIDTH - PLAYER_WIDTH);

  if (game.spacePressed && game.playerCooldown <= 0) {
    createLaser($container, game.playerX, game.playerY);
    game.playerCooldown = LASER_COOLDOWN;
  }
  if (game.playerCooldown > 0) {
    game.playerCooldown -= dt;
  }

  const player = document.querySelector(".player");
  setPosition(player, game.playerX, game.playerY);
}
function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - game.lastTime) / 1000.0;

  if (game.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    return;
  }

  if (playerHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }

  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);

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
function updateLasers(dt, $container) {
  const lasers = game.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED;
    if (laser.y < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const enemies = game.enemies;
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];

      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        // Enemy was hit
        enemy.destroy($container, enemy);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  game.lasers = game.lasers.filter((e) => !e.isDead);
}
function updateEnemyLasers(dt, $container) {
  // const game = new Game();

  const lasers = game.enemyLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    const r2 = player.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Player was hit
      destroyPlayer($container, player);
      break;
    }
  }
  game.enemyLasers = game.enemyLasers.filter((e) => !e.isDead);
}

function createEnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "Images/egg2.png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  game.enemyLasers.push(laser);
  setPosition($element, x, y);
}
function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}
function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "Images/laser-blue-1.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  game.lasers.push(laser);
  const audio = new Audio("sound/sfx-laser1.ogg");
  audio.play();
  setPosition($element, x, y);
}
function destroyPlayer($container, player) {
  $container.removeChild(player);
  game.gameOver = true;
  const audio = new Audio("sound/sfx-lose.ogg");
  audio.play();
}
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
