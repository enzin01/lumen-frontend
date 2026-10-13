import { ButtonLink } from "../components/ButtonLink.jsx";

export function RecentItems({ reports }) {
  function getCategoryIcon(nome) {
    const icons = {
      "Iluminação Pública": "💡",
      "Lixo Acumulado": "🗑️",
      "Saneamento": "🚰",
      "Saneamento Básico": "🚰",
      "Buracos na Via": "🛣️",
      "Buracos e Pavimentação": "🛣️",
      "Segurança": "🚨",
      "Segurança Pública": "🚨",
      "Árvores e Vegetação": "🌳",
      "Arborização": "🌳",
      "Calçada Danificada": "🧱",
      "Limpeza Urbana": "🗑️",
      "Transporte Público": "🚌",
      "Sinalização de Trânsito": "🚦",
      "Outros": "📋",
    };

    return icons[nome] || "📋";
  }

  function getStatus(report) {
    return report.statusAtual?.nomeStatus || "Enviada";
  }

  function getStatusClass(report) {
    const codigo =
      report.statusAtual?.codigoStatus || "ENVIADA";

    if (codigo === "RESOLVIDA") {
      return "done";
    }

    if (
      codigo === "EM_ANALISE" ||
      codigo === "EM_ANDAMENTO"
    ) {
      return "progress";
    }

    return "pending";
  }

  return reports.length ? (
    reports.slice(0, 4).map((report) => (
      <article
        className="report-row"
        key={report.idDenuncia}
      >
        <div className="report-symbol">
          {getCategoryIcon(
            report.categoria?.nome,
          )}
        </div>

        <div className="report-content">
          <strong>
            {report.titulo}
          </strong>

          <span>
            {report.localizacao?.logradouro ||
              "Localização não informada"}

            {" · "}

            {report.categoria?.nome ||
              "Sem categoria"}
          </span>
        </div>

        <span
          className={`status ${getStatusClass(
            report,
          )}`}
        >
          {getStatus(report)}
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