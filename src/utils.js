export const categories = [
  ["iluminacao", "💡", "Iluminação Pública"],
  ["buracos", "🛣️", "Buracos e Pavimentação"],
  ["limpeza", "🗑️", "Limpeza Urbana"],
  ["saneamento", "🚰", "Saneamento Básico"],
  ["seguranca", "🚨", "Segurança Pública"],
  ["transporte", "🚌", "Transporte Público"],
  ["arborizacao", "🌳", "Arborização"],
  ["calcada", "🧱", "Calçada Danificada"],
  ["sinalizacao", "🚦", "Sinalização de Trânsito"],
  ["outros", "📋", "Outros"],
];

export const path = () =>
  (location.hash.slice(1).split("?")[0] || "/home").replace(/\/$/, "") ||
  "/home";
export const emptyRegistration = () => ({
  step: 1,
  name: "",
  email: "",
  cpf: "",
  phone: "",
  city: "",
  state: "",
  password: "",
});
export const emptyReport = () => ({
  step: 1,
  category:
    new URLSearchParams(location.hash.split("?")[1] || "").get("categoria") ||
    "",
  address: "",
  district: "",
  city: "",
  title: "",
  description: "",
  photo: "",
});
export const counts = (reports) => ({
  total: reports.length,
  resolved: reports.filter((r) => r.status === "Resolvido").length,
  progress: reports.filter((r) => r.status === "Em Andamento").length,
  pending: reports.filter((r) => r.status === "Pendente").length,
});

export const href = (p) => "#" + p;

export const categoryName = (id) =>
  categories.find((c) => c[0] === id)?.[2] || "Outros";
