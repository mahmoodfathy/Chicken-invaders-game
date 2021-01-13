class laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //create laser element:

  createLaser(container) {
    const element = document.createElement("img");
    element.src = "images/laser-blue-3.png";
    element.className = "enemylaser";
    this.element = element;
    container.appendChild(element);
    const PLaser = this; 
   
    game.lasers.push(PLaser); //array holds all the playerlasesrs at game

    const audio = new Audio("audio/sfx-laser1.ogg");
    audio.play();

    setPosition(element,this.x,this.y);
  }

  //update lasers:
  updateLasers(dt, containers) {
    const laserele = game.lasers;
    for (var i = 0; i < laserele.length; i++) {
      const laser = laserele[i];
      laser.y -= dt * LASER_MAX_SPEED ;
      if (laser.y < 0) {
        destroylasers(containers, laser);
      }
      setPosition(element, this.x, this.y);
      const r1 = laser.element.getBoundingClientRect();
      const enemy = game.enemies;
      for (let j = 0; j < enemy.length; j++) {
        const enemi = enemy[j];
        if (enemi.isDead) continue;
        const r2 = enemi.element.getBoundingClientRect();
    
        if (Helper.rectsIntersect(r1, r2)) {
          destroylasers(containers, laser);
          //const enemys= new Enemy();
          destroyEnemy(containers, enemi);
          break;
        }
      }
    }
  }
  lasers = game.laser;
  lasers = lasers.filter((e) => !e.isDead);
  destroylasers(containers, laser) {
    containers.removeChild(laser.element);
    laser.isDead = true;
  }
  //======================================================*//
  createEnemyLaser(containers) {
    
    const element = document.createElement("img");
    element.src = "images/egg2.png";
    element.className = "enemylaser";
    this.element = element;
    containers.appendChild(element);

   const lenemy = this;
    game.enemylaser.push(lenemy);
    setPosition(elements,this.x,this.y);
  }
  updateEnemylaser(dt, containers) {
    
    enemy = game.enemyLaser;
    for (let i = 0; i < enemy.length; i++) {
      const laser = enemy[i];
      laser.y += dt *LASER_MAX_SPEED ;
      if (laser.y < game.height) {
      destroylasers(containers, laser);
      }
      r1 = laser.element.getBoundingClientRect();
      const player = new player();
      r2 = player;
 
      if (Helper.rectsIntersect(r1, r2)) {
      destroylasers(containers, laser);
       destroylasers(player);
        break;
      }
    }
    lasers = game.laser;
    lasers = lasers.filter((e) => !e.isDead);
  }
}
