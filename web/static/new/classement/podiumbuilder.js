// @ts-check
/* 
Made by Nixuge, september 2nd 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
let podiumHtmlStr = "";

for (const ranking of [1, 2, 3]) {
    // @ts-ignore
    const joueur = rankings[ranking];
    podiumHtmlStr += `<div class="podium podium-${ranking}">
    <div class="step"> ${ranking}`

    if (ranking == 1) {
        // @ts-ignore
        podiumHtmlStr += ` <div class="trophy game-text-${gameName}"> <i class="fa fa-trophy tooltips"
        title="Trophée HikaBrain"></i> </div>`
    }
    
    podiumHtmlStr += `<div class="head"> <a href="/joueur/${joueur["name"]}">
                <div class="name">${joueur["name"]}</div> <img
                    src="/_u/avatar/head/username/${joueur["name"]}.png">
            </a> </div>
    </div>
    </div>`
}

const podium = document.getElementsByClassName("leaderboard-podium")[0]
podium.innerHTML = podiumHtmlStr;
