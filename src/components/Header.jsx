import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { useLumen } from "../state";
import { path } from "../utils";
import { Fragment, useState } from "react";
export function Header({ inside = false }) {
  const { data, name } = useLumen();
  const current = path();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const items = inside
    ? [
        ["/dashboard", "Dashboard"],
        ["/nova-denuncia", "Nova Denúncia"],
        ["/minhas-denuncias", "Denúncias"],
        ["/estatisticas", "Estatísticas"],
      ]
    : [
        ["/home", "Início"],
        ["/sobre", "Como Funciona"],
        ["/estatisticas", "Estatísticas"],
      ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo dest={inside ? "/dashboard" : "/home"} />
        {"\n    "}
        <nav className="desktop-nav" aria-label="Navegação principal">
          {items.map(([url, label], itemIndex) => (
            <Fragment key={itemIndex}>
              <Link
                url={url}
                label={label}
                cls={current === url ? "nav-active" : ""}
              />
            </Fragment>
          ))}
        </nav>
        {"\n    "}
        <div className="header-actions">
          {inside ? (
            <>
              <Link
                url={"/notificacoes"}
                label={
                  <>
                    {"🔔"}
                    {data.notifications.filter(
                      (n) => n.userId === data.currentUser?.email && !n.read,
                    ).length ? (
                      <span className="notice-count">
                        {
                          data.notifications.filter(
                            (n) =>
                              n.userId === data.currentUser?.email && !n.read,
                          ).length
                        }
                      </span>
                    ) : (
                      ""
                    )}
                  </>
                }
                cls={"bell-link"}
              />
              {"\n         "}
              <button
                className="account-button"
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                aria-controls="account-menu"
              >
                <span className="avatar">{name()[0] || "U"}</span>
                <span>{data.currentUser?.name || "Usuário"}</span>
                <span>{"⌄"}</span>
              </button>
            </>
          ) : (
            <>
              <Link url={"/login"} label={"Entrar"} cls={"header-login"} />
              <ButtonLink
                url={"/cadastro"}
                label={"Criar Conta"}
                cls={"btn-primary btn-small"}
              />
            </>
          )}
          {"\n      "}
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
          >
            {"☰"}
          </button>
          {"\n    "}
        </div>
      </div>
      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        id="mobile-menu"
      >
        {items.map(([url, label], itemIndex) => (
          <Fragment key={itemIndex}>
            <Link url={url} label={label} />
          </Fragment>
        ))}
        {inside ? (
          <Link url={"/configuracoes"} label={"Configurações"} />
        ) : (
          <Link url={"/login"} label={"Entrar"} />
        )}
      </div>
      <div
        className={`account-menu${accountOpen ? " open" : ""}`}
        id="account-menu"
      >
        <Link url={"/configuracoes"} label={"⚙️ Configurações"} />
        <Link url={"/home"} label={"↗ Página inicial"} />
        <button type="button" data-action="logout">
          {"Sair da conta"}
        </button>
      </div>
    </header>
  );
}
