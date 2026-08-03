document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#imageModal");
  const modalImage = document.querySelector("#imageModalContent");
  const closeButton = document.querySelector(".imageModalClose");
  const zoomTargets = document.querySelectorAll(".imageZoom");

  if (!modal || !modalImage || !closeButton || !zoomTargets.length) {
    return;
  }

  const ZOOM_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M8 3H5a2 2 0 0 0-2 2v3" />' +
    '<path d="M21 8V5a2 2 0 0 0-2-2h-3" />' +
    '<path d="M3 16v3a2 2 0 0 0 2 2h3" />' +
    '<path d="M16 21h3a2 2 0 0 0 2-2v-3" />' +
    "</svg>";

  let lastTrigger = null;

  const openModal = (image, trigger) => {
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    lastTrigger = trigger;
    modal.showModal();
  };

  zoomTargets.forEach((target) => {
    const image = target.querySelector("img");

    if (!image) {
      return;
    }

    const btn = document.createElement("span");
    btn.className = "imageZoomBtn";
    btn.setAttribute("aria-hidden", "true");
    btn.innerHTML = ZOOM_ICON;
    target.appendChild(btn);

    target.setAttribute("role", "button");
    target.setAttribute("tabindex", "0");
    target.setAttribute(
      "aria-label",
      `Expand image${image.alt ? `: ${image.alt}` : ""}`
    );

    target.addEventListener("click", () => openModal(image, target));

    target.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(image, target);
      }
    });
  });

  closeButton.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("close", () => {
    modalImage.src = "";
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });
});
