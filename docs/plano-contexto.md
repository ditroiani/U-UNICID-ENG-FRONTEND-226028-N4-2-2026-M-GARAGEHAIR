# Plano de Contexto — Garage Hair

## 1. Nome do projeto

**Garage Hair — Barbearia Sustentável e Inclusiva**

Projeto acadêmico desenvolvido para a disciplina de **Desenvolvimento Front-End para Web**, do curso de Engenharia de Software da UNICID.

---

## 2. Visão geral

O Garage Hair é um website institucional fictício para uma barbearia fundada em **1987**, com identidade baseada em tradição, sustentabilidade, inclusão, acessibilidade e responsabilidade social.

O site deve apresentar a história da barbearia, produtos, projetos sociais, iniciativas de impacto, conteúdos multimídia, notícias e formas de contato.

O projeto também deve demonstrar domínio de HTML5, CSS3, JavaScript, responsividade, acessibilidade, organização de código, versionamento com Git/GitHub e publicação web.

---

## 3. Problema que o projeto resolve

Criar uma presença digital moderna e organizada para uma barbearia, permitindo:

- apresentar a empresa e sua história;
- divulgar produtos e iniciativas;
- demonstrar ações sociais e sustentáveis;
- apresentar conteúdos em diferentes formatos;
- oferecer uma navegação acessível e responsiva;
- facilitar o contato com clientes;
- documentar custos e alternativas de hospedagem.

O projeto também atende aos requisitos acadêmicos da disciplina de Desenvolvimento Front-End para Web.

---

## 4. Público-alvo

O website é direcionado a:

- clientes atuais da Garage Hair;
- potenciais novos clientes;
- pessoas interessadas em produtos de cuidado masculino;
- comunidade local;
- pessoas interessadas em projetos sociais e sustentabilidade;
- pessoas com deficiência e usuários que utilizam recursos de acessibilidade;
- professores e avaliadores do projeto acadêmico.

---

## 5. Objetivos

### Objetivo principal

Desenvolver um site institucional completo, responsivo, acessível e visualmente consistente para a Garage Hair.

### Objetivos específicos

- apresentar a identidade e a história da Garage Hair;
- divulgar produtos e projetos;
- comunicar iniciativas sociais e ambientais;
- apresentar dados de impacto;
- implementar conteúdo multimídia;
- disponibilizar formulário de contato;
- aplicar boas práticas de HTML semântico;
- aplicar boas práticas de acessibilidade;
- garantir boa experiência em desktop, tablet e celular;
- utilizar Git e GitHub para versionamento;
- publicar o projeto em ambiente web;
- documentar orçamento e opções de hospedagem.

---

## 6. Funcionalidades principais

O projeto possui as seguintes páginas:

1. `index.html`
2. `pages/sobre.html`
3. `pages/projetos.html`
4. `pages/impacto.html`
5. `pages/acessibilidade.html`
6. `pages/produtos.html`
7. `pages/galeria.html`
8. `pages/midia.html`
9. `pages/noticias.html`
10. `pages/contato.html`
11. `pages/orcamento_hospedagem.html`

Funcionalidades previstas ou implementadas:

- navbar compartilhada;
- footer compartilhado;
- carregamento de componentes por JavaScript;
- página de produtos alimentada por dados JSON;
- gráficos com Chart.js;
- galeria de imagens;
- conteúdo em vídeo;
- conteúdo em áudio;
- uso de `iframe`;
- formulário de contato com validação;
- layout responsivo;
- navegação mobile;
- dropdown de navegação;
- página de acessibilidade;
- recursos globais de acessibilidade;
- página de orçamento e hospedagem;
- links internos entre as páginas;
- publicação em hospedagem web.

---

## 7. Stack técnica

### Front-End

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Chart.js
- JSON

### Desenvolvimento e versionamento

- Visual Studio Code
- Git
- GitHub
- Codex
- ChatGPT

### Hospedagem

Foram consideradas ou testadas plataformas como:

- Vercel
- Railway

A hospedagem definitiva pode ser alterada conforme as necessidades do projeto.

---

## 8. Requisitos não funcionais

O projeto deve manter:

### Acessibilidade

- HTML semântico;
- atributo `lang="pt-BR"`;
- textos alternativos em imagens relevantes;
- foco visível para navegação por teclado;
- contraste adequado;
- labels e atributos ARIA quando necessários;
- navegação utilizável por teclado;
- suporte a diferentes tamanhos de tela;
- preferência por movimento reduzido quando aplicável;
- futura integração de recursos como alto contraste, controle de fonte e VLibras.

### Responsividade

O site deve funcionar adequadamente em:

- desktop;
- notebook;
- tablet;
- smartphone.

### Qualidade

- código legível;
- arquivos organizados;
- nomes consistentes;
- reutilização de estilos e componentes;
- ausência de CSS inline quando não houver necessidade;
- ausência de duplicação desnecessária;
- links e caminhos válidos;
- compatibilidade com navegadores modernos.

### Segurança

- não armazenar senhas, tokens ou chaves no repositório;
- utilizar `.gitignore` para arquivos sensíveis quando necessário.

---

## 9. Estrutura do projeto

Estrutura principal:

```text
garage_hair/
├── assets/
│   ├── css/
│   ├── data/
│   ├── images/
│   ├── js/
│   └── media/
│       ├── audio/
│       └── video/
│
├── components/
│   ├── navbar.html
│   └── footer.html
│
├── docs/
│   └── plano-contexto.md
│
├── pages/
│   ├── acessibilidade.html
│   ├── contato.html
│   ├── galeria.html
│   ├── impacto.html
│   ├── midia.html
│   ├── noticias.html
│   ├── orcamento_hospedagem.html
│   ├── produtos.html
│   ├── projetos.html
│   └── sobre.html
│
├── AGENTS.md
├── .gitignore
├── index.html
└── README.md
```

### Convenções importantes

- `index.html` utiliza `data-root="."`.
- Páginas internas utilizam `data-root=".."`.
- Navbar e footer são carregados dinamicamente.
- O arquivo `assets/js/components.js` é responsável por resolver caminhos dos componentes compartilhados.
- CSS global permanece em `assets/css/style.css`.
- Páginas podem possuir CSS específico quando necessário.

---

## 10. Funcionalidades desejáveis

Funcionalidades que podem ser adicionadas ou aprimoradas:

- modo de alto contraste;
- ajuste de tamanho de texto;
- suporte a `prefers-reduced-motion`;
- VLibras;
- melhorias para diferentes tipos de daltonismo;
- otimização de imagens;
- melhoria de performance;
- revisão completa de navegação por teclado;
- refinamento de SEO;
- validação automatizada de formulários;
- melhoria contínua da documentação;
- testes adicionais de responsividade e acessibilidade.

Esses itens não devem comprometer os requisitos obrigatórios caso o prazo seja limitado.

---

## 11. Critérios de sucesso

O projeto será considerado concluído quando:

- todas as páginas obrigatórias estiverem implementadas;
- todas as páginas estiverem interligadas;
- navbar e footer estiverem funcionando;
- o layout estiver responsivo;
- o menu mobile estiver utilizável;
- o formulário possuir validação;
- imagens relevantes possuírem `alt`;
- vídeo, áudio e `iframe` estiverem corretamente implementados;
- os dados e gráficos forem exibidos corretamente;
- não houver links internos quebrados;
- o projeto estiver versionado no GitHub;
- o site estiver publicado;
- o HTML e CSS passarem por revisão e validação;
- a acessibilidade for revisada;
- a documentação do projeto estiver atualizada.

---

## Identidade visual

### Cores principais

```css
--garage-dark: #171a17;
--garage-green: #26382c;
--garage-olive: #667a5b;
--garage-beige: #d6c7a8;
--garage-light: #f4f1e8;
--garage-text: #252525;
--garage-white: #ffffff;
```

### Tipografia

- **Oswald**: títulos e elementos de destaque.
- **Montserrat**: textos, navegação, formulários e interface.

### Direção visual

A identidade deve transmitir:

- tradição;
- elegância;
- ambiente premium;
- sustentabilidade;
- acolhimento;
- inclusão.

As imagens devem manter, sempre que possível, continuidade visual com o ambiente da Garage Hair: madeira, verde escuro, plantas, iluminação quente, elementos vintage e acabamento contemporâneo.

---

## Diretrizes de manutenção

Sempre que o escopo do projeto mudar de forma relevante:

1. atualizar este arquivo;
2. revisar `AGENTS.md` caso a mudança afete padrões de desenvolvimento;
3. atualizar o README quando necessário;
4. realizar commit da documentação junto às alterações relacionadas.

