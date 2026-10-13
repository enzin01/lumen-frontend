import {
  Fragment,
  useEffect,
  useState,
} from "react";

import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { RecentItems } from "../components/RecentItems.jsx";
import { useLumen } from "../state";
import { getDenuncias } from "../services/api.js";

export function Dashboard() {
  const { data, name } = useLumen();

  const [denuncias, setDenuncias] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  useEffect(() => {
    async function carregarDenuncias() {
      try {
        setCarregando(true);
        setErro("");

        const resposta =
          await getDenuncias();

        setDenuncias(resposta);
      } catch (error) {
        console.error(error);

        setErro(
          "Não foi possível carregar as denúncias.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDenuncias();
  }, []);

  function contar(lista) {
    return {
      total: lista.length,

      enviada: lista.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus === "ENVIADA",
      ).length,

      analise: lista.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "EM_ANALISE",
      ).length,

      andamento: lista.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "EM_ANDAMENTO",
      ).length,

      resolvida: lista.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "RESOLVIDA",
      ).length,
    };
  }

  const minhasDenuncias =
    denuncias.filter(
      (denuncia) =>
        denuncia.usuario?.idUsuario ===
        data.currentUser?.idUsuario,
    );

  const c = contar(denuncias);
  const m = contar(minhasDenuncias);

  const denunciasRecentes = [
    ...denuncias,
  ].sort(
    (a, b) =>
      new Date(b.dataRegistro) -
      new Date(a.dataRegistro),
  );

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

              <p>
                {
                  "Aqui está um resumo das atividades da plataforma LUMEN."
                }
              </p>
            </div>
          </div>

          {erro && (
            <div className="empty-inline">
              <p>{erro}</p>
            </div>
          )}

          <div className="dashboard-label">
            {"DADOS DO SITE"}
          </div>

          <div className="stats-grid">
            {[
              [
                "📋",
                c.total,
                "Total de Denúncias",
                "purple",
              ],
              [
                "✅",
                c.resolvida,
                "Resolvidas",
                "green",
              ],
              [
                "🔄",
                c.andamento,
                "Em Andamento",
                "blue",
              ],
              [
                "👍",
                0,
                "Total de Apoios",
                "amber",
              ],
            ].map(
              (
                [
                  icon,
                  value,
                  label,
                  color,
                ],
                itemIndex,
              ) => (
                <div
                  className={`stat-card ${color}`}
                  key={itemIndex}
                >
                  <span className="stat-icon">
                    {icon}
                  </span>

                  <strong>
                    {carregando
                      ? "..."
                      : value}
                  </strong>

                  <span>{label}</span>
                </div>
              ),
            )}
          </div>

          <div className="dashboard-label">
            {"MINHAS DENÚNCIAS"}
          </div>

          <div className="stats-grid my-stats">
            {[
              [
                m.total,
                "Registradas",
              ],
              [
                m.resolvida,
                "Resolvidas",
              ],
              [
                m.andamento,
                "Em Andamento",
              ],
              [
                m.enviada + m.analise,
                "Pendentes",
              ],
            ].map(
              ([value, label], i) => (
                <Fragment key={i}>
                  <Link
                    url={
                      "/minhas-denuncias"
                    }
                    label={
                      <>
                        <strong>
                          {carregando
                            ? "..."
                            : value}
                        </strong>

                        <span>
                          {label}
                        </span>
                      </>
                    }
                    cls={`mini-stat tone-${i}`}
                  />
                </Fragment>
              ),
            )}
          </div>

          <div className="dash-columns">
            <div className="dash-main">
              <section className="panel">
                <div className="panel-head">
                  <h2>
                    {
                      "Denúncias Recentes (Site)"
                    }
                  </h2>

                  <Link
                    url={
                      "/minhas-denuncias"
                    }
                    label={
                      "Ver todas →"
                    }
                  />
                </div>

                {carregando ? (
                  <p className="muted">
                    {
                      "Carregando denúncias..."
                    }
                  </p>
                ) : (
                  <RecentItems
                    reports={
                      denunciasRecentes
                    }
                  />
                )}
              </section>

              <section className="panel">
                <h2>
                  {
                    "👍 Apoios Recebidos — Todas as Denúncias"
                  }
                </h2>

                <p className="muted">
                  {"Sem apoios ainda."}
                </p>
              </section>

              <section className="panel">
                <h2>
                  {"Ações Rápidas"}
                </h2>

                <div className="quick-grid">
                  {[
                    [
                      "📝",
                      "Nova Denúncia",
                      "/nova-denuncia",
                    ],
                    [
                      "🔒",
                      "Denúncia Anônima",
                      "/denuncia-anonima",
                    ],
                    [
                      "📊",
                      "Estatísticas",
                      "/estatisticas",
                    ],
                    [
                      "⚙️",
                      "Configurações",
                      "/configuracoes",
                    ],
                  ].map(
                    (
                      [
                        icon,
                        label,
                        url,
                      ],
                      itemIndex,
                    ) => (
                      <Fragment
                        key={
                          itemIndex
                        }
                      >
                        <Link
                          url={url}
                          label={
                            <>
                              <span>
                                {icon}
                              </span>

                              {label}
                            </>
                          }
                          cls={
                            "quick-action"
                          }
                        />
                      </Fragment>
                    ),
                  )}
                </div>
              </section>
            </div>

            <div className="dash-side">
              <section className="panel">
                <div className="panel-head">
                  <h2>
                    {"Notificações"}
                  </h2>

                  <Link
                    url={
                      "/notificacoes"
                    }
                    label={
                      "Ver todas"
                    }
                  />
                </div>

                <p className="muted">
                  {
                    "🔔 Sem notificações ainda."
                  }

                  <br />

                  {
                    "As notificações serão integradas posteriormente."
                  }
                </p>
              </section>

              <section className="panel">
                <h2>
                  {
                    "Cidade em Números"
                  }
                </h2>

                {[
                  [
                    "Total de Denúncias",
                    c.total,
                  ],
                  [
                    "Resolvidas",
                    c.resolvida,
                  ],
                  [
                    "Em Andamento",
                    c.andamento,
                  ],
                  [
                    "Em análise",
                    c.analise,
                  ],
                ].map(
                  (
                    [label, value],
                    itemIndex,
                  ) => (
                    <div
                      className="number-line"
                      key={itemIndex}
                    >
                      <span>
                        {label}
                      </span>

                      <strong>
                        {carregando
                          ? "..."
                          : value}
                      </strong>
                    </div>
                  ),
                )}

                <Link
                  url={"/estatisticas"}
                  label={
                    "Ver relatório completo →"
                  }
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