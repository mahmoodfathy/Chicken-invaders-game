function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}
function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function save_progress() {
  pname = localStorage.getItem(PLAYER_NAME);
  saved_players = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");
  saved_players.sort((a, b) => (a.score < b.score ? 1 : -1));
  // check if there are player and if the username already exists
  if (saved_players.length > 0) {
    for (let i = 0; i < saved_players.length; i++) {
      if (saved_players[i].name == pname) {
        saved_players[i].level = levels;
        saved_players[i].score += SCORE;
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(saved_players));
        break;
      }
    }
  }
}
