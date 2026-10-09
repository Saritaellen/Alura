```javascript
import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

// Elementos da página
const telaInicial = document.querySelector(".tela-inicial");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoIniciar = document.querySelector(".iniciar-btn");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

// Estado do projeto
let atual = 0;
let historiaFinal = "";
let respondendo = false;

// Personaliza as perguntas com o nome sorteado
function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(
            /\bvocê\b/gi,
            nome
        );
    }
}

// Inicia a experiência
function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    respondendo = false;

    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");

    mostraPergunta();
}

// Mostra a pergunta e cria os botões das alternativas
function mostraPergunta() {
    respondendo = false;

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.replaceChildren();
    caixaAlternativas.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = perguntaAtual.enunciado;
    caixaPerguntas.appendChild(titulo);

    perguntaAtual.alternativas.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa-btn";
        botao.textContent = `${indice + 1}. ${opcao.texto}`;

        botao.addEventListener("click", () => {
            respostaSelecionada(opcao);
        });

        caixaAlternativas.appendChild(botao);
    });
}

// Processa a alternativa escolhida
function respostaSelecionada(opcaoSelecionada) {
    if (respondendo) return;
    respondendo = true;

    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacao + "\n\n";

    // Segue para a próxima pergunta indicada no objeto
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

// Exibe o resultado final
function mostraResultado() {
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.add("mostrar");

    textoResultado.textContent = historiaFinal.trim();
}

// Reinicia o projeto
function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    respondendo = false;

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");

    mostraPergunta();
}

// Liga os botões às funções
botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

// Prepara o projeto
substituiNome();
```
