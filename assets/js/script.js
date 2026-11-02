// Pausa dos carrosséis pelo teclado, pelo mouse e pela preferência de movimentos.
(() => {
    if (!window.bootstrap?.Carousel) return;
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = () => root.classList.contains("reduced-motion") ||
        (preference.matches && !root.classList.contains("motion-allowed"));
    const updates = [];

    document.querySelectorAll("[data-carousel-pause]").forEach(button => {
        const carousel = button.closest(".carousel");
        if (!carousel) return;
        const instance = window.bootstrap.Carousel.getOrCreateInstance(carousel);
        let paused = false;
        let focused = carousel.contains(document.activeElement);
        let hovered = false;

        function update() {
            const reduced = reducedMotion();
            if (paused || focused || hovered || reduced || document.hidden) instance.pause();
            else instance.cycle();
            button.disabled = reduced;
            button.textContent = reduced ? "Slides pausados" : paused ? "Retomar slides" : "Pausar slides";
        }

        button.addEventListener("click", () => { paused = !paused; update(); });
        carousel.addEventListener("focusin", () => { focused = true; update(); });
        carousel.addEventListener("focusout", event => {
            focused = carousel.contains(event.relatedTarget);
            update();
        });
        carousel.addEventListener("mouseenter", () => { hovered = true; update(); });
        carousel.addEventListener("mouseleave", () => { hovered = false; update(); });
        updates.push(update);
        update();
    });

    if (!updates.length) return;
    const updateAll = () => updates.forEach(update => update());
    preference.addEventListener("change", updateAll);
    document.addEventListener("visibilitychange", updateAll);
    new MutationObserver(updateAll).observe(root, { attributes: true, attributeFilter: ["class"] });
})();

// Entradas suaves opcionais. Não oculta conteúdo antes de observar a página.
(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = () => root.classList.contains("reduced-motion") ||
        (preference.matches && !root.classList.contains("motion-allowed"));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (!reducedMotion()) entry.target.classList.add("reveal-enter");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    elements.forEach(element => observer.observe(element));

    function stopAnimations() {
        if (reducedMotion()) {
            elements.forEach(element => element.classList.remove("reveal-enter"));
        }
    }
    preference.addEventListener("change", stopAnimations);
    new MutationObserver(stopAnimations).observe(root, {
        attributes: true,
        attributeFilter: ["class"]
    });
})();
