import { useEffect, useState } from "react";

import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Field } from "../components/Field.jsx";
import { getCategorias } from "../services/api.js";

export function Anonymous() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await getCategorias();

        const categoriasAtivas = resposta.filter(
          (categoria) => categoria.ativo !== false,
        );

        setCategorias(categoriasAtivas);
      } catch (error) {
        console.error(
          "Erro ao carregar categorias:",
          error,
        );
      }
    }

    carregarCategorias();
  }, []);

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

    return icons[nome] || "📌";
  }

  return (
    <>
      <Header />

      <main className="page-light">
        <div className="container narrow-page">
          <button
            className="back-link"
            data-action="back"
          >
            {"← Voltar"}
          </button>

          <div className="anonymous-banner">
            <span className="anon-lock">
              {"🔒"}
            </span>

            <div>
              <h2>
                {"Denúncia 100% Anônima"}
              </h2>

              <p>
                {
                  "Não solicitamos seus dados pessoais neste modo. A denúncia será registrada no sistema sem identificar o autor."
                }
              </p>
            </div>
          </div>

          <div className="form-card">
            <h1>
              {"Fazer Denúncia Anônima"}
            </h1>

            <p className="subhead">
              {"Tem conta? "}

              <Link
                url={"/login"}
                label={
                  "Entre para denúncias identificadas →"
                }
              />
            </p>

            <form
              id="anonymous-form"
              className="form-stack"
            >
              <label className="field">
                <span>
                  {"Categoria do Problema"}
                </span>

                <select
                  name="category"
                  required
                >
                  <option value="">
                    {
                      "Selecione uma categoria…"
                    }
                  </option>

                  {categorias.map(
                    (categoria) => (
                      <option
                        value={
                          categoria.idCategoria
                        }
                        key={
                          categoria.idCategoria
                        }
                      >
                        {getCategoryIcon(
                          categoria.nome,
                        )}{" "}
                        {categoria.nome}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <Field
                label={
                  "Endereço do Problema"
                }
                id={"address"}
                placeholder={
                  "Rua, Avenida, número ou referência…"
                }
                type={"text"}
                value={""}
                extra={{
                  required: true,
                }}
              />

              <Field
                label={"Bairro"}
                id={"district"}
                placeholder={
                  "Ex.: Jardim Belval"
                }
                type={"text"}
                value={""}
                extra={{
                  required: true,
                }}
              />

              <Field
                label={"Título / Resumo"}
                id={"title"}
                placeholder={
                  "Breve descrição do problema"
                }
                type={"text"}
                value={""}
                extra={{
                  required: true,
                }}
              />

              <label className="field">
                <span>
                  {"Descrição Detalhada"}
                </span>

                <textarea
                  name="description"
                  placeholder="Descreva o problema com o máximo de detalhes possível…"
                  rows="6"
                  required
                />
              </label>

              <button
                className="btn btn-primary btn-full"
                type="submit"
              >
                {
                  "🔒 Enviar Denúncia Anônima"
                }
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}