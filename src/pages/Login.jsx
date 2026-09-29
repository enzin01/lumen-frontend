import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
import { AuthSide } from "../components/AuthSide.jsx";
import { Field } from "../components/Field.jsx";
export function Login() {
  return (
    <main className="auth-layout">
      <AuthSide />
      <div className="auth-main">
        <div className="auth-form-wrap">
          <Logo />
          <div className="auth-title">
            <h1>{"Entrar na conta"}</h1>
            <p>
              {"Não tem conta? "}
              <Link url={"/cadastro"} label={"Cadastre-se grátis"} />
            </p>
          </div>
          <form id="login-form" className="form-stack">
            <Field
              label={"E-MAIL"}
              id={"email"}
              placeholder={"seu@email.com"}
              type={"email"}
              value={""}
              extra={{
                required: true,
                autoComplete: "email",
              }}
            />
            <div className="field-heading">
              <span>{"SENHA"}</span>
              <Link url={"/esqueci-senha"} label={"Esqueci a senha"} />
            </div>
            <label className="field no-label">
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </label>
            <button className="btn btn-primary btn-full" type="submit">
              {"Entrar na Conta →"}
            </button>
          </form>
          <div className="divider">
            <span>{"ou continue com"}</span>
          </div>
          <button
            className="btn btn-google btn-full"
            type="button"
            data-action="google"
          >
            <strong>{"G"}</strong>
            {" Continuar com Google"}
          </button>
          <p className="auth-legal">
            {"Ao entrar, você concorda com os "}
            <Link url={"/termos-de-uso"} label={"Termos de Uso"} />
            {" e a "}
            <Link
              url={"/politica-de-privacidade"}
              label={"Política de Privacidade"}
            />
            {"."}
          </p>
          <Link
            url={"/denuncia-anonima"}
            label={"Prefere fazer uma denúncia anônima?"}
            cls={"auth-bottom-link"}
          />
        </div>
      </div>
    </main>
  );
}
