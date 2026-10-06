(() => {
  const intro = document.getElementById("envelopeIntro");
  const openButton = document.getElementById("openInvitation");
  const storageKey = "anastasiaBirthdayInvitationOpened";
  const body = document.body;

  let openedInThisTab = false;
  try {
    openedInThisTab = sessionStorage.getItem(storageKey) === "yes";
  } catch {
    // If storage is unavailable, the envelope still works for this page load.
  }

  const showInvitation = () => {
    body.classList.remove("is-intro-visible", "is-opening");
    body.classList.add("is-open");
    intro.setAttribute("aria-hidden", "true");
    openButton.disabled = true;
  };

  if (openedInThisTab) {
    showInvitation();
    return;
  }

  const revealImmediately = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  openButton.addEventListener("click", () => {
    if (body.classList.contains("is-opening")) return;

    body.classList.add("is-opening");
    openButton.setAttribute("aria-label", "Приглашение открывается");

    try {
      sessionStorage.setItem(storageKey, "yes");
    } catch {
      // The animation remains available when browser storage is blocked.
    }

    if (revealImmediately) {
      showInvitation();
      return;
    }

    window.setTimeout(() => body.classList.add("is-paper-emerging"), 800);
    window.setTimeout(() => body.classList.add("is-spreading"), 2050);
    window.setTimeout(showInvitation, 3150);
  });
})();
