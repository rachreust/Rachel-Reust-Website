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

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function applyView(view, animate) {
    const isBrief = view === "brief";
    const toShow = isBrief ? [summary] : [...fullSections, ...(csNav ? [csNav] : [])];
    const toHide = isBrief ? [...fullSections, ...(csNav ? [csNav] : [])] : [summary];

    toHide.forEach((el) => {
      el.hidden = true;
      el.classList.remove("csView-fade-enter");
    });

    toShow.forEach((el) => {
      el.hidden = false;
      if (animate && !prefersReducedMotion) {
        el.classList.add("csView-fade-enter");
      }
    });

    if (animate && !prefersReducedMotion) {
      // Force reflow so the browser registers the entering state before
      // it's removed, otherwise the transition is skipped.
      void toShow[0].offsetHeight;

      requestAnimationFrame(() => {
        toShow.forEach((el) => el.classList.remove("csView-fade-enter"));
      });
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

      applyView(view, true);

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

  applyView(initialView, false);
});
