import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
import { useLumen } from "../state";
export function NotificationsPage() {
  const { data } = useLumen();
  const notices = data.notifications.filter(
    (n) => n.userId === data.currentUser?.email,
  );
  return (
    <>
      <Header inside={true} />
      <main className="dashboard-page">
        <div className="container">
          <div className="page-heading">
            <h1>{"Notificações"}</h1>
            <ButtonLink
              url={"/configuracoes"}
              label={"⚙️ Preferências"}
              cls={"btn-outline btn-small"}
            />
          </div>
          {notices.length ? (
            <div className="panel">
              {notices.map((n, itemIndex) => (
                <article className="report-row" key={itemIndex}>
                  <div className="report-symbol">{"🔔"}</div>
                  <div className="report-content">
                    <strong>{n.title}</strong>
                    <span>{n.body}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>{"🔔"}</div>
              <h3>{"Nenhuma notificação"}</h3>
              <p>
                {
                  "As notificações aparecerão aqui quando alguém comentar ou apoiar suas denúncias."
                }
              </p>
              <ButtonLink
                url={"/nova-denuncia"}
                label={"Fazer uma denúncia →"}
                cls={"btn-primary"}
              />
            </div>
          )}
          <div className="center-back">
            <Link
              url={"/dashboard"}
              label={"← Voltar ao Dashboard"}
              cls={"back-link"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
