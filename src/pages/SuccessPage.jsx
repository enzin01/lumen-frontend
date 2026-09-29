import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
export function SuccessPage() {
  const protocol =
    sessionStorage.getItem("lumen-last-protocol") || "LMN-2024-000";
  return (
    <>
      <Header inside={true} />
      <main className="page-light">
        <div className="container narrow-page">
          <div className="empty-state success-state">
            <div>{"✅"}</div>
            <h1>{"Denúncia enviada!"}</h1>
            <p>{"Seu registro foi salvo nesta demonstração."}</p>
            <div className="protocol">{protocol}</div>
            <ButtonLink
              url={"/minhas-denuncias"}
              label={"Ver denúncias"}
              cls={"btn-primary"}
            />
            <Link url={"/home"} label={"Voltar ao início"} cls={"text-link"} />
          </div>
        </div>
      </main>
    </>
  );
}
