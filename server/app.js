const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Criando a instância do Express
const app = express();
app.use(express.json());

// Configurando o CORS
app.use(cors());


// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',        // Endereço do servidor MySQL (no seu caso, provavelmente "localhost")
  user: 'root',      // Substitua pelo seu usuário MySQL
  password: 'Migue14011@',    // Substitua pela sua senha do MySQL
  database: 'loja_online'          // Nome do banco de dados que você está usando
});

// Conectar ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para buscar os produtos 
app.get('/produtos', (req, res) => {
  const query = 'SELECT * FROM produtos where quantidade_estoque > 0';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).send('Erro ao buscar produtos');
      return;
    }

    res.json(results);  // Retorna os produtos como JSON
  });
});

app.get('/produtos/imagens', (req, res) => {
    const query = 'SELECT * FROM imagens_produto';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar imagens:', err);
        res.status(500).send('Erro ao buscar imagens');
        return;
      }
  
      res.json(results);  // Retorna os produtos como JSON
    });
  });

// Rota para testar a API
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Definindo a porta em que o servidor vai rodar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});