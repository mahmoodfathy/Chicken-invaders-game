class Player {
  create(container, img) {
    game.playerX = game.width / 2;
    game.playerY = game.height - 50;
    const player = document.createElement("img");
    player.src = img;
    player.className = "player";
    container.appendChild(player);
    game.setPosition(player, game.playerX, game.playerY);
  }
  update(dt, $container) {
    if (game.leftPressed) game.playerX -= dt * PLAYER_MAX_SPEED;
    if (game.rightPressed) game.playerX += dt * PLAYER_MAX_SPEED;

    // not to get out of the screen
    game.playerX = this.clamp(
      game.playerX,
      PLAYER_WIDTH,
      GAME_WIDTH - PLAYER_WIDTH
    );

    if (game.spacePressed && game.playerCooldown <= 0) {
      const laser = new Laser(game.playerX, game.playerY);
      laser.create($container);
      game.playerCooldown = LASER_COOLDOWN;
    }
    if (game.playerCooldown > 0) {
      game.playerCooldown -= dt;
    }

    const player = document.querySelector(".player");
    setPosition(player, game.playerX, game.playerY);
  }

  // here just checking if te player reached the boundries of the screen
  clamp(v, min, max) {
    if (v < min) {
      return min;
    } else if (v > max) {
      return max;
    } else {
      return v;
    }
  }

  destroy(container, player) {
    container.removeChild(player);
    game.gameOver = true;
    const audio = new Audio("sound/chicken-sound.mp3");
    audio.play();
  }

  won() {
    return game.enemies.length === 0;
  }
}
