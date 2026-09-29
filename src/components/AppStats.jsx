import { useLumen } from "../state";
export function AppStats() {
  const { counts } = useLumen();
  const c = counts();
  const metrics = [
    ["📋", c.total, "Total de Denúncias", "purple"],
    ["✅", c.resolved, "Resolvidas", "green"],
    ["⏳", c.pending, "Pendentes", "amber"],
    ["🔄", c.progress, "Em Andamento", "blue"],
  ];
  return metrics.map(([icon, value, label, color], itemIndex) => (
    <div className={"" + "stat-card " + color} key={itemIndex}>
      <span className="stat-icon">{icon}</span>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  ));
}
