export function AppStats({ denuncias = [] }) {
  const total = denuncias.length;

  const resolvidas = denuncias.filter(
    (denuncia) =>
      denuncia.statusAtual?.codigoStatus === "RESOLVIDA",
  ).length;

  const enviadas = denuncias.filter(
    (denuncia) =>
      denuncia.statusAtual?.codigoStatus === "ENVIADA",
  ).length;

  const emAnalise = denuncias.filter(
    (denuncia) =>
      denuncia.statusAtual?.codigoStatus === "EM_ANALISE",
  ).length;

  const emAndamento = denuncias.filter(
    (denuncia) =>
      denuncia.statusAtual?.codigoStatus === "EM_ANDAMENTO",
  ).length;

  const pendentes = enviadas + emAnalise;

  const metrics = [
    ["📋", total, "Total de Denúncias", "purple"],
    ["✅", resolvidas, "Resolvidas", "green"],
    ["⏳", pendentes, "Pendentes", "amber"],
    ["🔄", emAndamento, "Em Andamento", "blue"],
  ];

  return metrics.map(
    ([icon, value, label, color], itemIndex) => (
      <div
        className={`stat-card ${color}`}
        key={itemIndex}
      >
        <span className="stat-icon">{icon}</span>

        <strong>{value}</strong>

        <span>{label}</span>
      </div>
    ),
  );
}