document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário até que a validação seja feita

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Validação de campos obrigatórios
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    // Validar se o formato do email é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Verificar se o email já está registrado no banco de dados
    checkEmailAvailability(email, name, password);
});

async function checkEmailAvailability(email, name, password) {
    const response = await fetch("/check-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    });

    const data = await response.json();

    if (data.exists) {
        document.getElementById("email-error").textContent = "Este email já está registrado.";
    } else {
        document.getElementById("email-error").textContent = "";
        // Enviar os dados do usuário para o backend para registrar o usuário
        registerUser(name, email, password);
    }
}

async function registerUser(name, email, password) {
    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    });

    const data = await response.json();

    if (data.success) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; // Redireciona o usuário para a página de login
    } else {
        alert("Erro ao cadastrar. Tente novamente.");
    }
}