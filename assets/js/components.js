document.addEventListener("DOMContentLoaded", async () => {

    /*
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
     * Função responsável por carregar
     * um componente HTML.
     */

    async function loadComponent(selector, file) {
        const element = document.querySelector(selector);

        // Verifica se existe elemento
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
            console.error(error);
        }

    }


    /*
     * Carrega navbar e footer.
     */
    await Promise.all([
        loadComponent("#navbar-component", "components/navbar.html"),
        loadComponent("#footer-component", "components/footer.html")
    ]);

    /*
     * Corrige os links dos componentes.
     */
    document.querySelectorAll("[data-link]").forEach(link => {
        const destination = link.dataset.link;
        link.href = `${root}/${destination}`;
    });


    /*
     * Define o link ativo da navbar e footer.
     */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(
        "#navbar-component .nav-link[data-link], " +
        "#footer-component [data-link]"
    ).forEach(link => {
        const linkPage =
            link.dataset.link.split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });

    setupNavbarScroll();
});

/*
 * Controla o comportamento da navbar
 * durante a rolagem da página.
 */
function setupNavbarScroll() {
    const navbar =
        document.querySelector("#navbar-component .navbar");
    // Caso a navbar não tenha sido carregada.
    if (!navbar) {
        return;
    }

    /*
     * Verifica a posição da página, toda vez que houver rolagem, e adiciona ou remove
     */
    function updateNavbar() {
        if (window.scrollY > 60) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }


    /*
     * Verifica sempre que houver rolagem.
     */
    window.addEventListener("scroll", updateNavbar);
    /*
     * Executa uma vez assim que a navbar
     * terminar de ser carregada.
     */

    updateNavbar();
}