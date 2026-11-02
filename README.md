<div align="center">
  <img src="assets/images/icones/favicon.png" alt="Logo Garage Hair" width="90">
  <h1>💈 Garage Hair</h1>
  <p><strong>Estilo que transforma. Impacto que permanece.</strong></p>
  <p>Tradição desde 1987 · Sustentabilidade · Inclusão</p>
  <p>
    <img src="https://img.shields.io/badge/Status-Em_desenvolvimento-667A5B?style=for-the-badge&amp;labelColor=171A17" alt="Status: em desenvolvimento">
    <img src="https://img.shields.io/badge/Projeto-Acad%C3%AAmico-D6C7A8?style=for-the-badge&amp;labelColor=171A17" alt="Projeto acadêmico">
    <img src="https://img.shields.io/badge/Hospedagem-Vercel-26382C?style=for-the-badge&amp;labelColor=171A17" alt="Hospedagem: Vercel">
  </p>
  <p><a href="https://garagehairunicid.vercel.app"><strong>Acessar o site ↗</strong></a></p>
</div>

---

## 🌿 Sobre o projeto

O **Garage Hair** é um website institucional desenvolvido para a disciplina de **Desenvolvimento Front-End para Web**, do curso de **Engenharia de Software da UNICID**.

A proposta apresenta uma barbearia fictícia fundada em **1987**, com raízes familiares e uma visão de cuidado que une tradição, sustentabilidade, inclusão e responsabilidade social. O projeto explora HTML5, CSS3 e JavaScript em uma experiência com páginas institucionais, produtos, notícias e indicadores de impacto.

> Projeto com finalidade acadêmica. A empresa, os contatos e parte dos conteúdos, preços e indicadores são fictícios ou simulados.

**Explore:** [Páginas](#-páginas-do-site) · [Tecnologias](#-tecnologias) · [Acessibilidade](#-acessibilidade) · [Execução local](#-como-executar) · [Equipe](#-equipe)

## ✨ Recursos do site

- **Identidade visual própria:** verde escuro, bege, madeira e referências à barbearia tradicional.
- **Navegação compartilhada:** navbar e rodapé carregados dinamicamente em todas as páginas.
- **Catálogo de produtos:** busca, filtros por categoria e ordenação, com conteúdo em JSON.
- **Indicadores de impacto:** dados simulados em CSV apresentados com gráficos do Chart.js.
- **Galeria e notícias:** filtros de imagens e leitura de notícias em janelas modais.
- **Conteúdo multimídia:** áudio sobre a história da marca e vídeo incorporado do YouTube.
- **Interações suaves:** efeitos nos cartões, entradas ao rolar e contagem animada na página inicial.
- **Layout responsivo:** estilos para desktop, tablet e celular, com menu lateral em telas menores.

## 🧭 Páginas do site

| Página | Conteúdo |
| --- | --- |
| [Início](index.html) | Apresentação da marca, proposta e resultados simulados. |
| [Sobre nós](pages/sobre.html) | História, propósito, missão, visão e valores. |
| [Projetos](pages/projetos.html) | Iniciativas ambientais e sociais. |
| [Produtos](pages/produtos.html) | Catálogo com busca, categorias e ordenação. |
| [Impacto](pages/impacto.html) | Indicadores e gráficos baseados em dados CSV. |
| [Galeria](pages/galeria.html) | Imagens organizadas por tema. |
| [Mídia](pages/midia.html) | História em áudio e conteúdos em vídeo. |
| [Notícias](pages/noticias.html) | Novidades, comunicados e ações da Garage Hair. |
| [Acessibilidade](pages/acessibilidade.html) | Inclusão no atendimento e recursos de navegação. |
| [Contato](pages/contato.html) | Canais de atendimento, formulário e localização. |
| [Orçamento e hospedagem](pages/orcamento.html) | Planejamento técnico e estimativas de custos. |

## 🛠️ Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| **HTML5** | Estrutura das páginas e organização do conteúdo. |
| **CSS3** | Identidade visual, responsividade, transições e animações. |
| **JavaScript** | Componentes compartilhados, filtros e preferências de acessibilidade. |
| **Bootstrap 5** | Grid, menu mobile, dropdowns, carrosséis e modais. |
| **Bootstrap Icons** | Ícones da interface. |
| **Chart.js** | Visualização dos indicadores ambientais e sociais. |
| **JSON e CSV** | Dados dos produtos e dos indicadores de impacto. |
| **VLibras** | Tradução de conteúdo para Libras, com carregamento sob demanda. |

O desenvolvimento utiliza **Git**, **GitHub** e **Visual Studio Code**. O site é estático e não exige instalação de dependências ou etapa de build.

## ♿ Acessibilidade

O menu de acessibilidade reúne os seguintes recursos:

- Ajuste do tamanho do texto entre **90% e 140%**.
- Modo de **alto contraste**.
- Controle de **redução de movimentos**, considerando a preferência do dispositivo e a escolha do usuário.
- Ativação e desativação do **VLibras**.
- Restauração das configurações padrão.
- Preferências salvas no navegador para as próximas páginas e visitas.


## 🎨 Identidade visual

| Elemento | Referência |
| --- | --- |
| Verde escuro | `#26382C` — tradição e natureza. |
| Bege | `#D6C7A8` — acolhimento e detalhes da marca. |
| Fundo escuro | `#171A17` — contraste e ambientação. |
| Títulos | **Oswald**. |
| Textos e interface | **Montserrat**. |

As imagens seguem uma linguagem de iluminação quente, madeira, plantas e cadeiras de barbeiro vintage.

## 📁 Estrutura do projeto

```text
.
├── index.html
├── README.md
├── AGENTS.md
├── .gitignore
├── assets/
│   ├── css/                   # Estilos globais e específicos de cada página
│   ├── data/
│   │   ├── impacto.csv
│   │   └── produtos.json
│   ├── images/                # Imagens organizadas por página e tema
│   ├── js/
│   │   ├── acessibilidade.js
│   │   ├── components.js
│   │   ├── galeria.js
│   │   ├── impacto.js
│   │   ├── index.js
│   │   ├── produtos.js
│   │   └── script.js
│   └── media/
│       └── audio/
│           └── historia_garage_hair.MP3
├── components/
│   ├── navbar.html
│   └── footer.html
├── docs/                      # Contexto e documentação acadêmica
└── pages/
    ├── acessibilidade.html
    ├── contato.html
    ├── galeria.html
    ├── impacto.html
    ├── midia.html
    ├── noticias.html
    ├── orcamento.html
    ├── produtos.html
    ├── projetos.html
    └── sobre.html
```

O arquivo [`assets/js/components.js`](assets/js/components.js) carrega a navbar e o rodapé e resolve os links compartilhados. A página inicial utiliza `data-root="."`; as páginas em `pages/` utilizam `data-root=".."`.

O contexto acadêmico e os objetivos estão em [`docs/plano-contexto.md`](docs/plano-contexto.md). As orientações para manutenção por agentes estão em [`AGENTS.md`](AGENTS.md).

## 💻 Como executar

1. Abra a pasta do projeto no **Visual Studio Code**.
2. Inicie um servidor HTTP local. Se utilizar a extensão **Live Server**, abra o `index.html` com **Open with Live Server**.
3. Acesse o endereço local informado pelo servidor.


## 🌐 Publicação

O projeto está hospedado na **Vercel**:

**[garagehairunicid.vercel.app ↗](https://garagehairunicid.vercel.app)**

Os arquivos são organizados como um site estático, com `index.html` na raiz e as demais páginas em `pages/`.


## 🤝 Equipe

| Integrantes |
| --- |
| Diego Troiani Rodrigues |
| Joao Vitor Pereira de Paula |
| Danilo Felipe de Oliveira Silva |
| Joao Pedro Rodrigues Batista |
| Gustavo Miguel Moraes Lisboa |
| Alessandro Rodrigo Oliveira Souza |

---

<div align="center">
  <p><strong>Garage Hair · Desde 1987</strong></p>
  <p>Projeto acadêmico fictício · Engenharia de Software · UNICID · 2026</p>
</div>
