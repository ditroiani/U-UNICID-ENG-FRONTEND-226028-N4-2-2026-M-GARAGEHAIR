document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTOS
       ========================================================= */
    const botoesFiltro =
        document.querySelectorAll(".filtro-btn");

    const itensGaleria =
        document.querySelectorAll(".galeria-item");

    /* =========================================================
       FILTROS DA GALERIA
       ========================================================= */
    botoesFiltro.forEach(botao => {
        botao.setAttribute("aria-pressed", botao.classList.contains("active").toString());
        botao.addEventListener("click", () => {
            const filtroSelecionado =
                botao.dataset.filtro;

            /* -----------------------------------------
               Atualiza botão ativo
               ----------------------------------------- */
            botoesFiltro.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            botao.classList.add("active");
            botao.setAttribute("aria-pressed", "true");

            /* -----------------------------------------
               Filtra os itens
               ----------------------------------------- */
            itensGaleria.forEach(item => {
                const categoria =
                    item.dataset.categoria;
                /*
                 * Se o filtro for "todos",
                 * exibe qualquer item.
                 *
                 * Caso contrário, compara
                 * a categoria da imagem.
                 */
                const deveExibir =
                    filtroSelecionado === "todos"
                    ||
                    categoria === filtroSelecionado;

                if (deveExibir) {
                    item.classList.remove("oculto");

                }

                else {
                    item.classList.add("oculto");
                }
            });
        });
    });
});
