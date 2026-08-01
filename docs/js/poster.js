/**
 * ============================================================
 * poster.js
 * Poster interaction
 * ============================================================
 */

function initializePoster() {

    const poster = document.getElementById("poster-image");

    if (!poster) return;

    //----------------------------------------------------------
    // Hover Tilt
    //----------------------------------------------------------

    poster.addEventListener("mousemove", e => {

        const rect = poster.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rx =
            -(y - rect.height / 2) / 28;

        const ry =
            (x - rect.width / 2) / 28;

        poster.style.transform =

            `
            perspective(1200px)
            rotateX(${rx}deg)
            rotateY(${ry}deg)
            scale(1.03)
            `;

    });

    //----------------------------------------------------------
    // Reset
    //----------------------------------------------------------

    poster.addEventListener("mouseleave", () => {

        poster.style.transform =

            `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
            `;

    });

    //----------------------------------------------------------
    // Click → Lightbox
    //----------------------------------------------------------

    poster.addEventListener("click", () => {

        openLightbox(poster.src);

    });

}

/* ============================================================
 * Simple Lightbox
 * ============================================================
 */

function openLightbox(src) {

    const overlay = document.createElement("div");

    overlay.className = "poster-lightbox";

    overlay.innerHTML =

`
<div class="poster-lightbox-overlay">

    <img
        src="${src}"
        class="poster-lightbox-image">

    <button
        class="poster-lightbox-close">

        <i class="bi bi-x-lg"></i>

    </button>

</div>
`;

    document.body.appendChild(overlay);

    //----------------------------------------------------------
    // Fade In
    //----------------------------------------------------------

    requestAnimationFrame(() => {

        overlay.classList.add("show");

    });

    //----------------------------------------------------------
    // Close Button
    //----------------------------------------------------------

    overlay
        .querySelector(".poster-lightbox-close")
        .onclick = () => closeLightbox(overlay);

    //----------------------------------------------------------
    // Click Background
    //----------------------------------------------------------

    overlay.onclick = e => {

        if (e.target === overlay) {

            closeLightbox(overlay);

        }

    };

    //----------------------------------------------------------
    // ESC
    //----------------------------------------------------------

    const escHandler = e => {

        if (e.key === "Escape") {

            closeLightbox(overlay);

            document.removeEventListener(
                "keydown",
                escHandler
            );

        }

    };

    document.addEventListener(
        "keydown",
        escHandler
    );

}

function closeLightbox(node) {

    node.classList.remove("show");

    setTimeout(() => {

        node.remove();

    }, 200);

}