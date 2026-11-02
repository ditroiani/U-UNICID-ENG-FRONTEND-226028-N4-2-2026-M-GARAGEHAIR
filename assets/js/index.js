// Animações da página inicial, sem dependências e com valores estáticos de reserva.
(() => {
    const home = document.querySelector(".home-page");
    if (!home || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = () => root.classList.contains("reduced-motion") ||
        (motionPreference.matches && !root.classList.contains("motion-allowed"));
    const counters = [...home.querySelectorAll("[data-counter]")];
    const formatter = new Intl.NumberFormat("pt-BR");
    let frame = null;
    let started = false;

    function renderCounters(progress) {
        counters.forEach(counter => {
            const value = Math.round(Number(counter.dataset.counter) * progress);
            counter.textContent = formatter.format(value) + (counter.dataset.suffix || "");
        });
    }

    function finishCounters() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        renderCounters(1);
    }

    function startCounters() {
        if (started) return;
        started = true;
        if (reduceMotion()) return finishCounters();

        let start;
        function tick(time) {
            if (reduceMotion()) return finishCounters();
            start ??= time;
            const progress = Math.min((time - start) / 1200, 1);
            renderCounters(1 - Math.pow(1 - progress, 3));
            frame = progress < 1 ? requestAnimationFrame(tick) : null;
        }
        frame = requestAnimationFrame(tick);
    }

    const results = home.querySelector("#impacto .row");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (!reduceMotion()) entry.target.classList.add("home-reveal");
            if (entry.target === results) startCounters();
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    home.querySelectorAll("#proposta article, #iniciativas article, #produtos .col-lg-6, #acessibilidade .col-lg-6, #cta .container").forEach(element => observer.observe(element));
    if (results) observer.observe(results);

    // Uma preferência alterada durante a contagem encerra a animação imediatamente.
    function handleMotionChange() {
        if (reduceMotion() && frame !== null) finishCounters();
    }
    new MutationObserver(handleMotionChange).observe(root, {
        attributes: true,
        attributeFilter: ["class"]
    });
    motionPreference.addEventListener("change", handleMotionChange);
})();
