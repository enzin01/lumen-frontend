import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Field } from "../components/Field.jsx";
export function SimplePage({ type }) {
  const forgot = type === "forgot",
    config = type === "config",
    privacy = type === "privacy";
  const title = forgot
    ? "Esqueci a Senha"
    : config
      ? "Configurações"
      : privacy
        ? "Política de Privacidade"
        : "Termos de Uso";
  return (
    <>
      <Header inside={config} />
      <main className="page-light">
        <div className="container narrow-page">
          <div className="form-card simple-card">
            <Link
              url={config ? "/dashboard" : "/home"}
              label={"← Voltar"}
              cls={"back-link"}
            />
            <h1>{title}</h1>
            {forgot ? (
              <>
                <p>
                  {"Informe seu e-mail para recuperar o acesso à sua conta."}
                </p>
                <form id="forgot-form" className="form-stack">
                  <Field
                    label={"E-mail"}
                    id={"forgot-email"}
                    placeholder={"seu@email.com"}
                    type={"email"}
                    value={""}
                    extra={{
                      required: true,
                    }}
                  />
                  <button className="btn btn-primary" type="submit">
                    {"Enviar instruções →"}
                  </button>
                </form>
              </>
            ) : config ? (
              <>
                <p>{"Gerencie suas preferências da plataforma."}</p>
                <div className="number-line">
                  <span>{"Notificações por e-mail"}</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span />
                  </label>
                </div>
                <div className="number-line">
                  <span>{"Notificações de andamento"}</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span />
                  </label>
                </div>
              </>
            ) : (
              <>
                <p>
                  {
                    "Este front end reproduz o conteúdo visual do protótipo LUMEN. "
                  }
                  {privacy
                    ? "Os dados preenchidos nesta demonstração ficam apenas no navegador usado, em armazenamento local."
                    : "Ao utilizar esta demonstração, você pode testar os fluxos visuais e formulários localmente."}
                </p>
                <p>
                  {
                    "Para uma operação real, a plataforma precisa de termos completos, política de privacidade, autenticação e infraestrutura de processamento de denúncias."
                  }
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
