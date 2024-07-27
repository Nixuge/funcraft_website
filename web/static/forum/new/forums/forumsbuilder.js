/**
 * @interface
 * @typedef {Object} Thread
 * @property {number} threadId
 * @property {number} pages
 * @property {string} prefix
 * @property {string} title
 * @property {number} responses
 * @property {number} views
 * @property {string} authorName
 * @property {number} authorId
 * @property {string} creationDate
 * @property {boolean} sticky
 * @property {string} url
 */


/**
 * @param {any[]} array 
 * @returns {Thread}
 */
function arrayToThreadObject(array) {
    return {
        threadId: array[0],
        pages: array[1],
        prefix: array[2],
        title: array[3],
        responses: array[4],
        views: array[5],
        authorName: array[6],
        authorId: array[7],
        creationDate: array[8],
        sticky: array[9],
        url: array[10],
    }
}

function doAll() {
    // Assuming there's always 1 (which is the case since we control the html).
    const htmlElement = document.getElementsByClassName("discussionListItems")[0];

    if (currentPage == 1 && stickyThreads.length > 0) {
        htmlElement.innerHTML += `<div class="uix_stickyThreadWrapper node ">
        <li class="heading sticky">
			<span class="headingText">Discussions importantes</span>
        </li>
        <div class="uix_stickyThreads" style="display: block;">
        `
        for (const threadArr of stickyThreads) {
            const thread = arrayToThreadObject(threadArr);
            htmlElement.innerHTML += makeThread(thread);
        }
        htmlElement.innerHTML += "</div></div>"
    }

    if (pageThreads.length > 0) {
        htmlElement.innerHTML += `<li class="heading">Discussions normales</li>`;
    
        for (const threadArr of pageThreads) {
            const thread = arrayToThreadObject(threadArr);
            htmlElement.innerHTML += makeThread(thread);
        }
    }
}

doAll();

/**
 * @param {Thread} thread 
 */
function makeThread(thread) {
    // TODO:
    // data-author="${thread.authorName}" = should be properly capitalized name.
    // <img src="/_u/avatar/head/username/${thread.authorName}.png" width="48" height="48" alt="${thread.authorName}" /> = should be properly capitalized name 2x (altho not rly a problem here).
    // title="Auteur de la discussion">${thread.authorName}</a> = should be properly capitalized name
    // prefixXXX & previx_id=XXX to change to actual prefix IDs
    return `
    <li id="thread-${thread.threadId}" class="discussionListItem visible locked${thread.sticky ? ' sticky' : ''}${thread.prefix ? ' prefixXXX' : ''} data-author="${thread.authorName}">
    <div class="listBlock posterAvatar">
        <span class="avatarContainer">
        <a href="/forum/members/${thread.authorName}.${thread.authorId}/" class="avatar Av${thread.authorId}s" ndata-avatarhtml="true">
            <img src="/_u/avatar/head/username/${thread.authorName}.png" width="48" height="48" alt="${thread.authorName}" />
        </a>
        </span>
    </div>
    <div class="listBlock main">
        <div class="titleText">
            <div class="iconKey">
                <span class="locked" title="Fermé">Fermé</span>
                ${thread.sticky ? '<span class="sticky" title="Importante">Importante</span>': ''}
            </div>
            <h3 class="title">
            ${thread.prefix ? `<a href="?prefix_id=XXX" a="TODO: fix prefix id here (wayback machine?) & fix this kinda (get current route? see original)"
                    class="prefixLink"
                    title="Afficher seulement les discussions ayant comme préfixe '${thread.prefix}'.">
                    <span class="prefix" a="TODO: fix prefix color here (wayback machine?)">${thread.prefix}</span>
                </a>` : ''}
                <a href="/forum/${thread.url}"
                    title="" class="PreviewTooltip"
                    data-previewurl="/forum/${thread.url}preview">
                    ${thread.title}
                </a>
            </h3>
            <div class="secondRow">
                <div class="posterDate muted">
                    <a href="/forum/members/${thread.authorName}.${thread.authorId}/" class="username" dir="auto" title="Auteur de la discussion">${thread.authorName}</a>
                    <span class="startDate">,<a class="faint"><span class="DateTime" title="">${thread.creationDate}</span></a></span>
                </div>
                <div class="controls faint">
                </div>
            </div>
        </div>
    </div>
    <div class="listBlock stats pairsJustified" title="Membres qui ont aimé le premier message: 2" a = "Not sure where this 2 is here as it's never used in the ui?">
        <dl class="major">
            <dt>Réponses:</dt>
            <dd>${thread.responses}</dd>
        </dl>
        <dl class="minor">
            <dt>Affichages:</dt>
            <dd>${thread.views.toLocaleString("fr")}</dd>
        </dl>
    </div>
    <div class="listBlock lastPost">
        Inconnu.
    </div>
    <div class="listBlock lastPost" style="display: none;">
        TODO: grab this. For now leaving data from a random thread from the wayback machine.
        <dl class="lastPostInfo">
            <a href="/forum/members/joriis.10299/" class="avatar Av10299s" data-avatarhtml="true">
                <img src="/_u/avatar/head/username/Joriis.png" width="48" height="48" alt="Joriis" />
            </a>
            <dt>
                <a href="/forum/members/acenox.10299/" class="username" dir="auto">Acenox</a>
            </dt>
            <dd class="muted">
                <a class="dateTime"><span class="DateTime" title="11 Janvier 2022, à 18:47">11 Janvier 2022</span></a>
            </dd>
        </dl>
    </div>
 </li>
 `
}