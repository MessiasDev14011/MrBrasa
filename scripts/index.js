// Variável simulando o estado de login do usuário
let isLoggedIn = false;  // Mude para true para simular um usuário logado

// Função para alterar o link do menu de navegação
function updateLoginStatus() {
    const loginLink = document.getElementById('login-link');

    if (isLoggedIn) {
        loginLink.textContent = "Minha Conta"; // Se o usuário estiver logado
        loginLink.href = "#minha-conta"; // Link para a página da conta
    } else {
        loginLink.textContent = "Fazer Login"; // Se o usuário não estiver logado
        loginLink.href = "#login"; // Link para a página de login
    }
}

// Chama a função para atualizar o estado da conta no carregamento da página
window.onload = updateLoginStatus;
// Script para alternar o tema escuro
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
};

// Se desejar adicionar algum tipo de funcionalidade de navegação lateral, é possível manipular o estado do menu usando este script
document.querySelector('.navbar-toggler').addEventListener('click', () => {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('show');
});