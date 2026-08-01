/**
 * ============================================================
 * team.js
 * ============================================================
 */

const DATA_FILE = "data/teams.json";

document.addEventListener("DOMContentLoaded", init);

async function init() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) {

        showError("잘못된 접근입니다.");

        return;

    }

    try {

        const response = await fetch(DATA_FILE);

        if (!response.ok)
            throw new Error("teams.json");

        const teams = await response.json();

        const team = teams.find(t => t.id === id);

        if (!team) {

            showError("존재하지 않는 팀입니다.");

            return;

        }

        render(team);

    }

    catch (e) {

        console.error(e);

        showError("프로젝트 정보를 불러올 수 없습니다.");

    }

}

/* ============================================================
 * Render
 * ============================================================
 */

function render(team){

    document.title =
        `${team.team} | ${team.title}`;

    renderHeader(team);

    renderPoster(team);

    renderProject(team);

    renderMembers(team);

}

/* ============================================================
 * Header
 * ============================================================
 */

function renderHeader(team){

    const container =
        document.getElementById("team-header");

    let githubButton = "";

    if(team.github){

        githubButton =

        `
        <a
            href="${team.github}"
            target="_blank"
            class="btn btn-github">

            <i class="bi bi-github"></i>

            GitHub

        </a>
        `;

    }

    container.innerHTML =

`
<h1 class="team-title">

${team.team}

</h1>

<h3 class="team-subtitle">

${team.title}

</h3>

<p class="team-description">

${team.description}

</p>

<div class="team-actions">

${githubButton}

</div>

`;

}

/* ============================================================
 * Poster
 * ============================================================
 */

function renderPoster(team){

    const container =
        document.getElementById("poster-container");

    const ext =
        getExtension(team.poster);

    if(ext==="pdf"){

        container.innerHTML =

`
<div class="poster-frame">

<iframe

class="poster-pdf"

src="${team.poster}">

</iframe>

</div>
`;

    }

    else{

        container.innerHTML =

`
<div class="poster-frame">

<img

src="${team.poster}"

class="poster-image"

alt="${team.title}"

id="poster-image">

</div>
`;

        if(window.initializePoster){

            initializePoster();

        }

    }

}

/* ============================================================
 * Project
 * ============================================================
 */

function renderProject(team){

    const container =
        document.getElementById("project-container");

    if(!team.project){

        container.innerHTML =

`
<div class="project-empty">

<i class="bi bi-hourglass-split"></i>

<h3>

Poster Only

</h3>

<p>

아직 체험 가능한 결과물이 등록되지 않았습니다.

</p>

</div>

`;

        return;

    }

    container.innerHTML =

`
<iframe

class="project-frame"

src="${team.project}"

loading="lazy">

</iframe>

`;

}

/* ============================================================
 * Members
 * ============================================================
 */

function renderMembers(team){

    const container =
        document.getElementById("member-container");

    if(team.members.length===0){

        container.innerHTML =
        "<p>등록된 팀원이 없습니다.</p>";

        return;

    }

    container.innerHTML =

        team.members

        .map(member=>`

<div class="member-chip">

<i class="bi bi-person-fill"></i>

${member}

</div>

`)

        .join("");

}

/* ============================================================
 * Utility
 * ============================================================
 */

function getExtension(path){

    return path

        .split(".")

        .pop()

        .toLowerCase();

}

function showError(message){

    document.querySelector("main").innerHTML =

`
<div class="alert alert-danger mt-5">

${message}

</div>

`;

}