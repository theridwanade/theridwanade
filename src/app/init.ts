import { renderRoute } from "./router";

export const initApp = () =>  {
  window.addEventListener("popstate", () => {
    renderRoute(window.location.pathname);
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.href);
    renderRoute(window.location.pathname);
  });

  renderRoute(window.location.pathname);
}
