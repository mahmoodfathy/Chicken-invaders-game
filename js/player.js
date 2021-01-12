class Player{
    constructor(gameObject){
    }
    create(container, img){
        game.playerX = game.width / 2;
        game.playerY = game.height - 50;
        const player = document.createElement("img");
        player.src = img;
        player.className = "player";
        container.appendChild(player);
        game.setPosition(player, game.playerX, game.playerY);
      }
}
