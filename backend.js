// Defina a data exata do início do namoro: (Ano, Mês, Dia, Hora, Minuto, Segundo)
// ATENÇÃO: No JavaScript, os meses começam em 0! Janeiro é 0, Fevereiro é 1... e Novembro é 10.
const dataInicio = new Date(2021, 10, 12, 15, 40, 10);

function atualizarTempo() {
    const agora = new Date();

    // Calcula a diferença em milissegundos entre agora e a data de início
    const diferencaMilissegundos = agora - dataInicio;

    // Transforma os milissegundos em segundos totais
    const segundosTotais = Math.floor(diferencaMilissegundos / 1000);

    // Matemática para separar dias, horas, minutos e segundos
    const dias = Math.floor(segundosTotais / (3600 * 24));
    const restoDoDia = segundosTotais % (3600 * 24);

    const horas = Math.floor(restoDoDia / 3600);
    const minutos = Math.floor((restoDoDia % 3600) / 60);
    const segundos = restoDoDia % 60;

    // Coloca um "0" na frente se o número for menor que 10 (ex: 9 vira 09)
    const horasFormat = String(horas).padStart(2, '0');
    const minutosFormat = String(minutos).padStart(2, '0');
    const segundosFormat = String(segundos).padStart(2, '0');

    // Manda o texto formatado para dentro da div com o id "tempo" no HTML
    document.getElementById("tempo").innerHTML =
        `${dias} dias<br>${horasFormat} horas ${minutosFormat} minutos ${segundosFormat} segundos`;
}

function iniciarSurpresa() {
    // 1. Esconde o botão
    document.getElementById("botao").style.display = "none";

    // 2. Pega a caixa da mensagem
    const caixaMensagem = document.getElementById("mensagemTempo");

    // 3. Deixa ela visível no display e adiciona a classe com a animação
    caixaMensagem.style.display = "block";

    // Pequeno truque para o navegador processar o 'display: block' antes da animação
    setTimeout(function() {
        caixaMensagem.classList.add("mostrar");
    }, 10);

    // 4. Atualiza e inicia o relógio
    atualizarTempo();
    setInterval(atualizarTempo, 1000);
}

function voltarinicio(){
    const caixaMensagem = document.getElementById("mensagemTempo");
    caixaMensagem.classList.remove("mostrar");
    caixaMensagem.style.display = "none"

    document.getElementById("botao").style.display = "";
}

// Revelação suave das seções (fade + leve deslize) conforme
// elas entram na tela ao rolar a página.
const secoesReveal = document.querySelectorAll(".reveal");

const observadorReveal = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observadorReveal.unobserve(entrada.target);
        }
    });
}, { threshold: 0.2 });

secoesReveal.forEach((secao) => observadorReveal.observe(secao));

// Botão flutuante de "voltar ao topo": aparece depois de
// rolar um pouco a página e some quando está perto do topo.
const botaoTopo = document.getElementById("botaoTopo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Lightbox: clicar (ou apertar Enter/espaço) numa foto da
// galeria abre ela em destaque, com a legenda embaixo.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxLegenda = document.getElementById("lightbox-legenda");
const botaoFecharLightbox = document.querySelector(".lightbox-fechar");

function abrirLightbox(src, legenda) {
    lightboxImg.src = src;
    lightboxImg.alt = legenda;
    lightboxLegenda.textContent = legenda;
    lightbox.classList.add("aberto");
}

function fecharLightbox() {
    lightbox.classList.remove("aberto");
    lightboxImg.src = "";
}

document.querySelectorAll(".foto-item img").forEach((img) => {
    img.addEventListener("click", () => abrirLightbox(img.src, img.alt));
    img.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirLightbox(img.src, img.alt);
        }
    });
});

botaoFecharLightbox.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) {
        fecharLightbox();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        fecharLightbox();
    }
});