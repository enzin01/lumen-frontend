import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            {
              "Conectando cidadãos e administração pública para construir cidades mais seguras, transparentes e humanas."
            }
          </p>
          <Link
            url={"/denuncia-anonima"}
            label={"🔒 Denúncia Anônima"}
            cls={"footer-anon"}
          />
        </div>
        {"\n  "}
        <div>
          <h4>{"PLATAFORMA"}</h4>
          <Link url={"/sobre"} label={"Como Funciona"} />
          <Link url={"/estatisticas"} label={"Estatísticas"} />
          <Link url={"/nova-denuncia"} label={"Fazer Denúncia"} />
          <Link url={"/sobre"} label={"Sobre a LUMEN"} />
        </div>
        {"\n  "}
        <div>
          <h4>{"CONTA"}</h4>
          <Link url={"/login"} label={"Entrar"} />
          <Link url={"/cadastro"} label={"Criar Conta"} />
          <Link url={"/dashboard"} label={"Dashboard"} />
          <Link url={"/esqueci-senha"} label={"Esqueci a Senha"} />
        </div>
        {"\n  "}
        <div>
          <h4>{"LEGAL"}</h4>
          <Link url={"/termos-de-uso"} label={"Termos de Uso"} />
          <Link url={"/politica-de-privacidade"} label={"Privacidade"} />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          {"© 2024 LUMEN Tecnologia Cívica. Todos os direitos reservados."}
        </span>
        <span>{"🇧🇷 Feito com propósito no Brasil"}</span>
      </div>
    </footer>
  );
}
