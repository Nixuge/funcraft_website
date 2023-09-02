// @ts-check
/* 
Made by Nixuge, september 1st 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
function buildStatsHeader() {
    let htmlStr = `<div class="stats-header">
    <div></div><div>Toujours</div><div>`;
    let first = true;

    for (const month of orderedMonths) {
        if (first) {
            htmlStr += `<span class="player-stats-periodval " data-period="${month},always"> ${formatMonthNoYear(month)} </span>`
            first = false;
        } else {
            htmlStr += `<span class="player-stats-periodval hide" data-period="${month}"> ${formatMonthNoYear(month)} </span>`
        }
    }
    htmlStr += "</div></div>"; // Close the divs "stats-header" & the one containing all the spans
    return htmlStr;
}
// Only need to build once since it's universal
const statsHeader = buildStatsHeader();

function formatStatResult(key, value) {
    // console.log(key);
    if (key == "play_time")
        return formatSToHHMM(value)
    return Math.round(value);
}

function getStat(gameName, month, row) {
    // @ts-ignore
    const monthStat = pstats[month];
    if (monthStat == undefined)
        return "-";

    const monthGameStat = monthStat[gameName]
    if (monthGameStat == undefined)
        return "-";

    for (const stat of monthGameStat["stats"]) {
        if (stat["name"] == row) 
            return formatStatResult(row, stat["value"]);
    }

    return "-";
}

function buildStatsEntry(gameName, keyObj) {
    let key = keyObj["id"]

    let statEntryHtmlStr = `<div class="stats-entry">
    <div class="stats-name"> ${keyObj["displayName"]} </div>`;
    statEntryHtmlStr += `<div class="stats-value stats-value-daily"> ${getStat(gameName, "always", key)} </div>`;
    statEntryHtmlStr += `<div class="stats-value stats-value-monthly">`;
    
    let first = true;
    for (const month of orderedMonths) {
        if (first) {
            statEntryHtmlStr += `<span class="player-stats-periodval " data-period="${month},always"> ${getStat(gameName, month, key)} </span>`
            first = false;
        } else {
            statEntryHtmlStr += `<span class="player-stats-periodval hide" data-period="${month}"> ${getStat(gameName, month, key)} </span>`
        }
    }
    statEntryHtmlStr += "</div></div>"
    return statEntryHtmlStr;
}

function buildGame(gameName, gameDisplayName) {
    let gameHtmlStr = `<div class="col-md-4 col-sm-6">
    <div class="player-stats-game">
        <div class="name game-border-${gameName}"> ${gameDisplayName} </div>
        <div class="player-stats-info">`;
    
    gameHtmlStr += statsHeader;

    for (const key of statsKeys[gameName]) {
        gameHtmlStr += buildStatsEntry(gameName, key)
    } 

    gameHtmlStr += "</div></div></div>"

    return gameHtmlStr;
}

function buildAllGames() {
    let fullHtmlStr = "";
    // @ts-ignore
    for (const [game, meta] of Object.entries(pgames)) {
        if (meta["hasStats"] == false)
            continue;
        fullHtmlStr += buildGame(game, meta["name"]);
    }
    return fullHtmlStr;
}

// 2nd "row" element has all the stats
const row = document.getElementsByClassName("row")[2];

const startTime = Date.now();
row.innerHTML = buildAllGames();
console.log(`Done building page. Took ${(Date.now() - startTime) / 1000}s.`);
