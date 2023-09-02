// @ts-check
/* 
Made by Nixuge, september 2nd 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
const leaderboardKeys = {
    "blitz": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "nexus_jumps", displayName: "Dégats au Nexus"}
    ],
    "hikabrain": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"}
    ],
    "infected": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_lost", displayName: "Défaites", hidden: true}
    ],
    "landrush": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "broken_beds", displayName: "Lits détruits"}
    ],
    "mma": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "damages", displayName: "Dégats"},
        {id: "games_lost", displayName: "Défaites", hidden: true},
    ],
    "pvpsmash": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "damages", displayName: "Dégats"},
        {id: "games_lost", displayName: "Défaites", hidden: true}
    ],
    "rush": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "broken_beds", displayName: "Lits détruits"}
    ],
    // Not shown by default. Might add later.
    // "rushretro": [
    //     {id: "glory", displayName: "Points"},
    //     {id: "games_played", displayName: "Parties"},
    //     {id: "play_time", displayName: "Temps de jeu"},
    //     {id: "kills", displayName: "Kills"},
    //     {id: "deaths", displayName: "Morts"},
    //     {id: "broken_beds", displayName: "Lits détruits"},
    //     {id: "games_won", displayName: "Victoires"},
    //     {id: "games_lost", displayName: "Défaites"}
    // ],
    "shootcraft": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_lost", displayName: "Défaites", hidden: true}
    ],
    "skywars": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_lost", displayName: "Défaites", hidden: true}
    ],
    "survival": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "games_lost", displayName: "Défaites", hidden: true}
    ]
};

function setActiveGame() {
    // @ts-ignore
    const navElem = document.getElementsByClassName(`nav-games-${gameName}`)[0];
    navElem.classList.add("active")
}

setActiveGame();