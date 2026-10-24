
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

