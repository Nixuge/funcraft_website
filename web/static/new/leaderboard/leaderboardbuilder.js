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
    for (const stat of leaderboardKeys[gameName]) {
        if (stat["hidden"] == true)
            continue;
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

    playerHtmlStr += `<td>${ranking}</td>`;
    playerHtmlStr += `<td> <a href="/joueur/${data["name"]}"> ${data["name"]} </a> </td>`;
    for (const stat of leaderboardKeys[gameName]) {
        if (stat["hidden"] == true)
            continue;

        const key = stat["id"];
        let value = formatStatResult(key, rankings[ranking]["stats"][key])
        playerHtmlStr += `<td class="value">${value}</td>`
                        
    }

    playerHtmlStr += "</tr>"
    return playerHtmlStr;
}

function buildFullLeaderboard() {
    let leaderboardHtmlStr = buildHeader();
    leaderboardHtmlStr += "<tbody>";
    
    for (const [ranking, data] of Object.entries(rankings)) {
        leaderboardHtmlStr += buildPlayer(ranking, data);
    }
    leaderboardHtmlStr += "</tbody>";
    return leaderboardHtmlStr;
}

const leaderboard = document.getElementsByClassName("leaderboard-table")[0];
leaderboard.innerHTML = buildFullLeaderboard()
