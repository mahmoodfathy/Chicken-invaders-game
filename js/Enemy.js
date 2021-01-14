class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cooldown = rand(0.5, ENEMY_COOLDOWN); //random cooldown
  }

  create(container, src) {
    const $element = document.createElement("img");
    $element.src = src;
    $element.className = "enemy";
    container.appendChild($element);

    //const enemy = new Enemy(x, y, $element); { ...this, $element }
    this.$element = $element;
    game.enemies.push(this); //array holds all the enemies

    setPosition($element, this.x, this.y);
  }

  destroy(container, enemy) {
    //container.removeChild(enemy.$element);

    const $explosion = document.createElement("img");
    $explosion.src = "Images/laser-red-8.png";
    $explosion.className = "explosion";
    $explosion.style.transform = enemy.$element.style.transform;
    container.replaceChild($explosion, enemy.$element);
    enemy.isDead = true;
    // const audio = new Audio("sound/chicken-sound.mp3");
    // audio.play();

    setTimeout(() => {
      //timer to remove explosion
      container.removeChild($explosion);
    }, 5);
  }
}

function updateEnemies(dt, container) {
  //we sin and cos to make enemies move in a circular way

  const dx = Math.sin(game.lastTime / 1000.0) * 50;
  const dy = Math.cos(game.lastTime / 1000.0) * 10;

  const enemies = game.enemies;

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);

    enemy.cooldown -= dt; //decrease cooldown time
    if (enemy.cooldown <= 0) {
      //check if the laser cooled down
      const laser = new Laser(x, y);
      laser.createEnemyLaser(container);
      //reset cooldown
      enemy.cooldown = ENEMY_COOLDOWN;
    }
  }

  //remove all dead enemies from the array
  game.enemies = game.enemies.filter((e) => !e.isDead);
}