
    aclib.runAutoTag({
        zoneId: 'dc5kyonaoi',
    });
</script>
// Inicializar AOS
AOS.init({ duration: 800, once: true });

// ===== FUNÇÕES DO CHATBOT =====
function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    container.classList.toggle('d-none');
}

function abrirChatbot() {
    document.getElementById('chatbot-container').classList.remove('d-none');
    iniciarChatbot();
}

// ===== PAINEL ADMIN =====
const SENHA_CORRETA = 'lpxdev123'; // ALTERE ESTA SENHA

function fazerLogin() {
    const senha = document.getElementById('senhaAdmin').value;
    if (senha === SENHA_CORRETA) {
        document.getElementById('loginArea').classList.add('d-none');
        document.getElementById('painelArea').classList.remove('d-none');
        carregarPedidos();
    } else {
        document.getElementById('loginErro').textContent = 'Senha incorreta!';
    }
}

function carregarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos_lpxdev')) || [];
    const lista = document.getElementById('listaPedidos');
    if (pedidos.length === 0) {
        lista.innerHTML = '<p class="text-muted">Nenhum pedido pendente.</p>';
        return;
    }
    let html = `<table class="table table-striped">
        <thead><tr><th>Data</th><th>Cliente</th><th>Serviço</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>`;
    pedidos.forEach(p => {
        html += `<tr>
            <td>${p.data}</td>
            <td>${p.nome}</td>
            <td>${p.servico}</td>
            <td>R$ ${p.valor}</td>
            <td>${p.status}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="mudarStatus(${p.id}, 'em_producao')">Iniciar</button>
                <button class="btn btn-sm btn-primary" onclick="mudarStatus(${p.id}, 'concluido')">Concluir</button>
                <button class="btn btn-sm btn-danger" onclick="excluirPedido(${p.id})">Excluir</button>
            </td>
        </tr>`;
    });
    html += '</tbody></table>';
    lista.innerHTML = html;
}

function mudarStatus(id, novoStatus) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos_lpxdev')) || [];
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        pedido.status = novoStatus;
        localStorage.setItem('pedidos_lpxdev', JSON.stringify(pedidos));
        carregarPedidos();
    }
}

function excluirPedido(id) {
    if (confirm('Excluir este pedido?')) {
        let pedidos = JSON.parse(localStorage.getItem('pedidos_lpxdev')) || [];
        pedidos = pedidos.filter(p => p.id !== id);
        localStorage.setItem('pedidos_lpxdev', JSON.stringify(pedidos));
        carregarPedidos();
    }
}
