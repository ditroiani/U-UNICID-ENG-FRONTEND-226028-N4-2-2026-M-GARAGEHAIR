document.addEventListener("DOMContentLoaded", () => {
    // Elementos da página
    const listaProdutos =
    document.querySelector("#lista-produtos");

    const buscaProduto =
    document.querySelector("#busca-produto");

    const ordenarProdutos =
    document.querySelector("#ordenar-produtos");

    const botoesCategoria =
    document.querySelectorAll(".categoria-btn");

    const semProdutos =
    document.querySelector("#sem-produtos");

    // Guarda todos os produtos carregados do JSON.
    let produtos = [];

    // Categoria selecionada atualmente.
    let categoriaAtual = "Todos";

    // Carregamento dos produtos
    async function carregarProdutos() {
        try {
            const response =
            await fetch("../assets/data/produtos.json");

            // Verifica se o arquivo foi encontrado.
            if (!response.ok) {
                throw new Error(
                    `Erro ao carregar produtos: ${response.status}`
                );
            }

            // Converte o JSON para objetos JavaScript.
            produtos = await response.json();

            // Exibe os produtos pela primeira vez.
            atualizarProdutos();
        } catch (error) {
            console.error(error);
            listaProdutos.innerHTML = `
                <div class="col-12">
                    <p class="text-center">
                        Não foi possível carregar os produtos.
                    </p>
                </div>
            `;
        }
    }

    // Criação dos cards
    function renderizarProdutos(lista) {
        // Limpa os produtos já existentes.
        listaProdutos.innerHTML = "";

        // Caso nenhum produto seja encontrado.
        if (lista.length === 0) {
            semProdutos.classList.remove("d-none");
            return;
        }

        // Caso existam produtos, esconde a mensagem.
        semProdutos.classList.add("d-none");

        // Percorre todos os produtos.
        lista.forEach(produto => {
            // Coluna Bootstrap.
            const coluna =
            document.createElement("div");

            coluna.className =
            "col-sm-6 col-xl-4";

            // Article do produto.
            const card =
            document.createElement("article");
            card.className =
            "produto-card";

            // Imagem.
            const imagem =
            document.createElement("img");
            imagem.src =
            produto.imagem;
            imagem.alt =
            `${produto.nome} da linha Garage Hair`;
            imagem.className =
            "produto-card-imagem";
            imagem.loading =
            "lazy";

            // Corpo do card.
            const body =
            document.createElement("div");
            body.className =
            "produto-card-body";

            // Categoria.
            const categoria =
            document.createElement("span");
            categoria.className =
            "produto-categoria";
            categoria.textContent =
            produto.categoria;

            // Nome.
            const nome =
            document.createElement("h3");
            nome.textContent =
            produto.nome;

            // Descrição.
            const descricao =
            document.createElement("p");
            descricao.textContent =
            produto.descricao;

            // Monta o card.
            body.append(
                categoria,
                nome,
                descricao
            );

            card.append(
                imagem,
                body
            );

            coluna.appendChild(card);
            listaProdutos.appendChild(coluna);
        });
    }

    // Filtros
    function atualizarProdutos() {
        /*
         * Cria uma cópia do array original.
         * Assim não alteramos a ordem original
         * armazenada em produtos.
         */
        let resultado =
        [...produtos];

        // Categoria
        if (categoriaAtual !== "Todos") {
            resultado =
            resultado.filter(produto => {
                return produto.categoria === categoriaAtual;
            });
        }

        // Busca
        const termoBusca =
        buscaProduto.value
        .trim()
        .toLowerCase();

        if (termoBusca !== "") {
            resultado =
            resultado.filter(produto => {
                const nome =
                produto.nome.toLowerCase();
                const categoria =
                produto.categoria.toLowerCase();
                const descricao =
                produto.descricao.toLowerCase();

                return (
                    nome.includes(termoBusca) ||
                    categoria.includes(termoBusca) ||
                    descricao.includes(termoBusca)
                );
            });
        }

        // Ordenação
        const ordenacao =
        ordenarProdutos.value;

        if (ordenacao === "nome-asc") {
            resultado.sort((a, b) => {
                return a.nome.localeCompare(
                    b.nome,
                    "pt-BR"
                );
            });
        }

        if (ordenacao === "nome-desc") {
            resultado.sort((a, b) => {
                return b.nome.localeCompare(
                    a.nome,
                    "pt-BR"
                );
            });
        }

        // Renderiza o resultado final.
        renderizarProdutos(resultado);
    }

    // Eventos
    /*
     * Busca.
     * "input" executa enquanto o usuário digita.
     */
    buscaProduto.addEventListener(
        "input",
        atualizarProdutos
    );

    // Ordenação.
    ordenarProdutos.addEventListener(
        "change",
        atualizarProdutos
    );

    // Categorias.
    botoesCategoria.forEach(botao => {
        botao.setAttribute("aria-pressed", botao.classList.contains("active").toString());
        botao.addEventListener("click", () => {
            // Remove active de todos.
            botoesCategoria.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            // Marca o botão clicado.
            botao.classList.add("active");
            botao.setAttribute("aria-pressed", "true");

            /*
             * Pega a categoria armazenada
             * no data-categoria.
             */
            categoriaAtual =
            botao.dataset.categoria;

            // Atualiza a lista.
            atualizarProdutos();
        });
    });

    // Inicialização
    carregarProdutos();
});
