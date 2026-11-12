# Entender a Justiça · Protótipo v1

Protótipo (dados fictícios) que explica o andamento de um processo judicial em linguagem simples.
HTML, CSS e JavaScript puros, sem build e sem dependências.

## Como rodar

O JavaScript usa módulos ES, que **não funcionam abrindo o `index.html` com duplo clique** (`file://`).
Sirva a pasta com qualquer servidor local:

```bash
python3 -m http.server 8000     # depois abra http://localhost:8000
# ou
npx serve .
```

No VS Code, a extensão *Live Server* também funciona.

## Estrutura

```
.
├── index.html                # marcação das 3 telas + diálogo
├── assets/
│   └── icons/sprite.svg      # ícones (usados com <use href="...#nome">)
├── css/
│   ├── variables.css         # design tokens (cores)
│   ├── base.css              # reset + elementos nativos (body, table, dialog...)
│   ├── layout.css            # cabeçalho, barra de demo, menu lateral, rodapé
│   ├── components.css        # card, abas, linha do tempo, assistente, comunicações
│   ├── dashboard.css         # painel do tribunal e governança
│   └── responsive.css        # media queries (sempre por último)
└── js/
    ├── main.js               # ponto de entrada
    ├── state.js              # estado compartilhado (situação e aba atuais)
    ├── data/                 # conteúdo: glossário, situações do processo, métricas
    ├── services/assistant.js # regras de resposta do assistente (sem DOM)
    ├── utils/                # helpers de DOM e datas
    └── components/           # renderização e eventos de cada área da tela
```

## Onde mexer

| Quero…                                | Arquivo                     |
|---------------------------------------|-----------------------------|
| Trocar cores                          | `css/variables.css`         |
| Editar textos das situações / glossário | `js/data/*.js`            |
| Mudar as respostas do assistente      | `js/services/assistant.js`  |
| Adicionar um ícone                    | `assets/icons/sprite.svg`   |
