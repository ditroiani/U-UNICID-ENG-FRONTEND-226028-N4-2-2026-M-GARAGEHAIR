// Validação do formulário demonstrativo. Não transmite nem armazena dados pessoais.
(() => {
    const form = document.querySelector("#formContato");
    if (!form) return;

    const ids = ["nome", "sobrenome", "email", "telefone", "assunto", "retornoEmail", "mensagem", "privacidade"];
    const fields = ids.map(id => form.querySelector(`#${id}`));
    const [nome, sobrenome, email, telefone, assunto, preferencia, mensagem, privacidade] = fields;
    const preferences = [...form.querySelectorAll('[name="preferencia"]')];
    const summary = document.querySelector("#errosFormulario");
    const confirmation = document.querySelector("#mensagemSucesso");
    const counter = document.querySelector("#contadorMensagem");
    const phoneRequired = document.querySelector("#telefone-obrigatorio");
    const touched = new Set();
    let submitted = false;

    // Usa as restrições HTML, mas apresenta os erros junto aos campos.
    // O botão só é liberado após registrar os eventos, pois não há serviço de envio.
    form.noValidate = true;

    const validDDDs = new Set((
        "11 12 13 14 15 16 17 18 19 21 22 24 27 28 " +
        "31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 " +
        "51 53 54 55 61 62 63 64 65 66 67 68 69 " +
        "71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99"
    ).split(" "));

    function phoneDigits(value) {
        const raw = value.trim();
        if (!/^\+?[\d\s().-]+$/u.test(raw)) return "";
        let digits = raw.replace(/\D/g, "");
        if (raw.startsWith("+") && !digits.startsWith("55")) return "";
        if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
            digits = digits.slice(2);
        } else if (raw.startsWith("+")) {
            return "";
        }
        return digits;
    }

    function nameError(field) {
        const value = field.value.trim();
        if (!value) return "Preencha este campo com seu nome.";
        if (value.length > 80) return "Use no máximo 80 caracteres.";
        // Letras Unicode preservam nomes com acentos e de diferentes idiomas.
        if (!/\p{L}/u.test(value) || !/^[\p{L}\p{M}\s.'’ʼ-]+$/u.test(value)) {
            return "Use letras, espaços, hífens, apóstrofos ou pontos de iniciais.";
        }
        return "";
    }

    function validate() {
        fields.forEach(field => field.setCustomValidity(""));
        const selected = form.querySelector('[name="preferencia"]:checked')?.value;
        telefone.required = selected === "telefone" || selected === "whatsapp";
        phoneRequired.hidden = !telefone.required;
        counter.textContent = mensagem.value.length.toString();

        const errors = new Map();
        errors.set(nome, nameError(nome));
        errors.set(sobrenome, nameError(sobrenome));
        errors.set(email, !email.value.trim() ? "Informe seu e-mail." :
            email.validity.typeMismatch ? "Informe um e-mail válido, como nome@exemplo.com." :
            email.value.length > 254 ? "Use no máximo 254 caracteres no e-mail." : "");

        const phone = phoneDigits(telefone.value);
        let phoneError = "";
        if (!telefone.value.trim()) {
            if (telefone.required) phoneError = "Informe seu telefone com DDD para esta forma de retorno.";
        } else if (!validDDDs.has(phone.slice(0, 2)) ||
            !(/^[2-5]\d{7}$/.test(phone.slice(2)) || /^9\d{8}$/.test(phone.slice(2)))) {
            phoneError = "Informe um telefone brasileiro com DDD: (11) 3456-7890 ou (11) 91234-5678.";
        } else if (selected === "whatsapp" && phone.length !== 11) {
            phoneError = "Para retorno por WhatsApp, informe um celular com DDD e 9 dígitos.";
        }
        errors.set(telefone, phoneError);

        const subjects = [...assunto.options].filter(option => !option.disabled).map(option => option.value);
        errors.set(assunto, assunto.value && subjects.includes(assunto.value) ? "" : "Escolha um assunto da lista.");
        errors.set(preferencia, ["email", "telefone", "whatsapp"].includes(selected) ? "" : "Escolha como deseja receber o retorno.");
        errors.set(mensagem, mensagem.value.trim().length < 10 ? "Escreva uma mensagem com pelo menos 10 caracteres, sem contar espaços nas extremidades." :
            mensagem.value.length > 1000 ? "A mensagem deve ter no máximo 1.000 caracteres." : "");
        errors.set(privacidade, privacidade.checked ? "" : "Marque a autorização de uso das informações para continuar.");

        errors.forEach((error, field) => {
            const suffix = field === preferencia ? "preferencia" : field.id;
            const feedback = document.querySelector(`#erro-${suffix}`);
            field.setCustomValidity(error);
            const showError = Boolean(error) && (submitted || touched.has(field));
            field.classList.toggle("is-invalid", showError);
            field.setAttribute("aria-invalid", showError.toString());
            feedback.textContent = error;
            // O feedback da preferência fica fora da grade dos rádios.
            if (field === preferencia) {
                feedback.classList.toggle("d-block", showError);
                preferences.forEach(radio => radio.setAttribute("aria-invalid", showError.toString()));
            }
        });
        return fields.filter(field => !field.validity.valid);
    }

    form.addEventListener("focusout", event => {
        if (!fields.includes(event.target)) return;
        touched.add(event.target);
        if ([nome, sobrenome, email, telefone].includes(event.target)) {
            event.target.value = event.target.value.trim();
        }
        validate();
    });

    function handleEdit(event) {
        confirmation.classList.add("d-none");
        // Trocar a preferência também revalida a exigência de telefone.
        if (preferences.includes(event.target)) touched.add(telefone);
        const invalid = validate();
        if (!invalid.length) summary.classList.add("d-none");
    }
    form.addEventListener("input", handleEdit);
    form.addEventListener("change", handleEdit);

    form.addEventListener("submit", event => {
        // Ainda não existe endpoint de envio: evita recarga e exposição dos dados na URL.
        event.preventDefault();
        submitted = true;
        confirmation.classList.add("d-none");
        const invalid = validate();
        if (invalid.length) {
            summary.textContent = "Revise os campos indicados antes de continuar. Nenhuma mensagem foi enviada.";
            summary.classList.remove("d-none");
            invalid[0].focus();
            return;
        }
        summary.classList.add("d-none");
        confirmation.classList.remove("d-none");
        confirmation.focus();
    });

    validate();
    form.querySelector("#validar-contato").disabled = false;
})();
