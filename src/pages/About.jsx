import { ButtonLink } from "../components/ButtonLink.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
export function About() {
  return (
    <>
      <Header />
      <main className="page-light">
        <div className="container article-page">
          <button className="back-link" data-action="back">
            {"← Voltar"}
          </button>
          <h1>{"Sobre a LUMEN"}</h1>
          <section className="panel">
            <h2>{"Nossa Missão"}</h2>
            <p>
              {
                "Conectar cidadãos e administração pública através da tecnologia, tornando cidades mais transparentes, responsivas e humanas. Acreditamos que cada voz conta — e que a tecnologia cívica pode transformar a gestão do espaço urbano."
              }
            </p>
          </section>
          <section className="panel">
            <h2>{"O que é a LUMEN?"}</h2>
            <p>
              {
                "A LUMEN é uma plataforma de participação cidadã que permite a qualquer pessoa registrar e acompanhar problemas urbanos diretamente junto às autoridades competentes. Desde buracos em vias públicas até falhas na iluminação, passando por questões de saneamento e segurança."
              }
            </p>
            <p>
              {"Fundada em 2023, a plataforma já conectou mais de "}
              <strong>{"12.400 cidadãos"}</strong>
              {" com os órgãos municipais, com uma taxa de resolução de "}
              <strong>{"89%"}</strong>
              {" das denúncias em menos de 5 dias."}
            </p>
          </section>
          <h2>{"Como Funcionamos"}</h2>
          <div className="feature-cards about-features">
            {[
              [
                "🔓",
                "Transparência Total",
                "Todas as denúncias são públicas. Cidadãos podem acompanhar e apoiar problemas de sua comunidade.",
              ],
              [
                "🔒",
                "Privacidade Garantida",
                "Seguimos rigorosamente a LGPD. Denúncias anônimas não coletam nenhum dado pessoal.",
              ],
              [
                "⚡",
                "Resposta Rápida",
                "Integramos diretamente com os sistemas das prefeituras para encaminhamento automático.",
              ],
              [
                "📊",
                "Dados Abertos",
                "Estatísticas públicas para jornalistas, pesquisadores e gestores públicos.",
              ],
            ].map(([icon, title, desc], itemIndex) => (
              <article className="feature-card" key={itemIndex}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
          <h2>{"Nossa Equipe"}</h2>
          <div className="team-grid">
            {[
              ["AC", "Ana Costa", "CEO & Co-fundadora"],
              ["BL", "Bruno Lima", "CTO & Co-fundador"],
              ["CM", "Carla Mendes", "Head de Produto"],
              ["DR", "Diego Rocha", "Head de Parcerias"],
            ].map(([initials, n, role], itemIndex) => (
              <div className="team-card" key={itemIndex}>
                <div>{initials}</div>
                <strong>{n}</strong>
                <span>{role}</span>
              </div>
            ))}
          </div>
          <div className="inline-actions">
            <ButtonLink
              url={"/cadastro"}
              label={"Fazer Parte da LUMEN →"}
              cls={"btn-primary"}
            />
            <ButtonLink
              url={"/termos-de-uso"}
              label={"Termos de Uso"}
              cls={"btn-outline"}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
