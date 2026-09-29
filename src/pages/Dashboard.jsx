import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { RecentItems } from "../components/RecentItems.jsx";
import { useLumen } from "../state";
import { Fragment } from "react";
export function Dashboard() {
  const { data, name, myReports, counts } = useLumen();
  const c = counts(),
    m = counts(myReports());
  return (
    <>
      <Header inside={true} />
      <main className="dashboard-page">
        <div className="container">
          <div className="page-heading">
            <div>
              <h1>
                {"Bom dia, "}
                {name()}
                {"! 👋"}
              </h1>
              <p>{"Aqui está um resumo das atividades da plataforma LUMEN."}</p>
            </div>
          </div>
          <div className="dashboard-label">{"DADOS DO SITE"}</div>
          <div className="stats-grid">
            {[
              ["📋", c.total, "Total de Denúncias", "purple"],
              ["✅", c.resolved, "Resolvidas", "green"],
              ["🔄", c.progress, "Em Andamento", "blue"],
              ["👍", 0, "Total de Apoios", "amber"],
            ].map(([icon, value, label, color], itemIndex) => (
              <div className={"" + "stat-card " + color} key={itemIndex}>
                <span className="stat-icon">{icon}</span>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="dashboard-label">{"MINHAS DENÚNCIAS"}</div>
          <div className="stats-grid my-stats">
            {[
              [m.total, "Registradas"],
              [m.resolved, "Resolvidas"],
              [m.progress, "Em Andamento"],
              [m.pending, "Pendentes"],
            ].map(([value, label], i) => (
              <Fragment key={i}>
                <Link
                  url={"/minhas-denuncias"}
                  label={
                    <>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </>
                  }
                  cls={`mini-stat tone-${i}`}
                />
              </Fragment>
            ))}
          </div>
          <div className="dash-columns">
            <div className="dash-main">
              <section className="panel">
                <div className="panel-head">
                  <h2>{"Denúncias Recentes (Site)"}</h2>
                  <Link url={"/minhas-denuncias"} label={"Ver todas →"} />
                </div>
                <RecentItems reports={[...data.reports].reverse()} />
              </section>
              <section className="panel">
                <h2>{"👍 Apoios Recebidos — Todas as Denúncias"}</h2>
                <p className="muted">{"Sem apoios ainda."}</p>
              </section>
              <section className="panel">
                <h2>{"Ações Rápidas"}</h2>
                <div className="quick-grid">
                  {[
                    ["📝", "Nova Denúncia", "/nova-denuncia"],
                    ["🔒", "Denúncia Anônima", "/denuncia-anonima"],
                    ["📊", "Estatísticas", "/estatisticas"],
                    ["⚙️", "Configurações", "/configuracoes"],
                  ].map(([icon, label, url], itemIndex) => (
                    <Fragment key={itemIndex}>
                      <Link
                        url={url}
                        label={
                          <>
                            <span>{icon}</span>
                            {label}
                          </>
                        }
                        cls={"quick-action"}
                      />
                    </Fragment>
                  ))}
                </div>
              </section>
            </div>
            <div className="dash-side">
              <section className="panel">
                <div className="panel-head">
                  <h2>{"Notificações"}</h2>
                  <Link url={"/notificacoes"} label={"Ver todas"} />
                </div>
                <p className="muted">
                  {"🔔 Sem notificações ainda."}
                  <br />
                  {
                    "Elas aparecerão quando alguém interagir com suas denúncias."
                  }
                </p>
              </section>
              <section className="panel">
                <h2>{"Cidade em Números"}</h2>
                {[
                  ["Total de Denúncias", c.total],
                  ["Resolvidas", c.resolved],
                  ["Em Andamento", c.progress],
                  ["Total de Apoios", 0],
                ].map(([label, value], itemIndex) => (
                  <div className="number-line" key={itemIndex}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
                <Link
                  url={"/estatisticas"}
                  label={"Ver relatório completo →"}
                  cls={"text-link"}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
