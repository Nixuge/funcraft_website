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
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"}
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
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "damages", displayName: "Dégats"}
    ],
    "pvpsmash": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "damages", displayName: "Dégats"}
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
    "rushretro": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "Victoires"},
        {id: "games_lost", displayName: "Défaites"},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"},
        {id: "broken_beds", displayName: "Lits détruits"}
    ],
    "shootcraft": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"}
    ],
    "skywars": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"}
    ],
    "survival": [
        {id: "glory", displayName: "Points"},
        {id: "games_played", displayName: "Parties"},
        {id: "games_won", displayName: "TOP 1"},
        {id: "games_lost", displayName: "Défaites", nonOriginal: true},
        {id: "play_time", displayName: "Temps de jeu"},
        {id: "kills", displayName: "Kills"},
        {id: "deaths", displayName: "Morts"}
    ]
}


function getMonthListOrdered() {
    let months = [];
    // @ts-ignore
    for (const [month, _] of Object.entries(pstats)) {
        months.push(month);
    }
    months.splice(0, 1);
    months.sort().reverse();
    return months;
}
const orderedMonths = getMonthListOrdered();