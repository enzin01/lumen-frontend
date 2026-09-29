import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Field } from "../components/Field.jsx";
import { categories } from "../utils";
export function Anonymous() {
  return (
    <>
      <Header />
      <main className="page-light">
        <div className="container narrow-page">
          <button className="back-link" data-action="back">
            {"← Voltar"}
          </button>
          <div className="anonymous-banner">
            <span className="anon-lock">{"🔒"}</span>
            <div>
              <h2>{"Denúncia 100% Anônima"}</h2>
              <p>
                {
                  "Não solicitamos dados pessoais neste modo. Nesta demonstração, a denúncia fica somente neste navegador."
                }
              </p>
            </div>
          </div>
          <div className="form-card">
            <h1>{"Fazer Denúncia Anônima"}</h1>
            <p className="subhead">
              {"Tem conta? "}
              <Link
                url={"/login"}
                label={"Entre para denúncias identificadas →"}
              />
            </p>
            <form id="anonymous-form" className="form-stack">
              <label className="field">
                <span>{"Categoria do Problema"}</span>
                <select name="category" required>
                  <option value>{"Selecione uma categoria…"}</option>
                  {categories.map((c, itemIndex) => (
                    <option value={c[0]} key={itemIndex}>
                      {c[1]} {c[2]}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label={"Endereço do Problema"}
                id={"address"}
                placeholder={"Rua, Avenida, bairro, referência…"}
                type={"text"}
                value={""}
                extra={{
                  required: true,
                }}
              />
              <Field
                label={"Título / Resumo"}
                id={"title"}
                placeholder={"Breve descrição do problema"}
                type={"text"}
                value={""}
                extra={{
                  required: true,
                }}
              />
              <label className="field">
                <span>{"Descrição Detalhada"}</span>
                <textarea
                  name="description"
                  placeholder="Descreva o problema com o máximo de detalhes possível…"
                  rows="6"
                  required
                />
              </label>
              <button className="btn btn-primary btn-full" type="submit">
                {"🔒 Enviar Denúncia Anônima"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
