// Exemplo de itens do carrinho (dados simulados)
const cart = [
    { id: 1, name: "Produto 1", price: 149.90, quantity: 2, image: "./sources/faca1.jpeg" },
    { id: 2, name: "Produto 2", price: 89.90, quantity: 1, image: "./sources/faca1.jpeg" },
    { id: 3, name: "Produto 3", price: 199.90, quantity: 1, image: "./sources/faca1.jpeg" }
];

// Função para atualizar o carrinho na tela
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = ""; // Limpa os itens do carrinho

    let total = 0;

    // Cria as linhas da tabela com os itens
    cart.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
            </td>
            <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})"><i class="fas fa-trash-alt"></i> Remover</button></td>
        `;

        cartItemsContainer.appendChild(row);
    });

    // Atualiza o total do carrinho
cartTotalElement.innerText = `Total: R$${total.toFixed(2)}`;
}

// Função para atualizar a quantidade de um item no carrinho
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        updateCart();
    }
}


// Função para remover um item do carrinho
function removeItem(itemId) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}


// Função para finalizar a compra (simulada)
function finalizePurchase() {
    alert("Compra finalizada! Obrigado por comprar conosco.");
    // Aqui você pode redirecionar o usuário para uma página de confirmação de pedido.
}

// Inicializa a página com os itens do carrinho
updateCart()