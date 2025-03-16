const images = ['']
// Função para filtrar produtos por categoria
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.card-item');
    
    // Percorre todos os produtos e os exibe ou oculta de acordo com a categoria
    allProducts.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';  // Exibe todos os produtos
        } else {
            if (product.classList.contains(category)) {
                product.style.display = 'block';  // Exibe produtos da categoria selecionada
            } else {
                product.style.display = 'none';  // Esconde outros produtos
            }
        }
    });
}

// Função para buscar os produtos da API
function buscarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(data => renderizarProdutos(data))
        .catch(error => console.error('Erro ao carregar produtos:', error));
}
function buscarImagens() {
    fetch('http://localhost:3000/produtos/imagens')
        .then(response => response.json())
        .then(data => selectImages(data))
        .catch(error => console.error('Erro ao carregar Imagens:', error));
}

function selectImages(imagens){
    images.push(imagens)
}


// Função para renderizar os produtos na página
function renderizarProdutos(produtos) {
    buscarImagens()
    const container = document.getElementById("product-list");
    container.innerHTML = " "; // Limpa o conteúdo atual

    produtos.forEach(produto => {
        const produtoCard = document.createElement("div");
        produtoCard.classList.add("produto-card");

        // Título do produto
        const nomeProduto = document.createElement("h3");
        nomeProduto.textContent = produto.nome;

        // Imagens do produto

        // Preço e estoque
        const valor = document.createElement("p");
        valor.classList.add("valor");
        valor.textContent = `R$ ${produto.preco}`;

        const estoque = document.createElement("p");
        estoque.classList.add("estoque");
        estoque.textContent = `Estoque: ${produto.quantidade_estoque}`;

        // Adicionando tudo ao card do produto
        produtoCard.appendChild(nomeProduto);
        produtoCard.appendChild(valor);
        produtoCard.appendChild(estoque);

        container.appendChild(produtoCard);
    });
}


// Carregar produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', buscarProdutos);