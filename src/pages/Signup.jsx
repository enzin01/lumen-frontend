import { Link } from "../components/Link.jsx";
import { Logo } from "../components/Logo.jsx";
import { AuthSide } from "../components/AuthSide.jsx";
import { Field } from "../components/Field.jsx";
import { useLumen } from "../state";
import { useState } from "react";
export function Signup() {
  const { registration } = useLumen();
  const [showPassword, setShowPassword] = useState(false);
  const steps = ["Dados Pessoais", "Localização", "Segurança", "Confirmação"];
  let content = "";
  if (registration.step === 1)
    content = (
      <>
        <Field
          label={"Nome Completo"}
          id={"reg-name"}
          placeholder={"João da Silva"}
          type={"text"}
          value={registration.name}
          extra={{
            required: true,
            autoComplete: "name",
          }}
        />
        <Field
          label={"E-mail"}
          id={"reg-email"}
          placeholder={"seu@email.com"}
          type={"email"}
          value={registration.email}
          extra={{
            required: true,
            autoComplete: "email",
          }}
        />
        <Field
          label={"CPF"}
          id={"reg-cpf"}
          placeholder={"123.456.789-00"}
          type={"text"}
          value={registration.cpf}
          extra={{
            required: true,
            inputMode: "numeric",
          }}
        />
        <Field
          label={"Telefone (opcional)"}
          id={"reg-phone"}
          placeholder={"(11) 9 1234-5678"}
          type={"tel"}
          value={registration.phone}
        />
      </>
    );
  if (registration.step === 2)
    content = (
      <>
        <Field
          label={"Cidade"}
          id={"reg-city"}
          placeholder={"Sua cidade"}
          type={"text"}
          value={registration.city}
          extra={{
            required: true,
          }}
        />
        <label className="field">
          <span>{"Estado"}</span>
          <select name="reg-state" required defaultValue={registration.state}>
            <option value>{"Selecione seu estado"}</option>
            {[
              "SP",
              "RJ",
              "MG",
              "ES",
              "PR",
              "SC",
              "RS",
              "BA",
              "PE",
              "CE",
              "DF",
              "GO",
              "AM",
              "PA",
              "MT",
              "MS",
              "MA",
              "PB",
              "RN",
              "AL",
              "SE",
              "PI",
              "TO",
              "RO",
              "AC",
              "AP",
              "RR",
            ].map((s, itemIndex) => (
              <option key={itemIndex}>{s}</option>
            ))}
          </select>
        </label>
      </>
    );
  if (registration.step === 3)
    content = (
      <>
        <label className="field">
          <span>{"Senha"}</span>
          <div className="password-control">
            <input
              name="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha segura"
              defaultValue={registration.password}
              required
              minLength="6"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>
        <Field
          label={"Confirmar Senha"}
          id={"reg-confirm"}
          placeholder={"Confirme sua senha"}
          type={"password"}
          value={""}
          extra={{
            required: true,
            minLength: "6",
          }}
        />
        <p className="form-hint">
          {"Use pelo menos 6 caracteres para proteger sua conta."}
        </p>
      </>
    );
  if (registration.step === 4)
    content = (
      <>
        <div className="review-box">
          <h3>{"Revise seus dados"}</h3>
          <p>
            <strong>{"Nome:"}</strong> {registration.name}
          </p>
          <p>
            <strong>{"E-mail:"}</strong> {registration.email}
          </p>
          <p>
            <strong>{"Localização:"}</strong> {registration.city}
            {registration.state ? " · " + registration.state : ""}
          </p>
        </div>
        <label className="check-line">
          <input type="checkbox" name="terms" required />
          <span>
            {"Li e concordo com os "}
            <Link url={"/termos-de-uso"} label={"Termos de Uso"} />
            {" e a "}
            <Link
              url={"/politica-de-privacidade"}
              label={"Política de Privacidade"}
            />
            {"."}
          </span>
        </label>
      </>
    );
  return (
    <main className="auth-layout">
      <AuthSide isSignup={true} />
      <div className="auth-main">
        <div className="auth-form-wrap signup-wrap">
          <Logo />
          <div className="auth-title">
            <h1>{"Crie sua conta de Cidadão"}</h1>
            <p>
              {"Já tem conta? "}
              <Link url={"/login"} label={"Entrar"} />
            </p>
          </div>
          <div className="mini-progress">
            {steps.map((s, i) => (
              <span
                className={registration.step >= i + 1 ? "active" : ""}
                key={i}
              />
            ))}
          </div>
          <p className="step-caption">
            {steps[registration.step - 1]}
            {" · Passo "}
            {registration.step}
            {" de 4"}
          </p>
          <form key={registration.step} id="signup-form" className="form-stack">
            {content}
            <div className="form-row">
              {registration.step > 1 ? (
                <button
                  type="button"
                  className="btn btn-ghost"
                  data-action="signup-back"
                >
                  {"← Voltar"}
                </button>
              ) : (
                ""
              )}
              <button
                className={
                  "" +
                  "btn btn-primary " +
                  (registration.step === 1 ? "btn-full" : "")
                }
                type="submit"
              >
                {registration.step === 4 ? "Criar Conta →" : "Continuar →"}
              </button>
            </div>
          </form>
          {registration.step === 1 ? (
            <>
              <div className="divider">
                <span>{"ou"}</span>
              </div>
              <button
                type="button"
                className="btn btn-google btn-full"
                data-action="google"
              >
                <strong>{"G"}</strong>
                {" Cadastrar com Google"}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}
