class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //create laser element:

  create(container) {
    const $element = document.createElement("img");
    if (levels == 1) {
      $element.src = "Images/laser-blue-1.png";
    }
    if (levels == 2) {
      $element.src = "Images/laser-red-1.png";
    }
    if (levels == 3) {
      $element.src = "Images/laser-green-11.png";
    }

    $element.className = "laser";
    this.$element = $element;
    container.appendChild($element);

    game.lasers.push(this); //array holds all the playerlasesrs at game

    setPosition($element, this.x, this.y);

    const audio = new Audio("sound/sfx-laser1.ogg");
    if (AUDIO) audio.play();
  }

  //======================================================*//
  createEnemyLaser(containers, imgSrc) {
    if (ENEMY_X != 0) {
      const $element = document.createElement("img");
      $element.src = imgSrc;//"Images/egg.png";
      $element.className = "enemy-laser";
      this.$element = $element;
      containers.appendChild($element);
      game.enemyLasers.push(this);
      setPosition($element, this.x, this.y);
    }
  }
}
//update lasers:
function updateLasers(dt, containers) {
  const lasers = game.lasers;
  for (var i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED;
    if (laser.y < 0) {
      destroylasers(containers, laser);
    }

    setPosition(laser.$element, laser.x, laser.y);

    const r1 = laser.$element.getBoundingClientRect();
    const enemies = game.enemies;
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];

      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();

      if (rectsIntersect(r1, r2)) {
        enemy.destroy(containers, enemy);
        destroylasers(containers, laser);

        break;
      }
    }
  }
  game.lasers = game.lasers.filter((e) => !e.isDead);
}

function destroylasers(containers, laser) {
  containers.removeChild(laser.$element);
  laser.isDead = true;
}

function updateEnemyLasers(dt, containers) {
  const lasers = game.enemyLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroylasers(containers, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const $player = document.querySelector(".player");
    const r2 = $player.getBoundingClientRect();

    if (rectsIntersect(r1, r2)) {
      destroylasers(containers, laser);
      lives--;

      const audio = new Audio("sound/destroy.mp3");
      if (AUDIO) audio.play();
      document.getElementById("lives").innerHTML = lives;

      if (lives == 0) {
        player.destroy(containers, $player);
        game.gameOver = true;
        break;
      }
    }
  }
  console.log(lives);

  game.enemyLasers = game.enemyLasers.filter((e) => !e.isDead);
}
