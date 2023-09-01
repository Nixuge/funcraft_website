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

const monthsTable = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
]

// Used in the dropdown picker
function formatMonth(month_raw) {
    let new_month = month_raw.replace("month-", "");
    const data = new_month.split("-");
    const year = data[0];
    const month = monthsTable[data[1]-1]
    return `${month} ${year}`
}

// Used in the stats month viewer
// (same as original but suboptimal? may be replaced by above)
function formatMonthNoYear(month_raw) {
    let new_month = month_raw.replace("month-", "");
    const data = new_month.split("-");
    return monthsTable[data[1]-1];
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

function formatSToHHMM(seconds) {
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    return `${hours}h ${minutes}m`
}

// Replace the friendlist data url.
// Done this way as i wanted to make the website stay as original as possible,
// even if it's kinda suboptimal in some places.
document.getElementById("player-friends-content").setAttribute("data-url", `/joueur/${username}/friendlist`)