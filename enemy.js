class Enemy{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.cooldown = rand(0.5, ENEMY_COOLDOWN); //random cooldown
  }

  create($container, x, y, src){
    const $element = document.createElement("img");
    $element.src = src;
    $element.className = "enemy";
    $container.appendChild($element);

    this.$element = $element;
    //const enemy = new Enemy(x, y, $element);

    //GAME_STATE.enemies.push(enemy); //array holds all the enemies
    GAME_STATE.enemies.push(this);
    setPosition($element, x, y);
  }

  destroy($container, enemy){
    //$container.removeChild(enemy.$element);

    const $explosion = document.createElement("img");
    $explosion.src = "img/laser-red-8.png";
    $explosion.className = "explosion";
    $explosion.style.transform = enemy.$element.style.transform;
    $container.replaceChild($explosion, enemy.$element);
    enemy.isDead = true;
    const audio = new Audio("sound/destroy.mp3");
    if(AUDIO)
      audio.play();

    setTimeout(()=>{ //timer to remove explosion
      $container.removeChild($explosion);
    }, 5);

  }

};


function updateEnemies(dt, $container){
  //we sin and cos to make enemies move in a circular way
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const enemies = GAME_STATE.enemies;

  for(let i = 0; i < enemies.length; i++){
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);

    enemy.cooldown -= dt;//decrease cooldown time
    if(enemy.cooldown <= 0){//check if the laser cooled down
      createEnemyLaser($container, x, y);
      //reset cooldown
      enemy.cooldown = ENEMY_COOLDOWN;
    }

  }

  //remove all dead enemies from the array
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}