import {
  useEffect,
  useState,
} from "react";

import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
import { AppStats } from "../components/AppStats.jsx";
import { RecentItems } from "../components/RecentItems.jsx";
import { getDenuncias } from "../services/api.js";
import { useLumen } from "../state";

export function StatsPage() {
  const { data } = useLumen();
  const usuarioLogado = Boolean(data.currentUser);

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
          "Não foi possível carregar as estatísticas.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDenuncias();
  }, []);

  const categoriasAgrupadas = Object.entries(
    denuncias.reduce(
      (resultado, denuncia) => {
        const nome =
          denuncia.categoria?.nome ||
          "Sem categoria";

        resultado[nome] =
          (resultado[nome] || 0) + 1;

        return resultado;
      },
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);

  const bairrosAgrupados = Object.entries(
    denuncias.reduce(
      (resultado, denuncia) => {
        const bairro =
          denuncia.localizacao?.bairro;

        if (!bairro) {
          return resultado;
        }

        resultado[bairro] =
          (resultado[bairro] || 0) + 1;

        return resultado;
      },
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);

  const statusAgrupados = [
    [
      "Enviadas",
      denuncias.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus === "ENVIADA",
      ).length,
    ],
    [
      "Em análise",
      denuncias.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "EM_ANALISE",
      ).length,
    ],
    [
      "Em andamento",
      denuncias.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "EM_ANDAMENTO",
      ).length,
    ],
    [
      "Resolvidas",
      denuncias.filter(
        (denuncia) =>
          denuncia.statusAtual
            ?.codigoStatus ===
          "RESOLVIDA",
      ).length,
    ],
  ];

  const denunciasRecentes = [
    ...denuncias,
  ].sort(
    (a, b) =>
      new Date(b.dataRegistro) -
      new Date(a.dataRegistro),
  );

  return (
    <>
      <Header inside={usuarioLogado} />

      <main className="dashboard-page">
        <div className="container">
          <div className="page-heading">
            <div>
              <h1>
                {"Estatísticas da Cidade"}
              </h1>

              <p>
                {
                  "Dados reais com base nas denúncias registradas na plataforma."
                }
              </p>
            </div>

            {usuarioLogado ? (
              <ButtonLink
                url={"/nova-denuncia"}
                label={"+ Nova Denúncia"}
                cls={"btn-primary btn-small"}
              />
            ) : (
              <ButtonLink
                url={"/login"}
                label={"Entrar para denunciar"}
                cls={"btn-primary btn-small"}
              />
            )}
          </div>

          {erro && (
            <div className="empty-inline">
              <p>{erro}</p>
            </div>
          )}

          {carregando ? (
            <div className="empty-state">
              <div>{"⏳"}</div>

              <h3>
                {
                  "Carregando estatísticas..."
                }
              </h3>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                <AppStats
                  denuncias={denuncias}
                />
              </div>

              <div className="two-columns">
                <section className="panel">
                  <h3>
                    {
                      "Relatórios por Categoria"
                    }
                  </h3>

                  {categoriasAgrupadas.length ? (
                    categoriasAgrupadas.map(
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
                            {value}
                          </strong>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="muted">
                      {
                        "Nenhuma denúncia registrada ainda."
                      }
                    </p>
                  )}
                </section>

                <section className="panel">
                  <h3>
                    {
                      "Relatórios por Bairro"
                    }
                  </h3>

                  {bairrosAgrupados.length ? (
                    bairrosAgrupados.map(
                      (
                        [bairro, value],
                        itemIndex,
                      ) => (
                        <div
                          className="number-line"
                          key={itemIndex}
                        >
                          <span>
                            {bairro}
                          </span>

                          <strong>
                            {value}
                          </strong>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="muted">
                      {
                        "Nenhuma denúncia com bairro informado."
                      }
                    </p>
                  )}
                </section>
              </div>

              <section className="panel">
                <h3>
                  {
                    "Relatórios por Status"
                  }
                </h3>

                {statusAgrupados.map(
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
                        {value}
                      </strong>
                    </div>
                  ),
                )}
              </section>

              {usuarioLogado && (
                <section className="panel">
                  <div className="panel-head">
                    <h3>{"Denúncias Registradas"}</h3>

                    <Link
                      url={"/minhas-denuncias"}
                      label={"Ver todas →"}
                    />
                  </div>

                  {denuncias.length ? (
                    <RecentItems
                      reports={denunciasRecentes}
                    />
                  ) : (
                    <div className="empty-inline">
                      <p>{"📭"}</p>
                      <p>{"Nenhuma denúncia registrada ainda."}</p>
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}