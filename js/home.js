document.getElementById("game_btn").addEventListener("click", function(){
    document.getElementById("leader_names").style.display = "block";
    // console.log("ASDASDASDASDJ");
  })
  document.getElementById("leaders_btn").addEventListener("click", function(){
    check_player()
    window.location.href = "game.html";
    document.getElementById("leader_names").style.display = "none";
})

function check_player(){
  pname =   document.getElementById("pname").value;
  localStorage.setItem(PLAYER_NAME, pname);

  saved_players = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");
  // check if there are player and if the username already exists
  if(saved_players.length > 0){
    for(let i = 0; i<saved_players.length; i++){
      if(saved_players[i].name != pname && i+1==saved_players.length){
        saved_players.push({name: pname, score: 0, level: 1});
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(saved_players));
      }
    }
  }
  else{
    localStorage.setItem(PLAYERS_KEY, JSON.stringify([{name: pname, score: 0, level: 1}]));
  }
}

