import { perguntas } from "./perguntas.js";
import { aleatorio, nome } from "./aleatorio.js";

// ======================================
// ELEMENTOS DO HTML
// ======================================

const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");
const areaJogo = document.querySelector(".area-jogo");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const etapaAtual = document.querySelector(".etapa-atual");

// ======================================
// VARIÁVEIS DO JOGO
// ======================================

let atual = 0;
let historiaFinal = "";
let jogando = false;

// ======================================
// INICIAR O JOGO
// ======================================

botaoIniciar.addEventListener("click", iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    jogando = true;

    telaInicial.style.display = "none";
    areaJogo.style.display = "block";
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

// ======================================
// MOSTRAR PERGUNTAS E ALTERNATIVAS
// ======================================

function mostraPergunta() {
    if (!jogando) return;

    const pergunta = perguntas[atual];

    if (!pergunta) {
        mostraResultado();
        return;
    }

    caixaPerguntas.textContent = pergunta.enunciado;

    etapaAtual.textContent = `✨ Etapa ${atual + 1} da aventura`;

    caixaAlternativas.innerHTML = "";

    pergunta.alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.classList.add("alternativa-btn");
        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    });
}

// ======================================
// PROCESSAR A ESCOLHA
// ======================================

function respostaSelecionada(opcaoSelecionada) {
    if (!jogando) return;

    const afirmacoes = opcaoSelecionada.afirmacao;

    let afirmacaoEscolhida;

    if (Array.isArray(afirmacoes)) {
        afirmacaoEscolhida = aleatorio(afirmacoes);
    } else {
        afirmacaoEscolhida = afirmacoes;
    }

    historiaFinal += afirmacaoEscolhida + " ";

    // Verifica o próximo caminho do fluxograma
    if (
        opcaoSelecionada.proxima !== undefined &&
        opcaoSelecionada.proxima !== null
    ) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

// ======================================
// MOSTRAR O RESULTADO FINAL
// ======================================

function mostraResultado() {
    jogando = false;

    areaJogo.style.display = "none";
    caixaResultado.classList.add("mostrar");

    textoResultado.textContent =
        `${nome}, sua aventura chegou ao fim! ` +
        historiaFinal;
}

// ======================================
// JOGAR NOVAMENTE
// ======================================

botaoJogarNovamente.addEventListener("click", jogaNovamente);

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    jogando = false;

    caixaResultado.classList.remove("mostrar");
    areaJogo.style.display = "none";
    telaInicial.style.display = "block";
}

// ======================================
// PERSONALIZAR OS ENUNCIADOS COM O NOME
// ======================================

for (const pergunta of perguntas) {
    pergunta.enunciado = pergunta.enunciado.replace(
        /você/gi,
        nome
    );
}
