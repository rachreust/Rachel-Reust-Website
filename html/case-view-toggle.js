document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#caseViewToggle");
  const summary = document.querySelector("#recruiterSummary");

  if (!toggle || !summary) {
    return;
  }

  const STORAGE_KEY = "caseStudyView";
  const buttons = Array.from(
    document.querySelectorAll(".caseViewBtn")
  );
  const csNav = document.querySelector(".csNav");
  const fullSections = Array.from(
    document.querySelectorAll(".caseStudy > .caseSection")
  );

  function applyView(view) {
    const isBrief = view === "brief";

    summary.hidden = !isBrief;
    fullSections.forEach((section) => {
      section.hidden = isBrief;
    });

    if (csNav) {
      csNav.hidden = isBrief;
    }

    buttons.forEach((button) => {
      const isActive = button.dataset.view === view;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;

      applyView(view);

      try {
        sessionStorage.setItem(STORAGE_KEY, view);
      } catch (error) {
        // Ignore storage failures (e.g. private browsing).
      }
    });
  });

  let initialView = "full";

  try {
    initialView = sessionStorage.getItem(STORAGE_KEY) || "full";
  } catch (error) {
    initialView = "full";
  }

  applyView(initialView);
});
