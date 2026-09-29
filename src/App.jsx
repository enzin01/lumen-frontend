import { useEffect, useState } from "react";
import { useLumen } from "./state";
import { createActions } from "./actions";
import { path } from "./utils";
import { updateTitle } from "./titles";
import {
  Home,
  Login,
  Signup,
  Anonymous,
  Dashboard,
  NewReport,
  ReportsPage,
  StatsPage,
  NotificationsPage,
  About,
  ForgotPage,
  ConfigPage,
  SimplePage,
  SuccessPage,
} from "./pages/index.js";

const routes = {
  "/home": Home,
  "/": Home,
  "/login": Login,
  "/cadastro": Signup,
  "/denuncia-anonima": Anonymous,
  "/dashboard": Dashboard,
  "/nova-denuncia": NewReport,
  "/minhas-denuncias": ReportsPage,
  "/estatisticas": StatsPage,
  "/notificacoes": NotificationsPage,
  "/sobre": About,
  "/esqueci-senha": ForgotPage,
  "/configuracoes": ConfigPage,
  "/termos-de-uso": SimplePage,
  "/politica-de-privacidade": SimplePage,
  "/denuncia-enviada": SuccessPage,
};

export default function App() {
  const { data, registration, reportDraft, listScope, listFilter, setModel } =
    useLumen();
  const [route, setRoute] = useState(path);
  const [toast, setToast] = useState(null);
  const showToast = (message) => setToast({ message });

  useEffect(() => {
    const navigate = () => {
      setRoute(path());
      const category = new URLSearchParams(
        location.hash.split("?")[1] || "",
      ).get("categoria");
      if (path() === "/nova-denuncia" && category) {
        setModel((previous) => ({
          ...previous,
          reportDraft: { ...previous.reportDraft, category },
        }));
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", navigate);
    if (!location.hash) location.replace("#/home");
    return () => window.removeEventListener("hashchange", navigate);
  }, [setModel]);

  useEffect(() => {
    updateTitle(route);
  }, [route]);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(timeout);
  }, [toast]);

  const handle = (type) => async (event) => {
    try {
      const actions = createActions(
        { data, registration, reportDraft, listScope, listFilter },
        setModel,
        showToast,
      );
      await actions[type](event);
    } catch {
      showToast(
        "Não foi possível concluir a ação. Verifique o armazenamento do navegador e tente novamente.",
      );
    }
  };
  const Page = routes[route] || Home;
  return (
    <>
      <div
        onClick={handle("onClick")}
        onChange={handle("onChange")}
        onSubmit={handle("onSubmit")}
      >
        <Page
          key={route}
          type={route === "/politica-de-privacidade" ? "privacy" : "terms"}
        />
      </div>
      <div
        id="toast"
        className={`toast${toast ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast?.message}
      </div>
    </>
  );
}
