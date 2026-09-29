import { Link } from "../components/Link.jsx";
import { Header } from "../components/Header.jsx";
import { Field } from "../components/Field.jsx";
import { useLumen } from "../state";
import { Fragment } from "react";
export function ConfigPage() {
  const { data } = useLumen();
  return (
    <>
      <Header inside={true} />
      <main className="dashboard-page">
        <div className="container settings-container">
          <div className="breadcrumb">
            <Link url={"/dashboard"} label={"← Perfil"} /> <span>{"/"}</span>
          </div>
          <h1>{"Configurações"}</h1>
          <section className="panel settings-panel">
            <h2>{"🔔 Notificações"}</h2>
            <p>{"Gerencie como quer ser informado."}</p>
            {[
              ["E-mail", "Notificações sobre denúncias por e-mail", true],
              [
                "Push (navegador)",
                "Notificações em tempo real no navegador",
                false,
              ],
              ["Newsletter", "Novidades e relatórios mensais da cidade", true],
            ].map(([label, desc, checked], i) => (
              <label className="setting-row" key={i}>
                <span>
                  <strong>{label}</strong>
                  <small>{desc}</small>
                </span>
                <input
                  type="checkbox"
                  data-pref={i}
                  defaultChecked={data.preferences?.[i] ?? checked}
                />
              </label>
            ))}
            <Link
              url={"/notificacoes"}
              label={"Ver histórico de notificações →"}
              cls={"text-link"}
            />
          </section>
          <section className="panel settings-panel">
            <h2>{"🔒 Privacidade"}</h2>
            <p>{"Controle a visibilidade das suas informações."}</p>
            <label className="setting-row">
              <span>
                <strong>{"Perfil público"}</strong>
                <small>{"Outros cidadãos podem ver seu perfil"}</small>
              </span>
              <input
                type="checkbox"
                data-pref="public"
                defaultChecked={data.preferences?.public ?? false}
              />
            </label>
            <p className="form-hint">
              {"ℹ️ Saiba mais na nossa "}
              <Link
                url={"/politica-de-privacidade"}
                label={"Política de Privacidade"}
              />
              {"."}
            </p>
          </section>
          <section className="panel settings-panel">
            <h2>{"🔑 Segurança da Conta"}</h2>
            <form id="password-form" className="form-stack">
              <Field
                label={"Senha Atual"}
                id={"current-password"}
                placeholder={"••••••••"}
                type={"password"}
                value={""}
                extra={{
                  required: true,
                }}
              />
              <Field
                label={"Nova Senha"}
                id={"new-password"}
                placeholder={"Mínimo 8 caracteres"}
                type={"password"}
                value={""}
                extra={{
                  required: true,
                  minLength: "8",
                }}
              />
              <Field
                label={"Confirmar Nova Senha"}
                id={"confirm-password"}
                placeholder={"Repita a nova senha"}
                type={"password"}
                value={""}
                extra={{
                  required: true,
                  minLength: "8",
                }}
              />
              <button className="btn btn-primary" type="submit">
                {"Atualizar Senha"}
              </button>
            </form>
          </section>
          <section className="panel settings-panel">
            <h2>{"📄 Documentos Legais"}</h2>
            {[
              ["Termos de Uso", "/termos-de-uso"],
              ["Política de Privacidade", "/politica-de-privacidade"],
              ["Sobre a LUMEN", "/sobre"],
            ].map(([label, url], itemIndex) => (
              <Fragment key={itemIndex}>
                <Link
                  url={url}
                  label={
                    <>
                      <span>{label}</span>
                      <strong>{"Ver →"}</strong>
                    </>
                  }
                  cls={"setting-row"}
                />
              </Fragment>
            ))}
          </section>
          <section className="panel settings-panel">
            <h2>{"⚠️ Zona de Perigo"}</h2>
            <p>{"Ações irreversíveis. Proceda com cuidado."}</p>
            <div className="inline-actions">
              <button
                className="btn btn-outline"
                type="button"
                data-action="export-data"
              >
                {"📤 Exportar Meus Dados"}
              </button>
              <button
                className="btn btn-outline"
                type="button"
                data-action="delete-disabled"
              >
                {"🗑️ Excluir Conta"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
