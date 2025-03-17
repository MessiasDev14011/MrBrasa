const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(express.json());

// Configuração do CORS
app.use(cors());

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Substitua pelo seu usuário MySQL
  password: 'Migue14011@', // Substitua pela sua senha do MySQL
  database: 'loja_online'      // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para buscar produtos com estoque maior que zero, modelos e imagens
app.get('/produtos', (req, res) => {
  const query = `
    SELECT p.idPRODUTOS AS produto_id, p.nome, p.descricao AS produto_descricao, p.preco, p.quantidade_estoque, p.id_categoria,
       m.id AS modelo_id, m.nome_modelo, 
       i.url_image
FROM produtos p
LEFT JOIN modelos m ON p.idPRODUTOS = m.id_produto
LEFT JOIN imagens_modelo i ON m.id = i.id_modelo
WHERE p.quantidade_estoque > 0
ORDER BY p.idPRODUTOS, m.id, i.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos, modelos e imagens:', err);
      res.status(500).send('Erro ao buscar dados');
      return;
    }

    // Organizando os dados no formato adequado
    const produtosComModelos = [];
    results.forEach(row => {
      // Encontrar ou criar um produto no array
      let produto = produtosComModelos.find(p => p.id === row.produto_id);
      if (!produto) {
        produto = {
          id: row.produto_id,
          nome: row.nome,
          descricao: row.produto_descricao,
          preco: row.preco,
          estoque: row.estoque,
          categoria: row.id_categoria,
          modelos: []
        };
        produtosComModelos.push(produto);
      }

      // Encontrar ou criar um modelo dentro do produto
      let modelo = produto.modelos.find(m => m.id === row.modelo_id);
      if (!modelo) {
        modelo = {
          id: row.modelo_id,
          nome_modelo: row.nome_modelo,
          descricao: row.modelo_descricao,
          imagens: []
        };
        produto.modelos.push(modelo);
      }

      // Adicionar a imagem ao modelo
      if (row.url_image) {
        modelo.imagens.push(row.url_image);
      }
    });

    res.json(produtosComModelos);  // Enviar os produtos com modelos e imagens
  });
});

// Definindo a porta em que o servidor vai rodar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
