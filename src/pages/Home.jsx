import { Link } from "../components/Link.jsx";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { SectionTag } from "../components/SectionTag.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Fragment } from "react";
export function Home() {
  const shortCategories = [
    ["💡", "Iluminação", "iluminacao"],
    ["🛣️", "Pavimentação", "buracos"],
    ["🚰", "Saneamento", "saneamento"],
    ["🚦", "Sinalização", "sinalizacao"],
    ["🌳", "Arborização", "arborizacao"],
    ["🧱", "Calçadas", "calcada"],
    ["🚨", "Segurança", "seguranca"],
    ["📋", "Outros", "outros"],
  ];
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-glow one" />
          <div className="hero-glow two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <SectionTag text={"PLATAFORMA CÍVICA DIGITAL"} />
              <h1>
                {"Sua voz tem o poder"}
                <br />
                {"de "}
                <em>{"transformar"}</em>
                <br />
                {"a cidade"}
              </h1>
              <p>
                {
                  "Registre problemas urbanos e encaminhe-os diretamente às autoridades. Transparente, gratuito e protegido pela LGPD."
                }
              </p>
              <div className="hero-buttons">
                <ButtonLink
                  url={"/cadastro"}
                  label={"Fazer Denúncia →"}
                  cls={"btn-green"}
                />
                <ButtonLink
                  url={"/denuncia-anonima"}
                  label={"🔒 Denúncia Anônima"}
                  cls={"btn-outline"}
                />
              </div>
              <div className="hero-stats">
                <div>
                  <strong>{"12.4K+"}</strong>
                  <span>{"Denúncias registradas"}</span>
                </div>
                <div>
                  <strong>{"89%"}</strong>
                  <span>{"Taxa de resolução"}</span>
                </div>
                <div>
                  <strong>{"< 5 dias"}</strong>
                  <span>{"Tempo médio"}</span>
                </div>
              </div>
            </div>
            <div className="hero-art">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=720&h=540&fit=crop&auto=format"
                alt="Vista aérea de cidade"
              />
              <div className="float-card solved">
                <span>{"✅"}</span>
                <div>
                  <strong>{"Problema Resolvido!"}</strong>
                  <small>{"LMN-2024-003 · 4.2 dias"}</small>
                </div>
              </div>
              <div className="float-card update">
                <span>{"🔔"}</span>
                <div>
                  <strong>{"Atualização"}</strong>
                  <small>{"Sua denúncia está em andamento"}</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        {"\n  "}
        <section className="category-strip">
          <div className="container">
            <SectionTag text={"CATEGORIAS DE DENÚNCIA"} />
            <div className="category-row">
              {shortCategories.map(([icon, label, id], itemIndex) => (
                <Fragment key={itemIndex}>
                  <Link
                    url={`/nova-denuncia?categoria=${id}`}
                    label={
                      <>
                        <span>{icon}</span>
                        {label}
                      </>
                    }
                    cls={"category-chip"}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {"\n  "}
        <section className="steps-section" id="como-funciona">
          <div className="container section-center">
            <SectionTag text={"SIMPLES E EFICAZ"} />
            <h2>{"Como o LUMEN funciona"}</h2>
            <p>
              {"Três passos simples para transformar um problema em solução."}
            </p>
            <div className="steps-grid">
              {[
                [
                  "📍",
                  "Identifique o Problema",
                  "Fotografe, descreva e localize com precisão. Em menos de 2 minutos pelo celular ou computador.",
                  "/nova-denuncia",
                ],
                [
                  "📡",
                  "Acompanhe em Tempo Real",
                  "Receba notificações sobre cada atualização. Saiba quando foi aceito, encaminhado e resolvido.",
                  "/dashboard",
                ],
                [
                  "🏙️",
                  "Cidade Transformada",
                  "Veja o impacto coletivo. Cada denúncia conta para uma cidade mais segura e justa.",
                  "/estatisticas",
                ],
              ].map(([icon, title, desc, url], i) => (
                <Fragment key={i}>
                  <Link
                    url={url}
                    label={
                      <>
                        <div className="step-number">
                          {"0"}
                          {i + 1}
                        </div>
                        <div className="step-icon">{icon}</div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </>
                    }
                    cls={"step-card"}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {"\n  "}
        <section className="feature-section">
          <div className="container feature-grid">
            <div className="feature-copy">
              <SectionTag text={"POR QUE LUMEN?"} />
              <h2>
                {"Tecnologia cívica"}
                <br />
                {"a serviço das pessoas"}
              </h2>
              <p>
                {
                  "Construído com transparência e responsabilidade. Cada recurso foi desenhado para empoderar cidadãos e tornar a gestão pública mais ágil."
                }
              </p>
              <div className="inline-actions">
                <ButtonLink
                  url={"/cadastro"}
                  label={"Comece gratuitamente"}
                  cls={"btn-primary"}
                />
                <Link url={"/sobre"} label={"Saiba mais →"} cls={"text-link"} />
              </div>
            </div>
            <div className="feature-cards">
              {[
                [
                  "🔓",
                  "Transparência Total",
                  "Todas as denúncias são públicas. Cidadãos acompanham, apoiam e fiscalizam em conjunto.",
                ],
                [
                  "🔒",
                  "Privacidade LGPD",
                  "Seus dados protegidos por lei. Modo anônimo disponível — nenhum dado coletado.",
                ],
                [
                  "⚡",
                  "Encaminhamento Direto",
                  "Integração com sistemas municipais para triagem e encaminhamento automático.",
                ],
                [
                  "📊",
                  "Dados Abertos",
                  "Estatísticas públicas para jornalistas, pesquisadores e gestores municipais.",
                ],
              ].map(([icon, title, desc], itemIndex) => (
                <article className="feature-card" key={itemIndex}>
                  <span>{icon}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        {"\n  "}
        <section className="cta-section">
          <div className="container cta-box">
            <div className="cta-orb" />
            <h2>
              {"Pronto para transformar"}
              <br />
              {"sua cidade?"}
            </h2>
            <p>
              {
                "Junte-se a cidadãos que já estão fazendo a diferença. Gratuito, transparente e protegido pela LGPD."
              }
            </p>
            <div className="hero-buttons">
              <ButtonLink
                url={"/cadastro"}
                label={"Criar conta gratuita →"}
                cls={"btn-white"}
              />
              <ButtonLink
                url={"/denuncia-anonima"}
                label={"🔒 Denunciar anonimamente"}
                cls={"btn-dark-outline"}
              />
            </div>
            <div className="trust-row">
              {
                "🛡️ 100% LGPD\xA0\xA0 🆓 Gratuito para sempre\xA0\xA0 🇧🇷 Feito no Brasil"
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
