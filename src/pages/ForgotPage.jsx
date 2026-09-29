import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
import { AuthSide } from "../components/AuthSide.jsx";
import { Field } from "../components/Field.jsx";
export function ForgotPage() {
  return (
    <main className="auth-layout">
      <AuthSide isSignup={false} isRecovery={true} />
      <div className="auth-main">
        <div className="auth-form-wrap">
          <Logo />
          <Link url={"/login"} label={"← Voltar ao login"} cls={"back-link"} />
          <div className="auth-title">
            <h1>{"Esqueci minha senha"}</h1>
            <p>
              {
                "Informe o e-mail cadastrado e enviaremos um link para criar nova senha."
              }
            </p>
          </div>
          <form id="forgot-form" className="form-stack">
            <Field
              label={"E-mail cadastrado"}
              id={"forgot-email"}
              placeholder={"seu@email.com"}
              type={"email"}
              value={""}
              extra={{
                required: true,
              }}
            />
            <button className="btn btn-primary btn-full" type="submit">
              {"Enviar link de recuperação"}
            </button>
          </form>
          <p className="auth-legal">
            {"Lembrou a senha? "}
            <Link url={"/login"} label={"Voltar ao login"} />
          </p>
        </div>
      </div>
    </main>
  );
}
