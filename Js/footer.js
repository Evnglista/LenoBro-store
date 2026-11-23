(() => {
    const trigger = document.querySelector(".footer-members-toggle");
    if (!trigger) return;

    const overlay = document.createElement("div");
    overlay.className = "members-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
        <section id="members-dialog" class="members-dialog" role="dialog" aria-modal="true" aria-labelledby="members-title" tabindex="-1">
            <header class="members-dialog-header">
                <div>
                    <p class="members-dialog-eyebrow">Course information</p>
                    <h2 id="members-title">Members &amp; Block Information</h2>
                </div>
                <button class="members-close" type="button" aria-label="Close members information">×</button>
            </header>
            <div class="members-course">
                <div class="members-course-card"><span>Course</span><strong>BSIT 102</strong></div>
                <div class="members-course-card"><span>Group</span><strong>Group 1</strong></div>
            </div>
            <h3 class="members-list-title">Group Members</h3>
            <ol class="members-list">
                <li>Jade L. Evangelista</li>
                <li>Emmanuel Abesamis</li>
                <li>Polaris Maximillian Mibalo</li>
                <li>Yhuan Justine Villegas</li>
            </ol>
        </section>
    `;
    document.body.append(overlay);

    const dialog = overlay.querySelector(".members-dialog");
    const closeButton = overlay.querySelector(".members-close");
    let closeTimer;

    const closeMembers = () => {
        if (overlay.hidden) return;
        overlay.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        document.documentElement.classList.remove("members-open");
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
            overlay.hidden = true;
            trigger.focus();
        }, 180);
    };

    trigger.addEventListener("click", () => {
        window.clearTimeout(closeTimer);
        overlay.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        document.documentElement.classList.add("members-open");
        window.requestAnimationFrame(() => {
            overlay.classList.add("is-open");
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeMembers);
    overlay.addEventListener("click", event => {
        if (event.target === overlay) closeMembers();
    });

    overlay.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            event.preventDefault();
            closeMembers();
            return;
        }

        if (event.key !== "Tab") return;
        const focusable = [...dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
})();
