import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
import { AppStats } from "../components/AppStats.jsx";
import { RecentItems } from "../components/RecentItems.jsx";
import { useLumen } from "../state";
import { categories } from "../utils";
import { Fragment } from "react";
export function StatsPage() {
  const { data, counts } = useLumen();
  const c = counts();
  const grouped = categories
    .map((cat, itemIndex) => (
      <Fragment key={itemIndex}>
        {[cat[2], data.reports.filter((r) => r.category === cat[0]).length]}
      </Fragment>
    ))
    .filter((row) => row[1]);
  const h = <Header inside={true} />;
  return (
    <>
      {h}
      <main className="dashboard-page">
        <div className="container">
          <div className="page-heading">
            <div>
              <h1>{"Estatísticas da Cidade"}</h1>
              <p>
                {
                  "Dados reais com base nas denúncias registradas na plataforma."
                }
              </p>
            </div>
            <ButtonLink
              url={"/nova-denuncia"}
              label={"+ Nova Denúncia"}
              cls={"btn-primary btn-small"}
            />
          </div>
          <div className="stats-grid">
            <AppStats />
          </div>
          <div className="two-columns">
            <section className="panel">
              <h3>{"Relatórios por Categoria"}</h3>
              {grouped.length ? (
                grouped.map(([label, value], itemIndex) => (
                  <div className="number-line" key={itemIndex}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))
              ) : (
                <p className="muted">{"Nenhuma denúncia registrada ainda."}</p>
              )}
            </section>
            <section className="panel">
              <h3>{"Relatórios por Bairro"}</h3>
              {data.reports.some((r) => r.district) ? (
                [
                  ...new Set(
                    data.reports
                      .map((r, itemIndex) => (
                        <Fragment key={itemIndex}>{r.district}</Fragment>
                      ))
                      .filter(Boolean),
                  ),
                ].map((d, itemIndex) => (
                  <div className="number-line" key={itemIndex}>
                    <span>{d}</span>
                    <strong>
                      {data.reports.filter((r) => r.district === d).length}
                    </strong>
                  </div>
                ))
              ) : (
                <p className="muted">
                  {"Nenhuma denúncia com bairro informado."}
                </p>
              )}
            </section>
          </div>
          <section className="panel">
            <div className="panel-head">
              <h3>{"Denúncias Registradas"}</h3>
              <Link url={"/minhas-denuncias"} label={"Ver todas →"} />
            </div>
            {data.reports.length ? (
              <RecentItems reports={[...data.reports].reverse()} />
            ) : (
              <div className="empty-inline">
                <p>{"📭"}</p>
                <p>{"Nenhuma denúncia registrada ainda."}</p>
                <ButtonLink
                  url={"/minhas-denuncias"}
                  label={"Ver todos os relatórios"}
                  cls={"btn-primary btn-small"}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
