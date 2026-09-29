# LUMEN — front end

Interface da plataforma cívica LUMEN, convertida para React com JavaScript e Vite. Mantém o visual, as rotas com `#` e a compatibilidade com os dados locais da versão anterior.

## Executar

Use Node.js 22.12 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no terminal (normalmente `http://localhost:5173`). Execute o projeto pelo Vite; abrir `index.html` diretamente não executa os módulos JSX.

## Produção

```bash
npm run build
npm run preview
```

O build gera a pasta `dist/`, que pode ser publicada em uma hospedagem estática. O comando `preview` permite conferir esse build localmente.

## Estrutura

- `src/main.jsx`: inicialização do React.
- `src/App.jsx`: navegação, eventos e mensagens de feedback.
- `src/pages/`: páginas e formulários em JSX.
- `src/components/`: componentes compartilhados.
- `src/state.jsx`: estado compartilhado com Context e hooks.
- `src/actions.js`: ações dos formulários e persistência local.
- `src/utils.js` e `src/titles.js`: categorias, utilitários e títulos das rotas.
- `src/styles.css`: estilos responsivos do projeto original.
- `vite.config.js`: configuração do Vite com o plugin React.

## Escopo

Inclui página inicial, login, cadastro, denúncia anônima, fluxo de nova denúncia, dashboard, listagem com filtros, estatísticas, notificações, página sobre, configurações e páginas legais.

Os dados continuam no `localStorage`, na chave `lumen-demo-data`, e o último protocolo fica no `sessionStorage`. Dados anteriores são reutilizados quando acessados na mesma origem (protocolo, host e porta). A autenticação é apenas uma simulação local.

Login com Google, envio de e-mails, exclusão de conta e integração com prefeitura continuam indisponíveis nesta demonstração. O campo de foto é visual e não faz upload. As páginas legais contêm textos demonstrativos. Fontes e algumas imagens dependem de acesso à internet.
