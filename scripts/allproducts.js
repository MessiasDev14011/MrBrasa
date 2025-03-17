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

async function fetchProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    const produtos = await response.json();
    renderizarProdutos(produtos);
}

// Função para renderizar os produtos, modelos e imagens
function renderizarProdutos(produtos) {
    const produtosContainer = document.getElementById('product-list');
   // produtosContainer.innerHTML = ''; // Limpar conteúdo anterior
    produtos.forEach(produto => {
        var a = produto.categoria
        var categoria = ''
        switch(a){
            case 1: 
                var cat = 'faca'
                break
            case 2:
                var cat = 'acessorios'
                break
            case 3:
                var cat = 'conjuntos'
                break
            let categoria = cat
           
            
        }
        
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add(`${produto.categoria}`)
        produtoDiv.classList.add(`card-item`)
        produtoDiv.classList.add('col-md-4');
        produtoDiv.classList.add('mb-4');
        produtoDiv.classList.add('x');
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.classList.add('product-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-img-container');

        const image = document.createElement("img");
        image.src = `${produto.modelos[0].imagens[0]}`;
        image.alt = `${produto.nome}`;
        image.classList.add('card-img-top');
        image.classList.add('ProductCardImg');

        const ContentInfo = document.createElement('div');
        ContentInfo.classList.add('card-body')

        const ItemTitle = document.createElement('h5')
        ItemTitle.classList.add('card-title')
        ItemTitle.textContent = produto.nome
    
        const ItemDescription = document.createElement('p')
        ItemDescription.classList.add('card-text')
        ItemDescription.textContent = produto.descricao

        const ItemDetailsDiv = document.createElement('div')
        ItemDetailsDiv.classList.add("product-details")

        const ProductPrice = document.createElement('span')
        ProductPrice.classList.add('product-price')
        ProductPrice.classList.add('mx')
        ProductPrice.textContent = `R$ ${produto.preco}`

        const ProductAction = document.createElement('div')
        ProductAction.classList.add('product-actions')
        ProductAction.classList.add('w-100')

        const AddtoCarButton = document.createElement('a')
        AddtoCarButton.classList.add('btn')
        AddtoCarButton.classList.add('btn-primary')
        AddtoCarButton.href = '#'
        const CartIcon = document.createElement('i')
        AddtoCarButton.appendChild(CartIcon)
        AddtoCarButton.textContent = 'Adicionar ao Carrinho'


        CartIcon.classList.add('fas')
        CartIcon.classList.add('fa-cart-plus')

        const ShowDetailsButton = document.createElement('a')
        ShowDetailsButton.classList.add('btn')
        ShowDetailsButton.classList.add('btn-primary')
        ShowDetailsButton.href = 'productdetails.html'
        const BuyNowIcon = document.createElement('i')
        ShowDetailsButton.appendChild(BuyNowIcon)
        ShowDetailsButton.textContent = 'Comprar Agora'
        
   
        BuyNowIcon.classList.add('fas')
        BuyNowIcon.classList.add('fa-bolt')
      
        produtosContainer.appendChild(produtoDiv);
        produtoDiv.appendChild(productCard)
        productCard.appendChild(imageContainer)
        imageContainer.appendChild(image)
        productCard.appendChild(ContentInfo)
        ContentInfo.appendChild(ItemTitle)
        ContentInfo.appendChild(ItemDescription)
        ContentInfo.appendChild(ItemDetailsDiv)
        ItemDetailsDiv.appendChild(ProductPrice)
        ItemDetailsDiv.appendChild(ProductAction)
        ProductAction.appendChild(AddtoCarButton)
        ProductAction.appendChild(ShowDetailsButton)
    });
}

// Chamando a função para carregar os produtos quando a página for carregada
window.onload = fetchProdutos;