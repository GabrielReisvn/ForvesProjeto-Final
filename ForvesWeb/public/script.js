const API = '/api';

// Detecção de viewport mobile (sincronizada com o breakpoint do CSS)
const isMobile = () => window.innerWidth <= 860;

// cache local para evitar múltiplas requisições desnecessárias
let cAluno = [];
let cProfessor = [];
let cSala = [];
let cFaxina = [];

let TOKEN          = localStorage.getItem('mt_token')   || '';
let USUARIO_LOGADO = JSON.parse(localStorage.getItem('mt_usuario') || 'null');

// ============================================================
// AUTENTICAÇÃO
// ============================================================

async function fazerLogin() {
    const user = document.getElementById('l-user').value;
    const password = document.getElementById('l-password').value;
    const btn=document.getElementById('l-btn');
    const erro = document.getElementById('l-erro');

    if (!user || !password) {
        erro.innerText = 'Preencha todos os campos.';
        return;
    }

btn.disabled = true;
btn.textContent = 'Aguarde...';
erro.innerText = '';

    try {
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Credenciais inválidas.');

        TOKEN = data.token;
        USUARIO_LOGADO = data.usuario;
        localStorage.setItem('mt_token', TOKEN);
        localStorage.setItem('mt_usuario', JSON.stringify(USUARIO_LOGADO));
    }catch (error) {
        erro.style.display = 'block';
        erro.innerText = error.message;
        btn.disabled = false;
        btn.textContent = error.message.includes('Credenciais') ? 'Login' : 'Tentar novamente';
    }finally {
        btn.disabled = false;
        btn.textContent = 'Login';
    }
}