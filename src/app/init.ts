import { renderRoute } from "./router";

export const initApp = () => {
  window.addEventListener("popstate", () => {
    renderRoute(window.location.pathname);
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const link = target.closest("a[data-link]");
    if (!link) return;

    // Type guard to ensure link is an HTMLAnchorElement
    if (!(link instanceof HTMLAnchorElement)) return;

    e.preventDefault();
    history.pushState(null, "", link.href);
    renderRoute(window.location.pathname);
  });

  renderRoute(window.location.pathname);
};
