
document.addEventListener("DOMContentLoaded", function () {

    const botaoTema = document.getElementById("alternarTema");

    // Atualiza o ano do rodapé
    const ano = document.getElementById("year");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    if (!botaoTema) {
        console.error("Botão de tema não encontrado no HTML.");
        return;
    }

    // Recupera o tema salvo
    const temaSalvo = localStorage.getItem("tema");

    function atualizarTema(tema) {

        const escuro = tema === "escuro";

        document.body.classList.toggle("tema-escuro", escuro);

        botaoTema.textContent = escuro
            ? "☀️ Tema claro"
            : "🌙 Tema escuro";

        botaoTema.setAttribute("aria-pressed", String(escuro));
    }

    // Aplica a preferência salva
    atualizarTema(temaSalvo);

    // Alterna entre os temas
    botaoTema.addEventListener("click", function () {

        const escuro = document.body.classList.contains("tema-escuro");

        const novoTema = escuro ? "claro" : "escuro";

        atualizarTema(novoTema);

        localStorage.setItem("tema", novoTema);

    });

});




/* ==========================================
   VALIDAÇÃO DO FORMULÁRIO - CP3
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formCadastro");

    // Evita erros nas páginas que não têm formulário
    if (!formulario) return;

    const mensagem = document.getElementById("mensagemFormulario");

    const campos = [
        "nome",
        "email",
        "telefone",
        "data",
        "senha",
        "confirmar-senha"
    ];

    function mostrarErro(campo, texto) {
        const elemento = document.getElementById(campo);
        const erro = document.getElementById("erro-" + campo);

        erro.textContent = texto;
        elemento.setAttribute("aria-invalid", "true");
        elemento.setAttribute("aria-describedby", erro.id);
    }

    function limparErros() {
        campos.forEach(function (campo) {
            const elemento = document.getElementById(campo);
            const erro = document.getElementById("erro-" + campo);

            erro.textContent = "";
            elemento.removeAttribute("aria-invalid");
            elemento.removeAttribute("aria-describedby");
        });

        mensagem.textContent = "";
        mensagem.className = "mensagem-formulario";
    }

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();
        limparErros();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const data = document.getElementById("data").value;
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;

        let valido = true;
        let primeiroErro = null;

        function invalidar(campo, texto) {
            mostrarErro(campo, texto);
            valido = false;

            if (!primeiroErro) {
                primeiroErro = document.getElementById(campo);
            }
        }

        // Nome
        if (nome.length < 3) {
            invalidar("nome", "Informe um nome com pelo menos 3 caracteres.");
        }

        // E-mail
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email)) {
            invalidar("email", "Informe um e-mail válido.");
        }

        // Telefone: exatamente 11 números
        if (!/^\d{11}$/.test(telefone)) {
            invalidar("telefone", "Digite 11 números, incluindo o DDD.");
        }

        // Data de nascimento
        const nascimento = new Date(data + "T12:00:00");
        const hoje = new Date();

        if (
            !data ||
            Number.isNaN(nascimento.getTime()) ||
            nascimento > hoje
        ) {
            invalidar("data", "Informe uma data de nascimento válida.");
        }

        // Senha
        const senhaValida =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(senha);

        if (!senhaValida) {
            invalidar(
                "senha",
                "Use 8 caracteres ou mais, com letra, número e símbolo."
            );
        }

        // Confirmação da senha
        if (!confirmar || senha !== confirmar) {
            invalidar("confirmar-senha", "As senhas não coincidem.");
        }

        // Resultado da validação
        if (valido) {
            mensagem.textContent =
                "✓ Dados validados com sucesso! Este é um formulário demonstrativo; nenhum cadastro foi enviado.";

            mensagem.classList.add("sucesso");

            formulario.reset();

        } else {
            mensagem.textContent =
                "Existem campos com erros. Confira as mensagens abaixo de cada campo.";

            mensagem.classList.add("erro");

            primeiroErro.focus();
        }

    });

});
