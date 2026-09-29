import { ButtonLink } from "../components/ButtonLink.jsx";
import { categoryName } from "../utils.js";
import { categories } from "../utils";
export function RecentItems({ reports }) {
  return reports.length ? (
    reports.slice(0, 4).map((r) => (
      <article className="report-row" key={r.protocol}>
        <div className="report-symbol">
          {categories.find((c) => c[0] === r.category)?.[1] || "📋"}
        </div>
        <div className="report-content">
          <strong>{r.title}</strong>
          <span>
            {r.address || r.city || "Localização não informada"}
            {" · "}
            {categoryName(r.category)}
          </span>
        </div>
        <span
          className={
            "" +
            "status " +
            (r.status === "Resolvido"
              ? "done"
              : r.status === "Em Andamento"
                ? "progress"
                : "pending")
          }
        >
          {r.status}
        </span>
      </article>
    ))
  ) : (
    <div className="empty-inline">
      <p>{"Nenhuma denúncia ainda."}</p>
      <ButtonLink
        url={"/nova-denuncia"}
        label={"+ Nova Denúncia"}
        cls={"btn-primary btn-small"}
      />
    </div>
  );
}
