// @Todo >> Import the player class here and use it
//@Todo >> May be want to set the configs in a more convienent way
//Don't forget to add type="module" in script tag when including script in html
class Game {
  constructor(width, height) {
    this.height = height;
    this.width = width;
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
    this.gameOver = false;
  }
  setConfig(
    PLAYER_WIDTH = 20,
    PLAYER_MAX_SPEED = 600,
    LASER_MAX_SPEED = 200.0,
    LASER_COOLDOWN = 0.5,
    ENEMIES_PER_ROW = 5,
    ENEMY_HORIZONTAL_PADDING = 80,
    ENEMY_VERTICAL_PADDING = 170,
    ENEMY_VERTICAL_SPACING = 80,
    ENEMY_COOLDOWN = 5.0
  ) {
    //key codes
    this.KEY_CODE_LEFT = 37;
    this.KEY_CODE_RIGHT = 39;
    this.KEY_CODE_SPACE = 32;
    //Game configs
    this.PLAYER_WIDTH = PLAYER_WIDTH;
    this.PLAYER_MAX_SPEED = PLAYER_MAX_SPEED;
    this.LASER_MAX_SPEED = LASER_MAX_SPEED;
    this.LASER_COOLDOWN = LASER_COOLDOWN;

    this.ENEMIES_PER_ROW = ENEMIES_PER_ROW;
    this.ENEMY_HORIZONTAL_PADDING = ENEMY_HORIZONTAL_PADDING;
    this.ENEMY_VERTICAL_PADDING = ENEMY_VERTICAL_PADDING;
    this.ENEMY_VERTICAL_SPACING = ENEMY_VERTICAL_SPACING;
    this.ENEMY_COOLDOWN = ENEMY_COOLDOWN;
  }
  getConfig(name) {
    const gameConfig = {
      keyCodeLeft: this.KEY_CODE_LEFT,
      keyCodeRight: this.KEY_CODE_RIGHT,
      keyCodeSpace: this.KEY_CODE_SPACE,
      playerWidth: this.PLAYER_WIDTH,
      playerMaxSpeed: this.PLAYER_MAX_SPEED,
      laserMaxSpeed: this.LASER_MAX_SPEED,
      laserCooldown: this.LASER_COOLDOWN,
      enemiesPerRow: this.ENEMIES_PER_ROW,
      enemyHorizontalPadding: this.ENEMY_HORIZONTAL_PADDING,
      enemyVerticalPadding: this.ENEMY_VERTICAL_PADDING,
      enemyverticalSpacing: this.ENEMY_VERTICAL_SPACING,
      enemyCooldwon: this.ENEMY_COOLDOWN,
    };
    return gameConfig[name];
  }
  //initiates game
  init() {
    this.setConfig();

    const $container = document.querySelector(".game");
    // player.createPlayer($container); //this need the player class

    const enemySpacing =
      (this.width - this.ENEMY_HORIZONTAL_PADDING * 2) /
      (this.ENEMIES_PER_ROW - 1);
    console.log(enemySpacing);
    for (let j = 0; j < 3; j++) {
      const y = this.ENEMY_VERTICAL_PADDING + j * this.ENEMY_VERTICAL_SPACING;
      for (let i = 0; i < this.ENEMIES_PER_ROW; i++) {
        const x = i * enemySpacing + this.ENEMY_HORIZONTAL_PADDING;
        //player.createEnemy($container, x, y); //needs the Player Class
      }
    }
  }
}
export default Game;
