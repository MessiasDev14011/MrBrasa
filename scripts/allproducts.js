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