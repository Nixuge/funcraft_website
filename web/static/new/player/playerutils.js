/* 
Made by Nixuge, september 1st 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/

const statsKeys = {
    "blitz": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "nexus_jumps", displayName: "Dégats au Nexus"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true}
    ],
    "hikabrain": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"}
    ],
    "infected": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true}
    ],
    "landrush": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "broken_beds", displayName: "Lits détruits"}
    ],
    "mma": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true},
        {id: "damages", displayName: "Dégats"}
    ],
    "pvpsmash": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true},
        {id: "damages", displayName: "Dégats"}
    ],
    "rush": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "broken_beds", displayName: "Lits détruits"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"}
    ],
    "rushretro": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "broken_beds", displayName: "Lits détruits"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"}
    ],
    "shootcraft": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true}
    ],
    "skywars": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true}
    ],
    "survival": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", "nonOriginal": true}
    ]
}

// Replace the friendlist data url.
// Done this way as i wanted to make the website stay as original as possible,
// even if it's kinda suboptimal in some places.
document.getElementById("player-friends-content").setAttribute("data-url", `/joueur/${username}/friendlist`)