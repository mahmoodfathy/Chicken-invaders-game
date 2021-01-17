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
    // createPlayer($container); //this need the player class
    if (levels === 1) {
      player.create($container, "Images/player-blue-1.png");
    }

    //this need the player class

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
        saved_players = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");
        player_name = localStorage.getItem(PLAYER_NAME)
 
        for(player of saved_players){
          if(player.name == player_name){
            player.level = levels
            player.score += SCORE
          }
      }
  
        // saved_players[saved_players.length-1].score+= SCORE
        // saved_players[saved_players.length-1].level = levels
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(saved_players))
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
// function createPlayer($container) {
//   game.playerX = GAME_WIDTH / 2;
//   game.playerY = GAME_HEIGHT - 50;
//   const $player = document.createElement("img");
//   $player.src = "Images/player-blue-1.png";
//   $player.className = "player";
//   $container.appendChild($player);
//   setPosition($player, game.playerX, game.playerY);
// }
