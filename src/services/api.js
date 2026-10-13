const API_URL = "http://localhost:8080/api/v1";

async function verificarResposta(response, mensagem) {
  if (!response.ok) {
    throw new Error(mensagem);
  }

  return response.json();
}

export async function getCategorias() {
  const response = await fetch(`${API_URL}/categoria`);

  return verificarResposta(
    response,
    "Erro ao buscar categorias"
  );
}

export async function getDenuncias() {
  const response = await fetch(`${API_URL}/denuncia`);

  return verificarResposta(
    response,
    "Erro ao buscar denúncias"
  );
}

export async function criarLocalizacao(localizacao) {
  const response = await fetch(`${API_URL}/localizacao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(localizacao),
  });

  return verificarResposta(
    response,
    "Erro ao cadastrar localização"
  );
}

export async function criarDenuncia(denuncia) {
  const response = await fetch(`${API_URL}/denuncia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(denuncia),
  });

  return verificarResposta(
    response,
    "Erro ao cadastrar denúncia"
  );
}

export async function criarUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  return verificarResposta(
    response,
    "Erro ao cadastrar usuário"
  );
}

export async function loginUsuario(email, senhaHash) {
  const response = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senhaHash,
    }),
  });

  return verificarResposta(
    response,
    "E-mail ou senha inválidos"
  );
}