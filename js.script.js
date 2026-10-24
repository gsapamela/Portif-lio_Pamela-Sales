
document.addEventListener("DOMContentLoaded", () => {

    // Atualiza automaticamente o ano no rodapé
    const ano = document.getElementById("year");
    ano.textContent = new Date().getFullYear();

    // Seleciona o botão de tema
    const botaoTema = document.getElementById("alternarTema");

    // Recupera a preferência salva no navegador
    const temaSalvo = localStorage.getItem("tema") || "claro";

    // Aplica o tema escolhido
    function aplicarTema(tema) {

        const escuro = tema === "escuro";

        document.body.classList.toggle("tema-escuro", escuro);

        // Atualiza o texto do botão
        botaoTema.textContent = escuro
            ? "☀️ Tema claro"
            : "🌙 Tema escuro";

        botaoTema.setAttribute(
            "aria-label",
            escuro ? "Ativar tema claro" : "Ativar tema escuro"
        );

        botaoTema.setAttribute("aria-pressed", String(escuro));
    }

    // Aplica o tema salvo quando a página abre
    aplicarTema(temaSalvo);

    // Alterna o tema quando o botão é clicado
    botaoTema.addEventListener("click", () => {

        const temaAtual = document.body.classList.contains("tema-escuro");

        const novoTema = temaAtual ? "claro" : "escuro";

        aplicarTema(novoTema);

        // Salva a preferência do visitante
        localStorage.setItem("tema", novoTema);
    });

});
