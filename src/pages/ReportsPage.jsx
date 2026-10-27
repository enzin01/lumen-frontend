import { useEffect, useState } from "react";

import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
import { useLumen } from "../state";
import {
  atualizarDenuncia,
  excluirDenuncia,
  getDenuncias,
} from "../services/api.js";

export function ReportsPage() {
  const { data, listScope, listFilter } = useLumen();

  const [denuncias, setDenuncias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEdicao, setTituloEdicao] = useState("");
  const [descricaoEdicao, setDescricaoEdicao] = useState("");
  const [salvandoId, setSalvandoId] = useState(null);

  useEffect(() => {
    async function carregarDenuncias() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await getDenuncias();
        setDenuncias(resposta);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar as denúncias.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDenuncias();
  }, []);

  function getStatus(denuncia) {
    return denuncia.statusAtual?.nomeStatus || "Enviada";
  }

  function getStatusCode(denuncia) {
    return denuncia.statusAtual?.codigoStatus || "ENVIADA";
  }

  function getStatusClass(denuncia) {
    const codigo = getStatusCode(denuncia);

    if (codigo === "RESOLVIDA") {
      return "resolved";
    }

    if (
      codigo === "EM_ANALISE" ||
      codigo === "EM_ANDAMENTO"
    ) {
      return "progress";
    }

    return "pending";
  }

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

  function getProtocol(denuncia) {
    const dataRegistro = denuncia.dataRegistro
      ? new Date(denuncia.dataRegistro)
      : new Date();

    const ano = dataRegistro.getFullYear();

    return `LMN-${ano}-${String(
      denuncia.idDenuncia,
    ).padStart(6, "0")}`;
  }

  function iniciarEdicao(denuncia) {
    setEditandoId(denuncia.idDenuncia);
    setTituloEdicao(denuncia.titulo || "");
    setDescricaoEdicao(denuncia.descricao || "");
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setTituloEdicao("");
    setDescricaoEdicao("");
  }

  async function salvarEdicao(denuncia) {
    if (!tituloEdicao.trim() || !descricaoEdicao.trim()) {
      alert("Preencha o título e a descrição.");
      return;
    }

    try {
      setSalvandoId(denuncia.idDenuncia);

      const atualizada = await atualizarDenuncia(
        denuncia.idDenuncia,
        {
          titulo: tituloEdicao.trim(),
          descricao: descricaoEdicao.trim(),
          anonima: denuncia.anonima,
          usuario: denuncia.usuario
            ? { idUsuario: denuncia.usuario.idUsuario }
            : null,
          categoria: {
            idCategoria: denuncia.categoria.idCategoria,
          },
          localizacao: {
            idLocalizacao: denuncia.localizacao.idLocalizacao,
          },
          statusAtual: {
            idStatus: denuncia.statusAtual.idStatus,
          },
        },
      );

      setDenuncias((anteriores) =>
        anteriores.map((item) =>
          item.idDenuncia === atualizada.idDenuncia
            ? atualizada
            : item,
        ),
      );

      cancelarEdicao();
    } catch (error) {
      console.error(error);
      alert("Não foi possível atualizar a denúncia.");
    } finally {
      setSalvandoId(null);
    }
  }

  async function removerDenuncia(denuncia) {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir a denúncia "${denuncia.titulo}"?`,
    );

    if (!confirmou) return;

    try {
      setSalvandoId(denuncia.idDenuncia);
      await excluirDenuncia(denuncia.idDenuncia);

      setDenuncias((anteriores) =>
        anteriores.filter(
          (item) =>
            item.idDenuncia !== denuncia.idDenuncia,
        ),
      );

      if (editandoId === denuncia.idDenuncia) {
        cancelarEdicao();
      }
    } catch (error) {
      console.error(error);
      alert(
        "Não foi possível excluir a denúncia. Se ela possuir histórico ou imagem vinculada, exclua esses registros primeiro.",
      );
    } finally {
      setSalvandoId(null);
    }
  }

  const minhasDenuncias = denuncias.filter(
    (denuncia) =>
      denuncia.usuario?.idUsuario ===
      data.currentUser?.idUsuario,
  );

  const todas =
    listScope === "all"
      ? denuncias
      : minhasDenuncias;

  const mostradas =
    listFilter === "Todos"
      ? todas
      : todas.filter(
          (denuncia) =>
            getStatus(denuncia) === listFilter,
        );

  const contadores = {
    total: todas.length,
    enviada: todas.filter(
      (denuncia) =>
        getStatusCode(denuncia) === "ENVIADA",
    ).length,
    analise: todas.filter(
      (denuncia) =>
        getStatusCode(denuncia) === "EM_ANALISE",
    ).length,
    andamento: todas.filter(
      (denuncia) =>
        getStatusCode(denuncia) === "EM_ANDAMENTO",
    ).length,
    resolvida: todas.filter(
      (denuncia) =>
        getStatusCode(denuncia) === "RESOLVIDA",
    ).length,
  };

  return (
    <>
      <Header inside={true} />

      <main className="dashboard-page">
        <div className="container">
          <div className="breadcrumb">
            <Link
              url={"/dashboard"}
              label={"← Dashboard"}
            />
            <span>{"/"}</span>
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
              className={
                listScope === "mine"
                  ? "selected"
                  : ""
              }
              data-scope="mine"
            >
              {"Minhas Denúncias"}
            </button>

            <button
              className={
                listScope === "all"
                  ? "selected"
                  : ""
              }
              data-scope="all"
            >
              {"Todas as Denúncias"}
            </button>
          </div>

          <div className="stats-grid list-stats">
            {[
              [contadores.total, "Total"],
              [contadores.enviada, "Enviadas"],
              [contadores.analise, "Em análise"],
              [contadores.andamento, "Em andamento"],
              [contadores.resolvida, "Resolvidas"],
            ].map(([value, label], itemIndex) => (
              <button
                className="mini-stat"
                key={itemIndex}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="filter-row">
            {[
              "Todos",
              "Enviada",
              "Em análise",
              "Em andamento",
              "Resolvida",
            ].map((f, itemIndex) => (
              <button
                className={
                  "filter-chip " +
                  (listFilter === f
                    ? "selected"
                    : "")
                }
                data-filter={f}
                key={itemIndex}
              >
                {f}
              </button>
            ))}
          </div>

          {carregando ? (
            <div className="empty-state">
              <div>{"⏳"}</div>
              <h3>{"Carregando denúncias..."}</h3>
            </div>
          ) : erro ? (
            <div className="empty-state">
              <div>{"⚠️"}</div>
              <h3>{"Erro ao carregar"}</h3>
              <p>{erro}</p>
            </div>
          ) : mostradas.length ? (
            <div className="panel report-list">
              {[...mostradas]
                .reverse()
                .map((denuncia) => {
                  const ehMinha =
                    denuncia.usuario?.idUsuario ===
                    data.currentUser?.idUsuario;

                  const editando =
                    editandoId === denuncia.idDenuncia;

                  return (
                    <article
                      className="report-row"
                      key={denuncia.idDenuncia}
                    >
                      <div className="report-symbol">
                        {getCategoryIcon(
                          denuncia.categoria?.nome,
                        )}
                      </div>

                      <div className="report-content">
                        {editando ? (
                          <>
                            <input
                              type="text"
                              value={tituloEdicao}
                              onChange={(event) =>
                                setTituloEdicao(
                                  event.target.value,
                                )
                              }
                              aria-label="Título da denúncia"
                            />

                            <textarea
                              rows="3"
                              value={descricaoEdicao}
                              onChange={(event) =>
                                setDescricaoEdicao(
                                  event.target.value,
                                )
                              }
                              aria-label="Descrição da denúncia"
                            />
                          </>
                        ) : (
                          <>
                            <strong>
                              {denuncia.titulo}
                            </strong>

                            <span>
                              {denuncia.localizacao
                                ?.logradouro ||
                                "Local não informado"}
                              {" · "}
                              {denuncia.categoria?.nome ||
                                "Sem categoria"}
                              {" · "}
                              {getProtocol(denuncia)}
                            </span>

                            <span>
                              {denuncia.descricao}
                            </span>
                          </>
                        )}
                      </div>

                      <span
                        className={`status ${getStatusClass(
                          denuncia,
                        )}`}
                      >
                        {getStatus(denuncia)}
                      </span>

                      {ehMinha && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          {editando ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-small"
                                disabled={
                                  salvandoId ===
                                  denuncia.idDenuncia
                                }
                                onClick={() =>
                                  salvarEdicao(denuncia)
                                }
                              >
                                {salvandoId ===
                                denuncia.idDenuncia
                                  ? "Salvando..."
                                  : "Salvar"}
                              </button>

                              <button
                                type="button"
                                className="btn btn-ghost btn-small"
                                onClick={cancelarEdicao}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline btn-small"
                                onClick={() =>
                                  iniciarEdicao(denuncia)
                                }
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-ghost btn-small"
                                disabled={
                                  salvandoId ===
                                  denuncia.idDenuncia
                                }
                                onClick={() =>
                                  removerDenuncia(denuncia)
                                }
                              >
                                {salvandoId ===
                                denuncia.idDenuncia
                                  ? "Excluindo..."
                                  : "Excluir"}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
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