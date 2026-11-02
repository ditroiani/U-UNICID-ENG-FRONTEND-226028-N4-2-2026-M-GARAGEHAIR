// Garage Hair | Acessibilidade
// Controle global dos recursos de acessibilidade do site
// Configurações
// Chave utilizada para salvar a preferência no navegador
const ACCESSIBILITY_STORAGE_KEY = "garageHairAccessibility";

// Escala mínima e máxima permitida
const MIN_FONT_SCALE = 90;
const MAX_FONT_SCALE = 140;

// Alteração feita a cada clique em A- ou A+
const FONT_STEP = 10;

const VLIBRAS_SCRIPT_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_LOAD_TIMEOUT = 20000;
const systemMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

// Estado padrão
const defaultAccessibilitySettings = {
    fontScale: 100,
    highContrast: false,
    reducedMotion: false,
    followSystemMotion: true,
    librasEnabled: false
};

// Carregar configurações
function loadAccessibilitySettings() {
    try {
        const savedSettings = localStorage.getItem(
            ACCESSIBILITY_STORAGE_KEY
        );

        // Se ainda não existir configuração salva,
        // utiliza os valores padrão.
        if (!savedSettings) {
            return { ...defaultAccessibilitySettings };
        }

        const parsedSettings = JSON.parse(savedSettings);
        const savedScale = parsedSettings?.fontScale;

        return {
            ...defaultAccessibilitySettings,
            ...parsedSettings,
            fontScale: Number.isFinite(savedScale)
            ? Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE,
                Math.round(savedScale / FONT_STEP) * FONT_STEP))
            : defaultAccessibilitySettings.fontScale,
            // Preferências antigas podem não conter o campo de contraste.
            highContrast: parsedSettings?.highContrast === true,
            reducedMotion: parsedSettings?.reducedMotion === true,
            followSystemMotion: parsedSettings?.followSystemMotion !== false,
            librasEnabled: parsedSettings?.librasEnabled === true
        };
    } catch (error) {
        console.warn(
            "Não foi possível carregar as preferências de acessibilidade.",
            error
        );
        return { ...defaultAccessibilitySettings };
    }
}

// Salvar configurações
function saveAccessibilitySettings() {
    try {
        localStorage.setItem(
            ACCESSIBILITY_STORAGE_KEY,
            JSON.stringify(accessibilitySettings)
        );
    } catch (error) {
        console.warn(
            "Não foi possível salvar as preferências de acessibilidade.",
            error
        );
    }
}

// Estado atual
let accessibilitySettings = loadAccessibilitySettings();
let vlibrasLoadPromise = null;
let vlibrasStatus = "idle";
let vlibrasMessage = "";
let vlibrasRequestId = 0;

function applyReducedMotion() {
    const followsSystem = accessibilitySettings.followSystemMotion;
    const enabled = accessibilitySettings.reducedMotion ||
    (followsSystem && systemMotionPreference.matches);
    document.documentElement.classList.toggle("reduced-motion", enabled);
    // Só uma escolha explícita do usuário permite movimentos contra a preferência do sistema.
    document.documentElement.classList.toggle("motion-allowed", !followsSystem && !enabled);
    const button = document.querySelector('[data-accessibility="toggle-motion"]');
    if (button) {
        button.setAttribute("aria-pressed", enabled.toString());
        button.classList.toggle("active", enabled);
    }

    const status = document.querySelector("#motion-status");
    const message = enabled
    ? followsSystem && systemMotionPreference.matches && !accessibilitySettings.reducedMotion
    ? "Movimentos reduzidos pela preferência do dispositivo. Desative esta opção para usar transições suaves neste site."
    : "Movimentos reduzidos neste site."
    : "Transições suaves ativadas neste site.";
    if (status && status.textContent !== message) {
        status.textContent = message;
    }
}

systemMotionPreference.addEventListener("change", applyReducedMotion);

function resetAccessibilitySettings() {
    accessibilitySettings = { ...defaultAccessibilitySettings };
    disableVLibras();
    applyFontScale();
    applyHighContrast();
    applyReducedMotion();
    saveAccessibilitySettings();

    const status = document.querySelector("#accessibility-status");
    if (status) {
        status.textContent = "Configurações restauradas: texto em 100%, alto contraste e VLibras desativados. Movimentos seguem a preferência do dispositivo.";
    }
}

// Aplicar tamanho do texto
function applyFontScale() {
    const scale = accessibilitySettings.fontScale;
    /*
     * Alteramos o font-size do elemento <html>.
     * Como boa parte do site utiliza rem,
     * os textos e componentes baseados nessa unidade
     * acompanham proporcionalmente a alteração.
     */
    document.documentElement.style.fontSize = `${scale}%`;
    updateFontButtons();
}

// Alto contraste
function applyHighContrast() {
    const isActive = accessibilitySettings.highContrast;
    /*
     * Adiciona ou remove a classe no elemento <html>.
     * Isso permite que o CSS altere o visual
     * de todas as páginas do site.
     */
    document.documentElement.classList.toggle(
        "high-contrast",
        isActive
    );

    updateContrastButton();

    // Componentes desenhados em canvas precisam atualizar suas próprias cores.
    document.dispatchEvent(new CustomEvent("garagehair:contrast-change", {
        detail: { highContrast: isActive }
    }));
}

// Atualizar estado dos botões
function updateFontButtons() {
    const fontValue = document.querySelector("[data-font-scale]");
    const percentage = `${accessibilitySettings.fontScale}%`;

    // A navbar é dinâmica. Só alteramos o texto quando o valor mudar,
    // evitando novas notificações desnecessárias do MutationObserver.
    if (fontValue && fontValue.textContent.trim() !== percentage) {
        fontValue.textContent = percentage;
    }

    const decreaseButton = document.querySelector(
        '[data-accessibility="decrease-text"]'
    );

    const increaseButton = document.querySelector(
        '[data-accessibility="increase-text"]'
    );

    // Botão A-
    if (decreaseButton) {
        const reachedMinimum =
        accessibilitySettings.fontScale <= MIN_FONT_SCALE;
        decreaseButton.disabled = reachedMinimum;
        decreaseButton.setAttribute(
            "aria-disabled",
            reachedMinimum.toString()
        );
    }

    // Botão A+
    if (increaseButton) {
        const reachedMaximum =
        accessibilitySettings.fontScale >= MAX_FONT_SCALE;
        increaseButton.disabled = reachedMaximum;
        increaseButton.setAttribute(
            "aria-disabled",
            reachedMaximum.toString()
        );
    }
}

// Estado do botão de contraste
function updateContrastButton() {
    const contrastButton = document.querySelector(
        '[data-accessibility="toggle-contrast"]'
    );

    if (!contrastButton) {
        return;
    }

    const isActive =
    accessibilitySettings.highContrast;

    /*
     * aria-pressed informa para tecnologias assistivas
     * se o botão está ativado ou não.
     */
    contrastButton.setAttribute(
        "aria-pressed",
        isActive.toString()
    );

    // Classe utilizada também para destaque visual.
    contrastButton.classList.toggle(
        "active",
        isActive
    );
}

// Aumentar texto
function increaseFontSize() {
    if (
        accessibilitySettings.fontScale >=
        MAX_FONT_SCALE
    ) {
        return;
    }

    accessibilitySettings.fontScale += FONT_STEP;
    applyFontScale();
    saveAccessibilitySettings();
}

// Diminuir texto
function decreaseFontSize() {
    if (
        accessibilitySettings.fontScale <=
        MIN_FONT_SCALE
    ) {
        return;
    }
    accessibilitySettings.fontScale -= FONT_STEP;
    applyFontScale();
    saveAccessibilitySettings();
}

// Eventos
/*
 * Utilizamos delegação de eventos.
 * Isso é importante neste projeto porque a navbar
 * é carregada posteriormente pelo components.js.
 * Dessa forma, mesmo que o botão ainda não exista
 * quando acessibilidade.js for executado,
 * o clique continuará funcionando.
 */
document.addEventListener("click", function (event) {
    const accessibilityButton = event.target.closest(
        "[data-accessibility]"
    );

    if (!accessibilityButton) {
        return;
    }

    const action =
    accessibilityButton.dataset.accessibility;

    const status = document.querySelector("#accessibility-status");
    if (status) {
        status.textContent = "";
    }

    switch (action) {
        case "increase-text":
        increaseFontSize();
        break;
        case "decrease-text":
        decreaseFontSize();
        break;
        case "toggle-contrast":
        toggleHighContrast();
        break;
        case "toggle-libras":
        toggleVLibras();
        break;
        case "toggle-motion":
        accessibilitySettings.reducedMotion =
        !document.documentElement.classList.contains("reduced-motion");
        accessibilitySettings.followSystemMotion = false;
        applyReducedMotion();
        saveAccessibilitySettings();
        break;
        case "reset":
        resetAccessibilitySettings();
        break;
    }
});

// Ativar / desativar alto contraste
function toggleHighContrast() {
    accessibilitySettings.highContrast =
    !accessibilitySettings.highContrast;

    applyHighContrast();

    saveAccessibilitySettings();
}

// VLibras - carregamento sob demanda
function positionVLibrasButton() {
    // O botão está no shadow DOM oficial; seu contêiner não recebe o CSS do site.
    const access = window.VLibrasWidget?.initBtn?.parentElement;
    if (access) {
        access.style.top = "auto";
        access.style.bottom = "max(1rem, env(safe-area-inset-bottom))";
        access.style.right = "max(1rem, env(safe-area-inset-right))";
    }
}

function loadVLibras() {
    if (window.VLibrasWidget?.initBtn?.isConnected) {
        positionVLibrasButton();
        return Promise.resolve();
    }

    if (vlibrasLoadPromise) {
        return vlibrasLoadPromise;
    }

    vlibrasLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.id = "garage-vlibras-script";
        script.src = VLIBRAS_SCRIPT_URL;
        script.async = true;

        function fail(error) {
            clearTimeout(timeout);
            script.onload = null;
            script.onerror = null;
            script.remove();
            reject(error);
        }

        const timeout = setTimeout(() => {
            fail(new Error("O carregamento do VLibras excedeu o tempo de espera."));
        }, VLIBRAS_LOAD_TIMEOUT);

        script.onerror = () => fail(new Error("Não foi possível carregar o VLibras."));
        script.onload = () => {
            try {
                // A chamada oficial configura e inicializa o widget uma única vez.
                new window.VLibras.Widget({
                    rootPath: "https://vlibras.gov.br/app",
                    position: "R"
                });

                if (!window.VLibrasWidget?.initBtn?.isConnected) {
                    throw new Error("O botão do VLibras não foi inicializado.");
                }

                positionVLibrasButton();
                clearTimeout(timeout);
                resolve();
            } catch (error) {
                fail(error);
            }
        };

        document.body.appendChild(script);
    });

    // Libera uma nova tentativa se houver falha de rede.
    vlibrasLoadPromise.catch(() => {
        vlibrasLoadPromise = null;
    });

    return vlibrasLoadPromise;
}

function updateLibrasButton() {
    const button = document.querySelector('[data-accessibility="toggle-libras"]');
    const status = document.querySelector("#vlibras-status");
    const loading = vlibrasStatus === "loading";
    const enabled = accessibilitySettings.librasEnabled && vlibrasStatus === "ready";

    if (button) {
        button.disabled = loading;
        button.setAttribute("aria-busy", loading.toString());
        button.setAttribute("aria-pressed", enabled.toString());
        button.classList.toggle("active", enabled);
        button.title = loading ? "Carregando VLibras" : enabled ? "Desativar VLibras" : "Ativar VLibras";
    }

    if (status && status.textContent !== vlibrasMessage) {
        status.textContent = vlibrasMessage;
    }
}

async function enableVLibras() {
    const requestId = ++vlibrasRequestId;
    vlibrasStatus = "loading";
    vlibrasMessage = "Carregando VLibras…";
    updateLibrasButton();

    try {
        await loadVLibras();
        // Restaurar ou desativar invalida uma ativação ainda em andamento.
        if (requestId !== vlibrasRequestId) {
            return;
        }
        accessibilitySettings.librasEnabled = true;
        document.documentElement.classList.add("vlibras-enabled");
        vlibrasStatus = "ready";
        vlibrasMessage = "VLibras ativado. Abra o tradutor pelo botão flutuante à direita.";
    } catch (error) {
        if (requestId !== vlibrasRequestId) {
            return;
        }
        accessibilitySettings.librasEnabled = false;
        document.documentElement.classList.remove("vlibras-enabled");
        vlibrasStatus = "error";
        vlibrasMessage = "Não foi possível carregar o VLibras. Verifique sua conexão e tente novamente.";
        console.warn("Falha ao ativar o VLibras.", error);
    }

    saveAccessibilitySettings();
    updateLibrasButton();
}

function toggleVLibras() {
    if (vlibrasStatus === "loading") {
        return;
    }

    if (!accessibilitySettings.librasEnabled) {
        enableVLibras();
        return;
    }

    disableVLibras();
    saveAccessibilitySettings();
}

function disableVLibras() {
    ++vlibrasRequestId;
    accessibilitySettings.librasEnabled = false;
    vlibrasStatus = "idle";
    document.documentElement.classList.remove("vlibras-enabled");

    // O widget oficial observa esse atributo para desativar o painel.
    const widgetRoot = document.querySelector("#vlibras-app-root");
    if (widgetRoot) {
        widgetRoot.dataset.active = "false";
    }

    vlibrasMessage = "VLibras desativado.";
    updateLibrasButton();
}

// Inicialização
function initializeAccessibility() {
    // Aplica imediatamente a preferência salva.
    applyFontScale();
    applyHighContrast();
    applyReducedMotion();
    if (accessibilitySettings.librasEnabled) {
        enableVLibras();
    } else {
        updateLibrasButton();
    }
}

// Executa assim que o HTML principal estiver disponível.
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeAccessibility
    );
} else {
    initializeAccessibility();
}

// Observação da navbar
/*
 * Como a navbar é inserida dinamicamente pelo components.js,
 * observamos alterações no DOM.
 * Assim que os botões A- e A+ forem adicionados,
 * atualizamos automaticamente seus estados.
 */
const accessibilityObserver =
new MutationObserver(function () {
    updateFontButtons();
    updateContrastButton();
    updateLibrasButton();
    applyReducedMotion();
});

const accessibilityNavbar = document.querySelector("#navbar-component");
if (accessibilityNavbar) {
    accessibilityObserver.observe(accessibilityNavbar, {
        childList: true,
        subtree: true
    });
}
