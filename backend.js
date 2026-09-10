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