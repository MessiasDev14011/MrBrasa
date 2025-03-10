
function moveProductSlider(direction) {
    var slider = document.getElementById('similarProductsSlider');
    var cardWidth = document.querySelector('.product-card').offsetWidth;
    var currentTransform = getComputedStyle(slider).transform;
    var currentTranslateX = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[4]);
    var newTranslateX = currentTranslateX - (direction * cardWidth);

    // Evitar que o carrossel ultrapasse os limites
    var maxTranslateX = -(slider.scrollWidth - slider.offsetWidth);
    newTranslateX = Math.max(newTranslateX, maxTranslateX);
    newTranslateX = Math.min(newTranslateX, 0);

    slider.style.transform = 'translateX(' + newTranslateX + 'px)';
}

// Função para atualizar as imagens e preço com base no modelo selecionado
function updateProductDetails() {
    var modelSelect = document.getElementById("modelSelect");
    var modelId = modelSelect.value;

    var images = [
        ['./sources/faca1.jpeg', 'https://via.placeholder.com/600x400?text=Modelo+1+Close'],
        ['https://via.placeholder.com/600x400?text=Modelo+2', 'https://via.placeholder.com/600x400?text=Modelo+2+Close'],
        ['https://via.placeholder.com/600x400?text=Modelo+3', 'https://via.placeholder.com/600x400?text=Modelo+3+Close']
    ];

    var prices = [
        'R$ 149,90',
        'R$ 179,90',
        'R$ 159,90'
    ];

    var carouselImages = document.getElementById("carouselImages");
    carouselImages.innerHTML = `
        <div class="carousel-item active">
            <img src="${images[modelId - 1][0]}" class="d-block w-100" alt="Produto Modelo ${modelId}">
        </div>
        <div class="carousel-item">
            <img src="${images[modelId - 1][1]}" class="d-block w-100" alt="Produto Modelo ${modelId} Close">
        </div>
    `;
    document.getElementById("productPrice").innerText = prices[modelId - 1];
}

// Função para calcular o frete (simulação)
function calculateShipping() {
    var zipCode = document.getElementById("zipCode").value;
    var shippingCost = document.getElementById("shippingCost");
    
    if(zipCode) {
        shippingCost.innerText = 'Frete estimado: R$ 20,00';
    } else {
        shippingCost.innerText = 'Informe um CEP válido.';
    }
}

// Função para adicionar ao carrinho
function addToCart() {
    alert('Produto adicionado ao carrinho!');
}

// Função para finalizar compra
function checkout() {
    alert('Finalizando compra...');
}