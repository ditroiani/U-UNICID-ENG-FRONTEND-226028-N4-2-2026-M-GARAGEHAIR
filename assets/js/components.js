document.addEventListener("DOMContentLoaded", async() => {

    /*
     * =========================================================
     * RAIZ DO PROJETO
     * =========================================================
     *
     * Descobre qual é o caminho até a raiz do projeto.
     *
     * index.html:
     * <body data-root=".">
     *
     * pages/sobre.html:
     * <body data-root="..">
     */

    const root = document.body.dataset.root || ".";


    /*
     * =========================================================
     * CARREGAMENTO DOS COMPONENTES
     * =========================================================
     */

    async function loadComponent(selector, file) {

        const element = document.querySelector(selector);

        /*
         * Caso o elemento não exista na página,
         * não precisamos continuar.
         */
        if (!element) {
            return;
        }

        try {

            const response = await fetch(`${root}/${file}`);

            if (!response.ok) {
                throw new Error(
                    `Erro ao carregar ${file}: ${response.status}`
                );
            }

            const html = await response.text();

            element.innerHTML = html;

        } catch (error) {

            console.error(
                `Não foi possível carregar o componente "${file}".`,
                error
            );

        }
    }


    /*
     * =========================================================
     * CARREGA NAVBAR E FOOTER
     * =========================================================
     */

    await Promise.all([
        loadComponent(
            "#navbar-component",
            "components/navbar.html"
        ),

        loadComponent(
            "#footer-component",
            "components/footer.html"
        )
    ]);


    /*
     * =========================================================
     * CORRIGE OS LINKS DOS COMPONENTES
     * =========================================================
     *
     * Os componentes utilizam data-link para que funcionem
     * tanto na página inicial quanto nas páginas internas.
     */

    document
        .querySelectorAll("[data-link]")
        .forEach(link => {

            const destination = link.dataset.link;

            if (!destination) {
                return;
            }

            link.href = `${root}/${destination}`;

        });


    /*
     * =========================================================
     * DEFINE A PÁGINA ATUAL
     * =========================================================
     */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop() || "index.html";


    /*
     * =========================================================
     * LINK ATIVO
     * =========================================================
     *
     * Verifica:
     *
     * - links principais da navbar;
     * - links do dropdown Explorar;
     * - links do footer.
     */

    const navigationLinks =
        document.querySelectorAll(
            "#navbar-component .nav-link[data-link], " +
            "#navbar-component .dropdown-item[data-link], " +
            "#footer-component [data-link]"
        );


    navigationLinks.forEach(link => {

        const destination = link.dataset.link;

        if (!destination) {
            return;
        }

        const linkPage =
            destination
            .split("/")
            .pop();


        /*
         * Página atual encontrada.
         */
        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );


            /*
             * =================================================
             * DROPDOWN EXPLORAR
             * =================================================
             *
             * Caso o link ativo esteja dentro de um dropdown,
             * também destaca o botão pai.
             *
             * Exemplo:
             *
             * impacto.html
             *
             * Impacto  -> ativo
             * Explorar -> ativo
             */

            const dropdown =
                link.closest(".dropdown");


            if (dropdown) {

                const dropdownToggle =
                    dropdown.querySelector(
                        ".dropdown-toggle"
                    );


                if (dropdownToggle) {

                    dropdownToggle.classList.add(
                        "active"
                    );

                }
            }
        }
    });


    /*
     * =========================================================
     * FECHA O MENU MOBILE APÓS NAVEGAÇÃO
     * =========================================================
     *
     * Normalmente a nova página já fecha o offcanvas.
     * Esta rotina também cobre situações em que um link
     * seja utilizado sem recarregamento completo.
     */

    setupMobileNavigation();


    /*
     * =========================================================
     * COMPORTAMENTO DA NAVBAR DURANTE O SCROLL
     * =========================================================
     */

    setupNavbarScroll();

});


/*
 * =============================================================
 * MENU MOBILE
 * =============================================================
 */

function setupMobileNavigation() {

    const offcanvasElement =
        document.querySelector(
            "#navbar-component #menuPrincipal"
        );


    /*
     * Se não existir offcanvas nesta navbar,
     * não há nada para configurar.
     */
    if (!offcanvasElement) {
        return;
    }


    const links =
        offcanvasElement.querySelectorAll(
            "a[data-link]"
        );


    links.forEach(link => {

        link.addEventListener("click", () => {

            /*
             * Bootstrap pode não estar disponível
             * em alguma página por erro de carregamento.
             */
            if (
                typeof bootstrap === "undefined" ||
                !bootstrap.Offcanvas
            ) {
                return;
            }


            /*
             * Só precisamos fechar manualmente
             * quando estivermos no modo mobile.
             */
            if (window.innerWidth >= 992) {
                return;
            }


            const instance =
                bootstrap.Offcanvas.getInstance(
                    offcanvasElement
                );


            if (instance) {
                instance.hide();
            }

        });

    });

}

/*
 * =============================================================
 * NAVBAR DURANTE O SCROLL
 * =============================================================
 */

function setupNavbarScroll() {

    const navbar =
        document.querySelector(
            "#navbar-component .navbar"
        );


    /*
     * Caso a navbar não tenha sido carregada.
     */
    if (!navbar) {
        return;
    }


    /*
     * Verifica a posição da página e altera
     * a apresentação da navbar.
     */
    function updateNavbar() {

        if (window.scrollY > 60) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }


    /*
     * Executa durante a rolagem.
     */
    window.addEventListener(
        "scroll",
        updateNavbar, {
            passive: true
        }
    );


    /*
     * Executa também assim que a navbar
     * terminar de ser carregada.
     */
    updateNavbar();

}