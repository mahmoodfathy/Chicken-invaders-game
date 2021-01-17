saved_players = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");
saved_players.sort((a, b) => (a.score < b.score) ? 1 : -1)

create_row(saved_players)

function create_row(saved_players){
    var cell;
    for(player of saved_players){
        var row = document.createElement('tr');
        cell = document.createElement('td');
        row.appendChild(cell);
        for(key in player){
            my_cell = document.createElement('td');
            my_cell.innerHTML = player[key];
            row.appendChild(my_cell);
        }
        document.getElementsByTagName("table")[0].appendChild(row)
    }
}

