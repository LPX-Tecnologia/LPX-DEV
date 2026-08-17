// Estado do chatbot
let etapa = 0;
let dadosCliente = {
    nome: '',
    tipoServico: '',
    descricao: '',
    valor: 0
};

const mensagensDiv = document.getElementById('chatbot-messages');
const inputArea = document.getElementById('chatbot-input-area');

function adicionarMensagem(texto, remetente) {
    const div = document.createElement('div');
    div.className = `message ${remetente}`;
    div.innerHTML = texto;
    mensagensDiv.appendChild(div);
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}

function limparInput() {
    inputArea.innerHTML = '';
}

function mostrarOpcoes(opcoes) {
    limparInput();
    const div = document.createElement('div');
    div.className = 'options text-center';
    opcoes.forEach(op => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-primary m-1';
        btn.textContent = op;
        btn.onclick = () => processarResposta(op);
        div.appendChild(btn);
    });
    inputArea.appendChild(div);
}

function mostrarInputTexto(placeholder, callback) {
    limparInput();
    const div = document.createElement('div');
    div.className = 'input-group';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = placeholder;
    const btn = document.createElement('button');
    btn.className = 'btn btn-custom';
    btn.textContent = 'Enviar';
    btn.onclick = () => {
        const valor = input.value.trim();
        if (valor) callback(valor);
    };
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter' && input.value.trim()) {
            callback(input.value.trim());
        }
    });
    div.appendChild(input);
    div.appendChild(btn);
    inputArea.appendChild(div);
    input.focus();
}

function iniciarChatbot() {
    etapa = 0;
    mensagensDiv.innerHTML = '';
    adicionarMensagem('Olá! 👋 Sou o assistente virtual da LPX Dev. Vou ajudar você a fazer um orçamento. Qual é o seu nome?', 'bot');
    mostrarInputTexto('Digite seu nome', (nome) => {
        dadosCliente.nome = nome;
        adicionarMensagem(nome, 'user');
        etapa = 1;
        perguntarTipoServico();
    });
}

function perguntarTipoServico() {
    adicionarMensagem(`Prazer, ${dadosCliente.nome}! Que tipo de serviço você precisa?`, 'bot');
    mostrarOpcoes(['Site', 'Sistema Web', 'Aplicativo Mobile', 'Outro']);
}

function processarResposta(resposta) {
    adicionarMensagem(resposta, 'user');
    if (etapa === 1) {
        dadosCliente.tipoServico = resposta;
        etapa = 2;
        adicionarMensagem('Descreva brevemente o que você precisa (funcionalidades, objetivo).', 'bot');
        mostrarInputTexto('Descreva seu projeto', (descricao) => {
            dadosCliente.descricao = descricao;
            adicionarMensagem(descricao, 'user');
            etapa = 3;
            calcularOrcamento();
        });
    }
}

function calcularOrcamento() {
    let valorBase = 0;
    switch (dadosCliente.tipoServico) {
        case 'Site': valorBase = 800; break;
        case 'Sistema Web': valorBase = 2000; break;
        case 'Aplicativo Mobile': valorBase = 3500; break;
        default: valorBase = 1500;
    }
    // Ajuste conforme descrição (simplificado)
    dadosCliente.valor = valorBase;
    adicionarMensagem(`Analisando sua necessidade... 💡`, 'bot');
    setTimeout(() => {
        adicionarMensagem(`O valor estimado para o seu projeto é <strong>R$ ${dadosCliente.valor}</strong>. Deseja prosseguir com o contrato e pagamento?`, 'bot');
        mostrarOpcoes(['Aceitar e Pagar com PIX', 'Cancelar']);
        etapa = 4;
    }, 1500);
}

function processarResposta(resposta) {
    adicionarMensagem(resposta, 'user');
    if (etapa === 4) {
        if (resposta === 'Aceitar e Pagar com PIX') {
            mostrarTermos();
        } else {
            adicionarMensagem('Tudo bem! Se mudar de ideia, estou por aqui. 😊', 'bot');
            finalizarChatbot();
        }
    }
}

function mostrarTermos() {
    const termos = `
        <strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</strong><br>
        1. O serviço será desenvolvido conforme descrição fornecida.<br>
        2. O pagamento via PIX deve ser realizado para iniciar o projeto.<br>
        3. O prazo de entrega será combinado após o pagamento.<br>
        4. O cliente tem direito a 2 rodadas de alterações.<br>
        5. O desenvolvedor não se responsabiliza por problemas de terceiros (hospedagem, domínio, etc.).<br>
        6. Após a entrega, o suporte gratuito é de 30 dias.<br>
        7. Ao aceitar, você concorda com estes termos.
    `;
    adicionarMensagem(termos, 'bot');
    mostrarOpcoes(['Li e Aceito os Termos', 'Não Aceito']);
    etapa = 5;
}

function processarResposta(resposta) {
    // ... (continua)
}