// @ts-check
/* 
Made by Nixuge, september 2nd 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
function buildHeader() {
    let headerHtmlStr = `<thead>
    <tr>
    <th>#</th>
    <th>Joueur</th>`;
    // @ts-ignore
    for (const stat of statsKeys[gameName]) {
        headerHtmlStr += `<th>${stat["displayName"]}</th>`;
    }
    headerHtmlStr += `
    </tr>
    </thead>`;

    return headerHtmlStr;
}

function buildPlayer(ranking, data) {
    let playerHtmlStr = (ranking > 3) ? 
        "<tr>" : `<tr class="podium-${ranking}-bg">`;
    // <tr class="podium-1-bg">
    //     <td>1</td>
    //     <td> <a href="/fr/joueur/430195/Bouhero"> Bouhero </a> </td>
    //     <td class="value">4 181 122</td>
    //     <td class="value">47 946</td>
    //     <td class="value">47 015</td>
    //     <td class="value">931</td>
    //     <td class="value">1916h 26m</td>
    //     <td class="value">637 122</td>
    //     <td class="value">309 470</td>
    // </tr>
}

function buildFullLeaderboard() {
    let leaderboardHtmlStr = "<tbody>";
    // @ts-ignore
    for (const [ranking, data] of Object.entries(rankings)) {
        leaderboardHtmlStr += buildPlayer(ranking, data);
    }
    leaderboardHtmlStr += "</tbody>";
    return leaderboardHtmlStr;
}

const leaderboard = document.getElementsByClassName("leaderboard-table")[0];
// leaderboard.innerHTML = buildFullLeaderboard()

{/* <thead>
<tr>
    <th>#</th>
    <th>Joueur</th>
    <th>Points</th>
    <th>Parties</th>
    <th>Victoires</th>
    <th>D&eacute;faites</th>
    <th>Temps de jeu</th>
    <th>Kills</th>
    <th>Morts</th>
</tr>
</thead> */}