class laser {
  constructor(element, x, y) {
    this.element = element;
    this.x = x;
    this.y = y;
  }
}
//create laser element:
const game = new Game();
function createLaser($container, x, y) {
  const element = document.createElement("img");
  element.src = "laser-blue-3.png";
  element.className = "laser";
  $container.appendChild(element);

  const PLaser = new laser(x, y, element);
  const game = new Game();
  game.lasers.push(PLaser); //array holds all the playerlasesrs at game 
  const audio = new Audio("sound/sfx-laser1.ogg");
  audio.play();

  setPosition(element, x, y);
}

//update lasers:
function updateLasers(dt, containers) {
  
  const game = new Game();
  const laserele = game.lasers;
  //const PLaser = new laser(x, y, element);
  for (var i = 0; i < laserele.length; i++) {
    const lasere = laserele[i];
    /*game.setConfig();
    game.getConfig("laserMaxSpeed");
*/
    lasere.y -= dt * game.laserMaxSpeed;
    if (lasere.y < 0) {
      destroylasers(containers, lasere);
    }
    setPosition(lasere.element, lasere.x, lasere.y);
    const r1 = lasere.element.getBoundingClientRect();
    const enemy = game.enemies;
    for (let j = 0; j < enemy.length; j++) {
      const enemi = enemy[j];
      if(enemi.isDead) continue;  
      const r2= enemi.element.getBoundingClientRect(); 
      if(Helper. rectsIntersect(r1,r2))   
      {
      destroylasers(containers,lasere);
      //const enemys= new Enemy;
      destroyEnemy(containers,enemi);
      break;  
        
    }
  }}
}
game.lasers = game.lasers.filter(e => !e.isDead);
function destroylasers(containers,laser)
{
containers.removeChild(laser.element)
laser.isDead=true;

}
//======================================================*//
function createEnemyLaser(container,x,y)
{
const elements=document.createElement("img")
elements.src="laser-red-3.png"
elements.className="enemy";
container.appendChild(elements);



}
 
