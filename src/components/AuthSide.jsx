import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
export function AuthSide({ isSignup = false, isRecovery = false }) {
  return (
    <aside className="auth-side">
      <div className="auth-side-overlay" />
      <div className="auth-side-inner">
        <Logo />
        <div className="auth-side-copy">
          <h2>
            {isSignup
              ? "Faça parte da mudança que você quer ver na sua rua."
              : isRecovery
                ? "Recupere o acesso à sua conta"
                : "Seja bem-vindo de volta"}
          </h2>
          <p>
            {isSignup
              ? "Junte-se a milhares de cidadãos transformando suas cidades com o LUMEN."
              : isRecovery
                ? "Enviaremos um link seguro para você redefinir sua senha."
                : "Acesse sua conta e continue contribuindo para uma cidade melhor."}
          </p>
          <div className="auth-benefits">
            <div>{"✓ Gratuito para todos os cidadãos"}</div>
            <div>{"✓ Seus dados protegidos pela LGPD"}</div>
            <div>{"✓ Resultados reais e mensuráveis"}</div>
          </div>
        </div>
        <Link
          url={"/denuncia-anonima"}
          label={"Prefere denunciar sem cadastro? Clique aqui"}
          cls={"auth-side-link"}
        />
      </div>
    </aside>
  );
}
