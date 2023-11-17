const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const os = require("os");
const app = express();
const port = 3000;

const password = process.env.MYSQL_ROOT_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;


// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'mysql',
    user: user,
    password: password,
    database: database,
});

// Conecta-se ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware para análise de solicitações JSON
app.use(bodyParser.json());

// Rota para inserir dados na tabela
app.post('/todo', (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ error: 'To do é campo obrigatório.' });
    }

    const novoDado = { todo };

    // Execute a consulta SQL para inserir os dados na tabela
    const sql = 'INSERT INTO tabela_exemplo (todo) VALUES (?)';
    db.query(sql, [novoDado.todo], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).json({ error: 'Erro ao inserir os dados.' });
        }
        console.log('Dados inseridos com sucesso:', result);
        return res.status(200).json({ message: 'Dados inseridos com sucesso.' });
    });
});

// Rota para listar todos os dados da tabela
app.get('/todo', (req, res) => {

    // Execute a consulta SQL para listar os dados na tabela
    const sql = 'SELECT * from tabela_exemplo';
    db.query(sql, [], (err, result) => {
        if (err) {
            console.error('Erro ao listar dados:', err);
            return res.status(500).json({ error: 'Erro ao listar os dados.' });
        }
        console.log('Dados listados com sucesso:', result);
        return res.status(200).json(result);
    });
});

app.get('/os', (req, res) => {
    return res.status(200).json(os.hostname());
})

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

})

app.listen(port, () => {
    console.log(`Servidor está escutando na porta ${port}`);
});
