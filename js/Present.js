class Present {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  create($container) {
    const $element = document.createElement("img");
    if(levels ==1)
      $element.src = "Images/level1_reward-removebg-preview.png";
    else if(levels ==2)
      $element.src = "Images/fried-chicken.png";
    else if(levels ==3)
      $element.src = "Images/fried-chicken.png";
    $element.className = "present";
    this.$element = $element;
    $container.appendChild($element);

    game.presents.push(this);
    setPosition($element, this.x, this.y);
  }

  destroy($container) {
    $container.removeChild(this.$element);
    this.isDead = true;
  }
}

function updatePresents(dt, $container) {
  const presents = game.presents;

  for (let i = 0; i < presents.length; i++) {
    const present = presents[i];
    present.y += dt * LASER_MAX_SPEED;

    if (present.y > GAME_HEIGHT) present.destroy($container);

    if (game.gameOver) return;

    setPosition(present.$element, present.x, present.y);

    const r1 = present.$element.getBoundingClientRect();

    const $player = document.querySelector(".player");
    const r2 = $player.getBoundingClientRect();

    if (rectsIntersect(r1, r2)) {
      present.destroy($container);
      SCORE += 5;
      document.getElementById("score").innerText = SCORE;
      const audio = new Audio("sound/bite.mp3");
      if (AUDIO) {
        audio.play();
      }

      break;
    }
  }

  game.presents = game.presents.filter((e) => !e.isDead);
}
