// @ts-check
/* 
Made by Nixuge, september 1st/2nd 2023.
Not meant to be the highest code quality, just to work.

This is meant to move the cpu load away from the server to the client,
to have a server as lightweight as possible.
*/

function formatSToHHMM(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    return `${hours}h ${minutes}m`
}

function formatSpaceThousands(count) {
    return String(count).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

}

function formatStatResult(key, value) {
    if (key == "play_time")
        return formatSToHHMM(value)

    // Avoid NaNs if value isn't found in dict
    if (value == null)
        return 0;

    return formatSpaceThousands(Math.round(value));
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
    const month = monthsTable[data[1]-1];
    return `${month} ${year}`;
}
// Used in the stats month viewer
// (same as original but suboptimal? may be replaced by above)
function formatMonthNoYear(month_raw) {
    let new_month = month_raw.replace("month-", "");
    const data = new_month.split("-");
    return monthsTable[data[1]-1];
}