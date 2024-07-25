function makeApplyContentSummarySpan() {
    const htmlElement = document.getElementsByClassName("contentSummary")[0];
    if (threadsCount == 0) {
        // Note: on the main website this isn't the element used, but it's almost the same result so meh.
        const parentElement = htmlElement.parentElement;
        parentElement.style.borderBottom = "none";
        parentElement.style.backgroundColor = "transparent";
        htmlElement.textContent = "Il n'y a aucune discussion à afficher.";
        return;
    }

    const min = ((currentPage-1)*20)+1
    const max = Math.min((currentPage*20), threadsCount)
    
    htmlElement.textContent = `Afficher les discussions de ${min} à ${max} sur ${threadsCount.toLocaleString("fr")}`
}


function makeApplyPagesDiv() {
    if (threadsCount == 0)
        return;

    // Kinda untested function.
    let finalHtml = `<span class="pageNavHeader">Page ${currentPage} sur ${maxPage}</span>`;

    finalHtml += "<nav>"
    if (currentPage > 1)
        finalHtml += `<a href="${baseUrl}/page-${currentPage-1}" class="text">&lt; Préc</a>`;

    let startPagesDiv = Math.max(2, currentPage-2);
    let endPagesDiv = Math.min(maxPage-1, currentPage+2);
    if (startPagesDiv == 2)
        endPagesDiv = Math.min(maxPage, 6)
    if (endPagesDiv == maxPage-1)
        startPagesDiv = Math.max(1, maxPage-6)

    finalHtml += maxPage > 7 ? makePagesDivComplicated(startPagesDiv, endPagesDiv) : makePagesDivSimple();

    if (currentPage < maxPage)
        finalHtml += `<a href="${baseUrl}/page-${currentPage+1}" class="text">Suivant &gt;</a>`
    finalHtml += "</nav>"

    for (const htmlElement of document.getElementsByClassName("PageNav")) {
        htmlElement.innerHTML = finalHtml

        htmlElement.dataset.page = `${currentPage}`
        htmlElement.dataset.range = "2"
        htmlElement.dataset.start = `${startPagesDiv}`
        htmlElement.dataset.end = `${endPagesDiv}`
        htmlElement.dataset.last = `${maxPage}`
        htmlElement.dataset.sentinel = "{{sentinel}}"
        htmlElement.dataset.baseurl = `${baseUrl}/page-{{sentinel}}`
    }
}

function makePagesDivSimple() {
    let navHtml = '';
    console.log("maxPage: " + maxPage);
    for (let i = 1; i <= maxPage; i++) {
        navHtml += `<a href="${baseUrl}/page-${i}" ${currentPage == i ? 'class="currentPage"' : ''} ${i == 1 ? 'rel="start"' : ''}>${i}</a>`;
    }
    return navHtml;
}
function makePagesDivComplicated(startPagesDiv, endPagesDiv) {
    // The "PageNavPrev/PageNavNext are a big wonky but it works ig.
    // eg last page on discussion
    let navHtml = `<a href="${baseUrl}/page-1" ${currentPage == 1 ? 'class="currentPage"' : ''} rel="start">1</a>`;
    navHtml += `<a class="PageNavPrev ${currentPage < 6 ? 'hidden' : ''}" style="">←</a>`

    navHtml += `<span class="scrollable"><span class="items" style="left: 0px;">`;
    for (let i = startPagesDiv; i <= endPagesDiv; i++) {
        navHtml += `<a href="${baseUrl}/page-${i}" ${currentPage == i ? 'class="currentPage' : ''}">${i}</a>`;
    }
    navHtml += `</span></span>`

    navHtml += `<a class="PageNavNext ${(maxPage - currentPage) < 4 ? 'hidden' : ''}" style="">→</a>`
    navHtml += `<a href="${baseUrl}/page-${maxPage}" ${currentPage == maxPage ? 'class="currentPage"' : ''}>${maxPage}</a>`;
    return navHtml;
}


makeApplyContentSummarySpan();
makeApplyPagesDiv();