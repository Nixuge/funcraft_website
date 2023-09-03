function buildNavbar() {
    fullHtmlStr = `<li> <a href="/fr/classement/${gameName}/always"> Toujours </a> </li>`;

    for (const month of availableMonths.reverse()) {
        if (month === "always")
            continue;

        fullHtmlStr += `<li> <a href="/fr/classement/${gameName}/${month}"> ${formatMonth(month)} </a> </li>`;
    }

    return fullHtmlStr;
}

const leaderboardNavbar = document.getElementsByClassName("nav-tabs-top")[0];
leaderboardNavbar.innerHTML = buildNavbar();
