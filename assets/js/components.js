document.addEventListener("DOMContentLoaded", async () => {
    /*
     * Raiz do projeto
     * Descobre qual é o caminho até a raiz do projeto.
     * index.html:
     * <body data-root=".">
     * pages/sobre.html:
     * <body data-root="..">
     */
    const root = document.body.dataset.root || ".";

    // Carregamento dos componentes
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

    // Carrega navbar e footer
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
     * Corrige os links dos componentes
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

    // Define a página atual
    const currentPage =
    window.location.pathname
    .split("/")
    .pop() || "index.html";

    /*
     * Link ativo
     * Verifica:
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

        // Página atual encontrada.
        if (linkPage === currentPage) {
            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

            /*
             * Dropdown explorar
             * Caso o link ativo esteja dentro de um dropdown,
             * também destaca o botão pai.
             * Exemplo:
             * impacto.html
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
     * Fecha o menu mobile após navegação
     * Normalmente a nova página já fecha o offcanvas.
     * Esta rotina também cobre situações em que um link
     * seja utilizado sem recarregamento completo.
     */
    setupMobileNavigation();
    setupAccessibilityKeyboard();

    // Comportamento da navbar durante o scroll
    setupNavbarScroll();
});

// O painel contém vários controles, então Tab segue a ordem natural.
// As setas são um complemento; Esc continua sob responsabilidade do Bootstrap.
function setupAccessibilityKeyboard() {
    const menu = document.querySelector("#navbar-component .accessibility-menu");
    if (!menu) return;

    const toggle = menu.querySelector("#dropdownAcessibilidade");
    const panel = menu.querySelector(".accessibility-dropdown");
    if (!toggle || !panel) return;

    menu.addEventListener("keydown", event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        if (event.target.matches("input, textarea, select, [contenteditable='true']")) return;

        const onToggle = event.target === toggle;
        if (onToggle && !["ArrowDown", "ArrowUp"].includes(event.key)) return;
        if (!onToggle && !panel.contains(event.target)) return;
        if (!window.bootstrap?.Dropdown) return;

        window.bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        const controls = [...panel.querySelectorAll("button:not(:disabled), a[href]")]
        .filter(control => control.getClientRects().length > 0);
        if (!controls.length) return;

        event.preventDefault();
        event.stopPropagation();
        const current = controls.indexOf(document.activeElement);
        let next;
        if (event.key === "Home") next = 0;
        else if (event.key === "End") next = controls.length - 1;
        else if (onToggle || current < 0) next = event.key === "ArrowUp" ? controls.length - 1 : 0;
        else next = (current + (event.key === "ArrowDown" ? 1 : -1) + controls.length) % controls.length;
        controls[next].focus();
    });
}

// Menu mobile
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

// Navbar durante o scroll
function setupNavbarScroll() {
    const navbar =
    document.querySelector(
        "#navbar-component .navbar"
    );

    // Caso a navbar não tenha sido carregada.
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

    // Executa durante a rolagem.
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
