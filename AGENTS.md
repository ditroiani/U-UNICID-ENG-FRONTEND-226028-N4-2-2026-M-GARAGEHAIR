# AGENTS.md — Garage Hair

Este arquivo define como agentes de IA devem trabalhar no projeto **Garage Hair — Barbearia Sustentável e Inclusiva**.

---

## 1. Contexto obrigatório

Antes de modificar o projeto, leia:

- `docs/plano-contexto.md`
- `README.md`

Quando a tarefa envolver arquivos já existentes, analise também os arquivos relacionados antes de propor alterações.

Não presuma estruturas, caminhos ou funcionalidades que não existam no projeto.

---

## 2. Objetivo do agente

O agente deve auxiliar no desenvolvimento e manutenção do projeto preservando:

- identidade visual;
- arquitetura existente;
- acessibilidade;
- responsividade;
- organização de arquivos;
- consistência entre páginas;
- requisitos acadêmicos.

O agente deve priorizar alterações pequenas, verificáveis e fáceis de revisar.

---

## 3. Tecnologias permitidas

O projeto utiliza:

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Chart.js
- JSON

Ferramentas de desenvolvimento:

- Git
- GitHub
- Visual Studio Code
- Codex
- ChatGPT

Não introduza novos frameworks, bibliotecas ou dependências sem autorização explícita.

---

## 4. Estrutura do projeto

```text
garage_hair/
├── assets/
│   ├── css/
│   ├── data/
│   ├── images/
│   ├── js/
│   └── media/
├── components/
├── docs/
├── pages/
├── AGENTS.md
├── .gitignore
├── index.html
└── README.md
```

Use os diretórios existentes.

Não crie novas pastas sem necessidade clara.

---

## 5. Componentes globais

A navbar e o footer são componentes compartilhados:

```text
components/navbar.html
components/footer.html
```

Eles são carregados dinamicamente nas páginas.

O carregamento e a resolução de caminhos são tratados principalmente por:

```text
assets/js/components.js
```

### Regras

- não duplicar navbar ou footer diretamente em cada página;
- não alterar a estratégia de carregamento sem necessidade;
- ao modificar componentes globais, verificar impacto em todas as páginas;
- preservar `data-link` quando utilizado pelo sistema de navegação;
- preservar o comportamento de `data-root`.

---

## 6. Caminhos relativos

Convenção atual:

### Página inicial

```html
<body data-root=".">
```

### Páginas internas

```html
<body data-root="..">
```

Antes de alterar caminhos de imagens, CSS, JavaScript, mídia ou componentes, confirme se o arquivo está na raiz ou em `pages/`.

Não alterar caminhos em massa sem verificar a estrutura real.

---

## 7. HTML

Ao criar ou editar HTML:

- usar HTML5 semântico;
- manter `lang="pt-BR"`;
- utilizar somente um `<h1>` principal por página;
- manter hierarquia coerente de títulos;
- utilizar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>` quando semanticamente adequados;
- imagens relevantes devem possuir `alt` adequado;
- ícones decorativos devem usar `aria-hidden="true"` quando apropriado;
- formulários devem possuir labels;
- links devem possuir propósito claro;
- evitar `div` quando houver elemento semântico mais apropriado;
- não utilizar CSS inline sem justificativa;
- preservar compatibilidade com Bootstrap 5.

---

## 8. CSS

### Identidade visual

Utilize as variáveis globais existentes:

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

- títulos: `Oswald`;
- textos e interface: `Montserrat`.

### Regras

- priorizar reutilização das variáveis de `:root`;
- evitar valores repetidos desnecessariamente;
- manter consistência visual com as páginas existentes;
- preservar responsividade;
- verificar efeitos em desktop, tablet e smartphone;
- não remover estilos globais sem analisar dependências;
- evitar `!important` quando não for realmente necessário;
- manter foco visível;
- não prejudicar contraste;
- evitar animações excessivas;
- respeitar `prefers-reduced-motion` quando houver animação relevante.

---

## 9. JavaScript

Ao editar JavaScript:

- preferir JavaScript puro;
- manter código legível e modular;
- evitar dependências novas sem autorização;
- preservar `components.js`;
- não duplicar lógica que já exista;
- verificar erros no console;
- tratar elementos opcionais de forma segura;
- usar `DOMContentLoaded` quando necessário;
- não quebrar páginas que não possuam determinado elemento.

---

## 10. Responsividade

Toda alteração visual deve ser revisada em:

- desktop;
- tablet;
- smartphone.

A navbar mobile deve permanecer navegável mesmo em telas de pouca altura.

Menus extensos devem permitir rolagem quando necessário.

Evitar:

- overflow horizontal;
- textos cortados;
- botões fora da tela;
- imagens deformadas;
- componentes sobrepostos.

---

## 11. Acessibilidade

Preserve e melhore:

- navegação por teclado;
- foco visível;
- contraste;
- textos alternativos;
- labels;
- ARIA quando necessário;
- HTML semântico;
- tamanho de áreas clicáveis;
- responsividade.

Não adicionar ARIA redundante quando o elemento HTML já possuir semântica adequada.

A revisão final do projeto deve considerar também:

- alto contraste;
- controle de tamanho do texto;
- `prefers-reduced-motion`;
- VLibras;
- validação de contraste.

---

## 12. Identidade e conteúdo

A Garage Hair foi fundada em **1987**.

Não alterar essa data.

A proposta da marca combina:

- tradição;
- sustentabilidade;
- inclusão;
- responsabilidade social;
- ambiente premium;
- acolhimento.

O conteúdo deve permanecer coerente com essa proposta.

---

## 13. Imagens

As imagens do projeto utilizam predominantemente formato `.png`.

Antes de alterar uma extensão ou caminho, confirme o arquivo existente.

A linguagem visual das imagens deve preservar, quando aplicável:

- iluminação quente;
- verde escuro;
- madeira;
- plantas;
- cadeiras de barbeiro vintage;
- acabamento contemporâneo;
- ambiente premium;
- continuidade visual entre páginas.

---

## 14. Alterações em arquivos existentes

Antes de editar:

1. leia o arquivo completo ou a parte relevante;
2. identifique dependências;
3. apresente um plano curto quando a alteração for significativa;
4. altere somente o necessário;
5. preserve funcionalidades existentes;
6. verifique efeitos colaterais;
7. informe os arquivos modificados.

Não reescreva arquivos grandes sem necessidade quando uma alteração localizada for suficiente.

---

## 15. Verificação após alterações

Quando possível, verificar:

- erros de sintaxe;
- console do navegador;
- caminhos relativos;
- links;
- responsividade;
- navegação por teclado;
- elementos ativos da navbar/footer;
- carregamento de imagens;
- carregamento de CSS;
- carregamento de JavaScript;
- ausência de regressões visuais.

Quando a tarefa envolver HTML/CSS final, considerar validação W3C.

---

## 16. Segurança

Nunca adicionar ao repositório:

- senhas;
- tokens;
- API keys;
- credenciais;
- arquivos `.env` com segredos.

Não imprimir segredos em logs.

Se um segredo for encontrado no código ou histórico, avise o usuário.

---

## 17. Git

Antes de operações Git destrutivas, solicitar autorização.

Não executar sem autorização explícita:

```bash
git push --force
git push --force-with-lease
git reset --hard
git clean -fd
```

Também não apagar branches ou reescrever histórico sem confirmação.

### Commits

Prefira commits pequenos e descritivos.

Exemplos:

```text
feat: adiciona página de orçamento e hospedagem
style: melhora responsividade da navbar
fix: corrige caminho do áudio da página de mídia
docs: atualiza plano de contexto
```

---

## 18. Fluxo recomendado para tarefas

Para tarefas pequenas:

1. analisar;
2. editar;
3. verificar;
4. resumir alterações.

Para tarefas grandes:

1. ler contexto e arquivos envolvidos;
2. apresentar plano;
3. aguardar confirmação quando houver decisão relevante;
4. implementar por etapas;
5. verificar cada etapa;
6. revisar resultado final.

Se faltar informação que possa alterar significativamente a implementação, pergunte antes.

---

## 19. O que evitar

Evite:

- inventar arquivos que não existem;
- mudar nomes de pastas sem necessidade;
- trocar a stack;
- adicionar frameworks desnecessários;
- duplicar componentes;
- criar CSS inline;
- remover acessibilidade;
- modificar conteúdo histórico sem autorização;
- alterar várias áreas não relacionadas à tarefa;
- executar comandos destrutivos automaticamente.

---

## 20. Relação com o plano de contexto

`docs/plano-contexto.md` define **o que o projeto é e o que deve entregar**.

`AGENTS.md` define **como um agente deve trabalhar dentro do projeto**.

Se houver conflito entre uma tarefa pontual e este arquivo, peça esclarecimento antes de executar alterações irreversíveis.

