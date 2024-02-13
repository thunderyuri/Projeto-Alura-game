
// variaveis gerais
let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
};

// exibições
function exibirMensagemInial() {
    exibirTextoNaTela('h1', 'Jogo do Número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000.');
};

// função de teste
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {

        // mensagem geral de acerto
        exibirTextoNaTela('h1', 'Acertou!');

        // correção grmatical
        let palavraTentativa =  tentativas > 1 ? 'tentativas' : 'tentativa';

        // mensagem de tentativas e número secreto
        let mensagemTentativas = `Você descobriu que o número secreto era ${(numeroSecreto)}, com ${(tentativas)} ${(palavraTentativa)}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
   } else {

        // chute MAIOR ou MENOR numero
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p','O número secreto é menor!');
        } else {
            exibirTextoNaTela('p','O número secreto é maior!');
        };

        // ciclo caso o usuário erre
        tentativas++
        limparCampo();
   };
};

// número aleatório secreto
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    };

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    };
};

// limpar campo de chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
};

//reiniciar jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};

exibirMensagemInial();