import { Link } from "../components/Link.jsx";
import { categoryName } from "../utils.js";
import { Header } from "../components/Header.jsx";
import { Field } from "../components/Field.jsx";
import { useLumen } from "../state";
import { categories } from "../utils";
export function NewReport() {
  const { reportDraft } = useLumen();
  const step = reportDraft.step;
  let content = "";
  if (step === 1)
    content = (
      <>
        <h2>{"Categoria do Problema"}</h2>
        <p>{"Selecione o tipo de problema que deseja relatar."}</p>
        <div className="category-grid">
          {categories.map((c, itemIndex) => (
            <button
              type="button"
              className={
                "" +
                "category-option " +
                (reportDraft.category === c[0] ? "selected" : "")
              }
              data-category={c[0]}
              key={itemIndex}
            >
              <span>{c[1]}</span>
              {c[2]}
            </button>
          ))}
        </div>
      </>
    );
  if (step === 2)
    content = (
      <>
        <h2>{"Localização do Problema"}</h2>
        <p>{"Informe onde o problema foi encontrado."}</p>
        <div className="form-stack">
          <Field
            label={"Endereço"}
            id={"report-address"}
            placeholder={"Rua, Avenida, número ou referência"}
            type={"text"}
            value={reportDraft.address}
            extra={{
              required: true,
            }}
          />
          <Field
            label={"Bairro"}
            id={"report-district"}
            placeholder={"Nome do bairro"}
            type={"text"}
            value={reportDraft.district}
            extra={{
              required: true,
            }}
          />
          <Field
            label={"Cidade"}
            id={"report-city"}
            placeholder={"Sua cidade"}
            type={"text"}
            value={reportDraft.city}
            extra={{
              required: true,
            }}
          />
        </div>
      </>
    );
  if (step === 3)
    content = (
      <>
        <h2>{"Detalhes da Denúncia"}</h2>
        <p>{"Conte o que aconteceu para facilitar o encaminhamento."}</p>
        <div className="form-stack">
          <Field
            label={"Título / Resumo"}
            id={"report-title"}
            placeholder={"Breve descrição do problema"}
            type={"text"}
            value={reportDraft.title}
            extra={{
              required: true,
            }}
          />
          <label className="field">
            <span>{"Descrição Detalhada"}</span>
            <textarea
              name="report-description"
              rows="6"
              placeholder="Descreva o problema com o máximo de detalhes possível…"
              required
              defaultValue={reportDraft.description}
            />
          </label>
          <label className="field">
            <span>{"Foto (opcional)"}</span>
            <input name="report-photo" type="file" accept="image/*" />
          </label>
        </div>
      </>
    );
  if (step === 4)
    content = (
      <>
        <h2>{"Revise sua Denúncia"}</h2>
        <p>{"Confira as informações antes de enviar."}</p>
        <div className="review-box">
          <p>
            <strong>{"Categoria:"}</strong> {categoryName(reportDraft.category)}
          </p>
          <p>
            <strong>{"Local:"}</strong> {reportDraft.address}
            {", "}
            {reportDraft.district}
            {" · "}
            {reportDraft.city}
          </p>
          <p>
            <strong>{"Título:"}</strong> {reportDraft.title}
          </p>
          <p>
            <strong>{"Descrição:"}</strong> {reportDraft.description}
          </p>
        </div>
      </>
    );
  return (
    <>
      <Header inside={true} />
      <main className="dashboard-page">
        <div className="container wizard-container">
          <Link url={"/dashboard"} label={"← Dashboard"} cls={"back-link"} />
          <span className="breadcrumb-slash">{"/"}</span>
          <h1>{"Nova Denúncia"}</h1>
          <div className="wizard-steps">
            {["Categoria", "Localização", "Detalhes", "Revisão"].map((s, i) => (
              <div
                className={
                  "" + "wizard-step " + (step >= i + 1 ? "active" : "")
                }
                key={i}
              >
                <span>{i + 1}</span>
                <small>{s}</small>
              </div>
            ))}
          </div>
          <div key={step} className="form-card wizard-card">
            {content}
            <div className="wizard-actions">
              <button
                type="button"
                className="btn btn-ghost"
                data-action="report-back"
              >
                {step === 1 ? "← Cancelar" : "← Voltar"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-action="report-next"
              >
                {step === 4 ? "Enviar Denúncia →" : "Continuar →"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
