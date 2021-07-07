document.getElementById("game_btn").addEventListener("click", function () {
  document.getElementById("leader_names").style.display = "block";
  document.getElementById("backdrop_player").style.display = "block";
});
document.getElementById("leaders_btn").addEventListener("click", function () {
  if (check_player() == -1) return;
  document.getElementById("backdrop_player").style.display = "none";
  window.location.href = "game.html";
  document.getElementById("leader_names").style.display = "none";
});

function check_player() {
  pname = document.getElementById("pname").value;
  if (pname.length > 4) {
    document.getElementsByTagName("p")[0].textContent =
      "Name should be not more than 4 characters";
    document.getElementById("leader_names").style.left = "30%";
    return -1;
  } else if (pname.length == 0) {
    document.getElementsByTagName("p")[0].textContent =
      "Name should be not be empty";
    document.getElementById("leader_names").style.left = "35%";
    return -1;
  } else {
    document.getElementsByTagName("p")[0].textContent = "";
    document.getElementById("leader_names").style.left = "40%";
  }

  localStorage.setItem(PLAYER_NAME, pname);

  saved_players = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");
  // check if there are player and if the username already exists
  if (saved_players.length > 0) {
    for (let i = 0; i < saved_players.length; i++) {
      if (saved_players[i].name != pname && i + 1 == saved_players.length) {
        saved_players.push({ name: pname, score: 0, level: 1 });
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(saved_players));
      }
    }
  } else {
    localStorage.setItem(
      PLAYERS_KEY,
      JSON.stringify([{ name: pname, score: 0, level: 0 }])
    );
  }
}

document.getElementById("backdrop_player").addEventListener("click", function(){
  document.getElementById("backdrop_player").style.display = "none"
  document.getElementById("leader_names").style.display = "none"
})