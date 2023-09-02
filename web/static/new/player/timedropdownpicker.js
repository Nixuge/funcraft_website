// @ts-check
/* 
Made by Nixuge, september 1st 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/
let fullDirtyHtml = `<li><a href="javascript:;" data-value="always">Toujours</a></li>`;

let currentYear = ""
for (const month of orderedMonths) {
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