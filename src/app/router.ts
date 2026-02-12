import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";


type PageComponent = () => string;

const routes: Record<string, PageComponent> = {
  "/": HomePage,
}

export const renderRoute = (path: string) => {
  const page = routes[path] ?? NotFoundPage;
  document.querySelector("#app")!.innerHTML = page();
}