class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //create laser element:

  create(container) {
    const element = document.createElement("img");
    element.src = "Images/laser-blue-1.png";
    element.className = "enemy-laser";
    this.$element = element;
    container.appendChild(element);
    const PLaser = this;

    game.lasers.push(PLaser); //array holds all the playerlasesrs at game

    const audio = new Audio("audio/sfx-laser1.ogg");
    audio.play();

    setPosition(element, this.x, this.y);
  }

  //======================================================*//
  createEnemyLaser(containers) {
    if(ENEMY_X!=0){
      const element = document.createElement("img");
      element.src = "Images/egg2.png";
      element.className = "enemy-laser";
      this.element = element;
      containers.appendChild(element);
      game.enemyLasers.push(this);
      setPosition(element, this.x, this.y);  
    }
  }
  //update lasers:
  updateLasers(dt, containers) {
    const laserele = game.lasers;
    for (var i = 0; i < laserele.length; i++) {
      const laser = laserele[i];
      laser.y -= dt * LASER_MAX_SPEED;
      if (laser.y < 0) {
        destroylasers(containers, laser);
      }

      setPosition(laser.$element, laser.x, laser.y);

      const r1 = laser.$element.getBoundingClientRect();
      const enemy = game.enemies;
      for (let j = 0; j < enemy.length; j++) {
        const enemi = enemy[j];

        if (enemi.isDead) continue;
        const r2 = enemi.$element.getBoundingClientRect();

        if (rectsIntersect(r1, r2)) {
          destroylasers(containers, laser);
          enemi.destroy(containers, enemi);

          break;
        }
      }
    }
    game.lasers = game.lasers.filter((e) => !e.isDead);
  }

}


function destroylasers(containers, laser) {
  containers.removeChild(laser.$element);
  laser.isDead = true;
}
function updateEnemyLasers(dt, containers) {
  const enemy = game.enemyLasers;
  if(ENEMY_X !=0){
    for (let i = 0; i < enemy.length; i++) {
      const laser = enemy[i];
      laser.y += dt * LASER_MAX_SPEED;
      if (laser.y < 0) {
        destroylasers(containers, laser);
      }
      setPosition(laser.element, laser.x, laser.y);
      const r1 = laser.element.getBoundingClientRect();
      const $player = document.querySelector(".player");
      const r2 = $player.getBoundingClientRect();
  
      if (rectsIntersect(r1, r2)) {
        player.destroy(containers, $player);
        break;
      }
    }  
  }

  game.lasers = game.lasers.filter((e) => !e.isDead);
}
