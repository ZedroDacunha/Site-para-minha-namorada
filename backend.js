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
    // 1. Pequena explosão de coraçõezinhos comemorando o clique
    explodirCoracoes(document.getElementById("botao"));

    // 2. Esconde o botão
    document.getElementById("botao").style.display = "none";

    // 3. Pega a caixa da mensagem
    const caixaMensagem = document.getElementById("mensagemTempo");

    // 4. Deixa ela visível no display e adiciona a classe com a animação
    caixaMensagem.style.display = "block";

    // Pequeno truque para o navegador processar o 'display: block' antes da animação
    setTimeout(function() {
        caixaMensagem.classList.add("mostrar");
    }, 10);

    // 5. Atualiza e inicia o relógio
    atualizarTempo();
    setInterval(atualizarTempo, 1000);
}

function explodirCoracoes(origemElemento) {
    const rect = origemElemento.getBoundingClientRect();
    const quantidade = 12;

    for (let i = 0; i < quantidade; i++) {
        const coracao = document.createElement("span");
        coracao.className = "coracao-confete";
        coracao.textContent = "❤";

        const desvioX = (Math.random() - 0.5) * 200;
        const duracao = 0.9 + Math.random() * 0.6;
        const tamanho = 12 + Math.random() * 14;

        coracao.style.left = `${rect.left + rect.width / 2}px`;
        coracao.style.top = `${rect.top}px`;
        coracao.style.fontSize = `${tamanho}px`;
        coracao.style.setProperty("--desvio-x", `${desvioX}px`);
        coracao.style.setProperty("--duracao", `${duracao}s`);

        document.body.appendChild(coracao);
        coracao.addEventListener("animationend", () => coracao.remove());
    }
}

function voltarinicio(){
    const caixaMensagem = document.getElementById("mensagemTempo");
    caixaMensagem.classList.remove("mostrar");
    caixaMensagem.style.display = "none"

    document.getElementById("botao").style.display = "";
}

// Rastro de coraçõezinhos seguindo o mouse — só na tela
// inicial, e só em dispositivos com mouse de verdade.
const inicioSecao = document.getElementById("inicio");
let ultimoRastro = 0;

if (
    inicioSecao &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
    inicioSecao.addEventListener("mousemove", (evento) => {
        const agora = Date.now();
        if (agora - ultimoRastro < 90) {
            return;
        }
        ultimoRastro = agora;

        const coracao = document.createElement("span");
        coracao.className = "coracao-rastro";
        coracao.textContent = "❤";
        coracao.style.left = `${evento.clientX}px`;
        coracao.style.top = `${evento.clientY}px`;

        document.body.appendChild(coracao);
        coracao.addEventListener("animationend", () => coracao.remove());
    });
}
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

// Transição sutil de cor do fundo conforme rola a página:
// começa no vinho escuro original e vai clareando levemente
// até chegar na playlist.
const corFundoInicio = { r: 68, g: 0, b: 0 };    // #440000
const corFundoFim = { r: 122, g: 16, b: 48 };     // tom um pouco mais claro

function atualizarCorFundo() {
    const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaRolavel > 0 ? Math.min(window.scrollY / alturaRolavel, 1) : 0;

    const r = Math.round(corFundoInicio.r + (corFundoFim.r - corFundoInicio.r) * progresso);
    const g = Math.round(corFundoInicio.g + (corFundoFim.g - corFundoInicio.g) * progresso);
    const b = Math.round(corFundoInicio.b + (corFundoFim.b - corFundoInicio.b) * progresso);

    document.documentElement.style.setProperty("--cor-fundo-scroll", `rgb(${r}, ${g}, ${b})`);
}

window.addEventListener("scroll", atualizarCorFundo);
atualizarCorFundo();

// Parallax leve nas fotos da galeria: cada foto se desloca
// um pouco dentro do próprio quadro conforme passa pela tela,
// dando uma sensação de profundidade.
const fotosParallax = Array.from(document.querySelectorAll(".foto-item img"));
const semAnimacoes = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function atualizarParallax() {
    const alturaJanela = window.innerHeight;

    fotosParallax.forEach((img) => {
        const retangulo = img.closest(".foto-item").getBoundingClientRect();
        const centroFoto = retangulo.top + retangulo.height / 2;
        const distanciaDoCentro = centroFoto - alturaJanela / 2;
        const deslocamento = distanciaDoCentro * 0.08;

        img.style.setProperty("--parallax-y", `${deslocamento}px`);
    });
}

if (!semAnimacoes && fotosParallax.length > 0) {
    window.addEventListener("scroll", atualizarParallax);
    window.addEventListener("resize", atualizarParallax);
    atualizarParallax();
}

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
const botaoPausarSlideshow = document.getElementById("lightbox-pausar");
const botaoSlideshow = document.getElementById("botaoSlideshow");

let indiceSlideshow = 0;
let intervaloSlideshow = null;

function abrirLightbox(src, legenda) {
    lightboxImg.src = src;
    lightboxImg.alt = legenda;
    lightboxLegenda.textContent = legenda;
    lightbox.classList.add("aberto");
}

function fecharLightbox() {
    lightbox.classList.remove("aberto");
    lightboxImg.src = "";
    pararSlideshow();
}

document.querySelectorAll(".foto-item img").forEach((img) => {
    img.addEventListener("click", () => {
        if (img.closest(".foto-item").classList.contains("foto-quebrada")) {
            return;
        }
        abrirLightbox(img.src, img.alt);
    });
    img.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            if (img.closest(".foto-item").classList.contains("foto-quebrada")) {
                return;
            }
            abrirLightbox(img.src, img.alt);
        }
    });
    // Se a foto não carregar (caminho errado, arquivo faltando),
    // mostra um preenchimento bonito no lugar do ícone quebrado
    // do navegador.
    img.addEventListener("error", () => {
        img.closest(".foto-item").classList.add("foto-quebrada");
    });
    // Marca a foto como carregada, escondendo o coração
    // pulsante usado como estado de carregamento.
    if (img.complete && img.naturalWidth > 0) {
        img.closest(".foto-item").classList.add("carregada");
    } else {
        img.addEventListener("load", () => {
            img.closest(".foto-item").classList.add("carregada");
        });
    }
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

// Modo apresentação: passa pelas fotos da galeria
// automaticamente, com um botão de pausar/continuar.
const imagensGaleria = Array.from(document.querySelectorAll(".foto-item img"));

function mostrarSlideAtual() {
    const img = imagensGaleria[indiceSlideshow];
    abrirLightbox(img.src, img.alt);
}

function avancarSlide() {
    indiceSlideshow = (indiceSlideshow + 1) % imagensGaleria.length;
    mostrarSlideAtual();
}

function iniciarSlideshow() {
    if (imagensGaleria.length === 0) {
        return;
    }
    indiceSlideshow = 0;
    mostrarSlideAtual();
    botaoPausarSlideshow.hidden = false;
    botaoPausarSlideshow.textContent = "❚❚ Pausar";
    intervaloSlideshow = setInterval(avancarSlide, 3500);
}

function pararSlideshow() {
    if (intervaloSlideshow) {
        clearInterval(intervaloSlideshow);
        intervaloSlideshow = null;
    }
    botaoPausarSlideshow.hidden = true;
}

if (botaoSlideshow) {
    botaoSlideshow.addEventListener("click", iniciarSlideshow);
}

if (botaoPausarSlideshow) {
    botaoPausarSlideshow.addEventListener("click", () => {
        if (intervaloSlideshow) {
            clearInterval(intervaloSlideshow);
            intervaloSlideshow = null;
            botaoPausarSlideshow.textContent = "▶ Continuar";
        } else {
            intervaloSlideshow = setInterval(avancarSlide, 3500);
            botaoPausarSlideshow.textContent = "❚❚ Pausar";
        }
    });
}

// Botão "copiar link do site" no rodapé.
const botaoCompartilhar = document.getElementById("botaoCompartilhar");

botaoCompartilhar.addEventListener("click", () => {
    const textoOriginal = botaoCompartilhar.textContent;

    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            botaoCompartilhar.textContent = "Link copiado! ❤";
        })
        .catch(() => {
            botaoCompartilhar.textContent = "Não foi possível copiar";
        })
        .finally(() => {
            setTimeout(() => {
                botaoCompartilhar.textContent = textoOriginal;
            }, 2000);
        });
});