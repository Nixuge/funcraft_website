// @ts-check
/* 
Made by Nixuge, september 1st 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
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

function formatMonth(month_raw) {
    let new_month = month_raw.replace("month-", "");
    const data = new_month.split("-");
    const year = data[0];
    const month = monthsTable[data[1]-1]
    return `${month} ${year}`
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

let fullDirtyHtml = `<li><a href="javascript:;" data-value="always">Toujours</a></li>`;

let currentYear = ""
for (const month of getMonthListOrdered()) {
    const thisYear = month.split("-")[1];
    if (thisYear !== currentYear) {
        currentYear = thisYear;
        fullDirtyHtml += `<li role="separator" class="divider"></li>`
    }
    fullDirtyHtml += `<li><a href="javascript:;" data-value="${month}">${formatMonth(month)}</a> </li>`
}

const dropdown = document.getElementById("player-stats-period-values");
// @ts-ignore
dropdown.innerHTML = fullDirtyHtml;