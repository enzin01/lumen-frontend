import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { categoryName } from "../utils.js";
import { Header } from "../components/Header.jsx";
import { useLumen } from "../state";
import { categories } from "../utils";
export function ReportsPage() {
  const { data, listScope, listFilter, myReports, counts } = useLumen();
  const all = listScope === "all" ? data.reports : myReports();
  const shown =
    listFilter === "Todos" ? all : all.filter((r) => r.status === listFilter);
  const c = counts(all);
  return (
    <>
      <Header inside={true} />
      <main className="dashboard-page">
        <div className="container">
          <div className="breadcrumb">
            <Link url={"/dashboard"} label={"← Dashboard"} /> <span>{"/"}</span>
          </div>
          <div className="page-heading">
            <h1>{"Denúncias"}</h1>
            <ButtonLink
              url={"/nova-denuncia"}
              label={"+ Nova Denúncia"}
              cls={"btn-primary btn-small"}
            />
          </div>
          <div className="tab-row">
            <button
              className={listScope === "mine" ? "selected" : ""}
              data-scope="mine"
            >
              {"Minhas Denúncias"}
            </button>
            <button
              className={listScope === "all" ? "selected" : ""}
              data-scope="all"
            >
              {"Todas as Denúncias"}
            </button>
          </div>
          <div className="stats-grid list-stats">
            {[
              [c.total, "Total"],
              [c.pending, "Pendentes"],
              [c.progress, "Em Andamento"],
              [c.resolved, "Resolvidos"],
            ].map(([value, label], itemIndex) => (
              <button className="mini-stat" key={itemIndex}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="filter-row">
            {["Todos", "Pendente", "Em Andamento", "Resolvido"].map(
              (f, itemIndex) => (
                <button
                  className={
                    "" + "filter-chip " + (listFilter === f ? "selected" : "")
                  }
                  data-filter={f}
                  key={itemIndex}
                >
                  {f}
                </button>
              ),
            )}
          </div>
          {shown.length ? (
            <div className="panel report-list">
              {[...shown].reverse().map((r) => (
                <article className="report-row" key={r.protocol}>
                  <div className="report-symbol">
                    {categories.find((c) => c[0] === r.category)?.[1] || "📋"}
                  </div>
                  <div className="report-content">
                    <strong>{r.title}</strong>
                    <span>
                      {r.address || r.city}
                      {" · "}
                      {categoryName(r.category)}
                      {" · "}
                      {r.protocol}
                    </span>
                  </div>
                  <span className="status pending">{r.status}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>{"📭"}</div>
              <h3>{"Nenhuma denúncia encontrada"}</h3>
              <p>
                {listScope === "mine"
                  ? "Você ainda não fez nenhuma denúncia."
                  : "Nenhuma denúncia registrada ainda."}
              </p>
              <ButtonLink
                url={"/nova-denuncia"}
                label={"Fazer primeira denúncia →"}
                cls={"btn-primary"}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
