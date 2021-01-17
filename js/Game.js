// @Todo >> Import the player class here and use it
//@Todo >> May be want to set the configs in a more convienent way
//Don't forget to add type="module" in script tag when including script in html
class Game {
  constructor() {
    this.lastTime = Date.now();
    this.leftPressed = false;
    this.rightPressed = false;
    this.spacePressed = false;
    this.playerX = 0;
    this.playerY = 0;
    this.playerCooldown = 0;
    this.lasers = [];
    this.enemies = [];
    this.enemyLasers = [];
    this.presents = [];
    this.gameOver = false;
  }

  //initiates game
  init() {
    const $container = document.querySelector(".game");

    if (levels === 1) {
      player.create($container, "Images/player-blue-1.png");
    }

    if (levels === 2) {
      ENEMIES_PER_ROW = 7;
      ENEMY_COOLDOWN = 10;
      player.create($container, "Images/player-red-1.png"); //this need the player class
    }

    if (levels === 3) {
      ENEMIES_PER_ROW = 10;
      ENEMY_COOLDOWN = 5;
      player.create($container, "Images/player-green-1.png");
      const next = document.querySelector("#next");
      next.innerText = "Restart";
      next.addEventListener("click", () => {
        window.location.reload();
      });
    }

    const enemySpacing =
      (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);

    for (let j = 0; j < 3; j++) {
      const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
      for (let i = 0; i < ENEMIES_PER_ROW; i++) {
        const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
        const enemy = new Enemy(x, y);
        const src = "Images/chicken.png";
        enemy.create($container, src); //needs the Player Class
      }
    }
  }
}
