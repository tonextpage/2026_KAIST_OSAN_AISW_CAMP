/**
 * ============================================================
 * 2026 KAIST × OSAN AI·SW CAMP
 * Main Page
 * ============================================================
 */

const DATA_FILE = "data/teams.json";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const response = await fetch(DATA_FILE);

        if (!response.ok)
            throw new Error("Cannot load teams.json");

        const teams = await response.json();

        renderTeams(teams);

    } catch (err) {

        console.error(err);

        document.getElementById("team-grid").innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger">
                프로젝트 정보를 불러오지 못했습니다.
            </div>
        </div>
        `;
    }
}

/* ============================================================
 * Card Rendering
 * ============================================================
 */

function renderTeams(teams) {

    const grid = document.getElementById("team-grid");

    grid.innerHTML = "";

    teams
        .sort((a, b) => a.id - b.id)
        .forEach((team, index) => {

            const card = createTeamCard(team);

            card.style.animationDelay = `${index * 0.08}s`;

            grid.appendChild(card);

        });

}

/* ============================================================
 * One Card
 * ============================================================
 */

function createTeamCard(team) {

    const col = document.createElement("div");

    col.className = "col fade-up";

    //--------------------------------------------
    // Preview Image
    //--------------------------------------------

    const preview = team.preview ?? team.poster;

    //--------------------------------------------
    // Poster Type
    //--------------------------------------------

    const ext = extension(team.poster);

    const posterBadge = ext === "pdf"
        ? `
        <span class="project-badge pdf">
            <i class="bi bi-file-earmark-pdf"></i>
            PDF Poster
        </span>
        `
        : `
        <span class="project-badge image">
            <i class="bi bi-image"></i>
            Image Poster
        </span>
        `;

    //--------------------------------------------
    // Status
    //--------------------------------------------

    let status;

    if (team.project) {

        status = `
        <span class="status available">
            ● Interactive
        </span>
        `;

    } else {

        status = `
        <span class="status unavailable">
            ● Poster Only
        </span>
        `;

    }

    //--------------------------------------------
    // Card
    //--------------------------------------------

    col.innerHTML = `
<div class="team-card"
     data-team="${team.id}">

    <div class="team-thumbnail">

        <img
            src="${preview}"
            alt="${team.team}">

        <div class="team-overlay">

            <span>

                View Showcase
                <i class="bi bi-arrow-right"></i>

            </span>

        </div>

    </div>

    <div class="team-body">

        <div class="team-name">

            ${team.team}

        </div>

        <div class="team-title">

            ${team.title}

        </div>

        <div class="team-subtitle">

            ${team.subtitle}

        </div>

        <div class="team-footer">

            ${posterBadge}

            ${status}

        </div>

    </div>

</div>
`;

    col.querySelector(".team-card")
        .addEventListener("click", () => {

            location.href = `team.html?id=${team.id}`;

        });

    return col;

}

/* ============================================================
 * Utility
 * ============================================================
 */

function extension(path) {

    return path
        .split(".")
        .pop()
        .toLowerCase();

}