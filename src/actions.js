export function createActions(model, setModel, showToast) {
  let { data, registration, reportDraft, listScope, listFilter } =
    structuredClone(model);
  const render = () =>
    setModel(
      structuredClone({
        data,
        registration,
        reportDraft,
        listScope,
        listFilter,
      }),
    );
  const save = () => {
    localStorage.setItem("lumen-demo-data", JSON.stringify(data));
    render();
  };
  const myReports = () =>
    data.reports.filter(
      (r) => r.userId && r.userId === data.currentUser?.email,
    );
  function collectRegistration() {
    for (const [id, key] of [
      ["reg-name", "name"],
      ["reg-email", "email"],
      ["reg-cpf", "cpf"],
      ["reg-phone", "phone"],
      ["reg-city", "city"],
      ["reg-state", "state"],
      ["reg-password", "password"],
    ]) {
      const el =
        document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) registration[key] = el.value.trim();
    }
  }
  function collectReport() {
    for (const [id, key] of [
      ["report-address", "address"],
      ["report-district", "district"],
      ["report-city", "city"],
      ["report-title", "title"],
      ["report-description", "description"],
    ]) {
      const el =
        document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) reportDraft[key] = el.value.trim();
    }
  }

  const onClick = (event) => {
    const el = event.target.closest(
      "[data-action],[data-category],[data-scope],[data-filter]",
    );
    if (!el) return;
    if (el.dataset.category) {
      reportDraft.category = el.dataset.category;
      render();
      return;
    }
    if (el.dataset.scope) {
      listScope = el.dataset.scope;
      render();
      return;
    }
    if (el.dataset.filter) {
      listFilter = el.dataset.filter;
      render();
      return;
    }
    const action = el.dataset.action;
    if (action === "logout") {
      data.currentUser = null;
      save();
      location.hash = "/home";
      showToast("Você saiu da conta.");
    }
    if (action === "google")
      showToast("Login com Google requer uma integração externa.");
    if (action === "delete-disabled")
      showToast("Exclusão de conta indisponível nesta demonstração local.");
    if (action === "export-data") {
      const exportable = { user: data.currentUser, reports: myReports() };
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(exportable, null, 2)], {
          type: "application/json",
        }),
      );
      const download = document.createElement("a");
      download.href = url;
      download.download = "lumen-meus-dados.json";
      download.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    if (action === "back")
      history.length > 1 ? history.back() : (location.hash = "/home");
    if (action === "signup-back") {
      collectRegistration();
      registration.step = Math.max(1, registration.step - 1);
      render();
    }
    if (action === "report-back") {
      collectReport();
      if (reportDraft.step === 1) location.hash = "/dashboard";
      else {
        reportDraft.step--;
        render();
      }
    }
    if (action === "report-next") {
      collectReport();
      const step = reportDraft.step;
      if (step === 1 && !reportDraft.category)
        return showToast("Selecione uma categoria.");
      if (
        step === 2 &&
        (!reportDraft.address || !reportDraft.district || !reportDraft.city)
      )
        return showToast("Preencha a localização.");
      if (step === 3 && (!reportDraft.title || !reportDraft.description))
        return showToast("Preencha os detalhes.");
      if (step < 4) {
        reportDraft.step++;
        render();
        window.scrollTo(0, 0);
        return;
      }
      const protocol = `LMN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      data.reports.push({
        ...reportDraft,
        protocol,
        status: "Pendente",
        userId: data.currentUser?.email || "visitante",
        createdAt: new Date().toISOString(),
      });
      save();
      sessionStorage.setItem("lumen-last-protocol", protocol);
      reportDraft = {
        step: 1,
        category: "",
        address: "",
        district: "",
        city: "",
        title: "",
        description: "",
        photo: "",
      };
      render();
      location.hash = "/denuncia-enviada";
    }
  };
  const onChange = (event) => {
    if (event.target.matches("[data-pref]")) {
      data.preferences = {
        ...(data.preferences || {}),
        [event.target.dataset.pref]: event.target.checked,
      };
      save();
    }
  };
  async function digest(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  const onSubmit = async (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.id === "login-form") {
      const email = form
          .querySelector('[name="email"]')
          .value.trim()
          .toLowerCase(),
        password = form.querySelector('[name="password"]').value;
      const passwordHash = await digest(password);
      const user = data.users.find(
        (u) => u.email === email && u.passwordHash === passwordHash,
      );
      if (!user)
        return showToast(
          "E-mail ou senha inválidos nesta demonstração. Crie uma conta para testar.",
        );
      data.currentUser = { name: user.name, email: user.email };
      save();
      location.hash = "/dashboard";
    }
    if (form.id === "signup-form") {
      collectRegistration();
      if (
        registration.step === 3 &&
        form.elements.namedItem("reg-confirm").value !== registration.password
      )
        return showToast("As senhas não coincidem.");
      if (registration.step < 4) {
        registration.step++;
        render();
        window.scrollTo(0, 0);
        return;
      }
      if (data.users.some((u) => u.email === registration.email.toLowerCase()))
        return showToast("Este e-mail já foi cadastrado.");
      const user = {
        name: registration.name,
        email: registration.email.toLowerCase(),
        city: registration.city,
        state: registration.state,
        passwordHash: await digest(registration.password),
      };
      data.users.push(user);
      data.currentUser = { name: user.name, email: user.email };
      save();
      registration = {
        step: 1,
        name: "",
        email: "",
        cpf: "",
        phone: "",
        city: "",
        state: "",
        password: "",
      };
      render();
      location.hash = "/dashboard";
    }
    if (form.id === "anonymous-form") {
      const values = new FormData(form);
      const protocol = `LMN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      data.reports.push({
        protocol,
        category: values.get("category"),
        address: values.get("address"),
        title: values.get("title"),
        description: values.get("description"),
        status: "Pendente",
        userId: null,
        createdAt: new Date().toISOString(),
      });
      save();
      listScope = "all";
      render();
      sessionStorage.setItem("lumen-last-protocol", protocol);
      location.hash = "/denuncia-enviada";
    }
    if (form.id === "forgot-form")
      showToast(
        "Esta demonstração não envia e-mails. Para testar, crie uma conta local.",
      );
    if (form.id === "password-form") {
      const user = data.users.find((u) => u.email === data.currentUser?.email);
      const current = form.querySelector('[name="current-password"]').value;
      const next = form.querySelector('[name="new-password"]').value;
      const confirm = form.querySelector('[name="confirm-password"]').value;
      if (!user || user.passwordHash !== (await digest(current)))
        return showToast("Senha atual incorreta.");
      if (next !== confirm) return showToast("As novas senhas não coincidem.");
      user.passwordHash = await digest(next);
      save();
      form.reset();
      showToast("Senha atualizada nesta demonstração.");
    }
  };

  return { onClick, onChange, onSubmit };
}
