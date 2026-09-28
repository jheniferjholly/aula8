const express = require('express');
const app = express();

// OBRIGATÓRIO: Habilita o Express a ler JSON no corpo da requisição (req.body)
app.use(express.json());

// 1. EXEMPLO COM ROUTE PARAMS (req.params) - Identificador Único
app.get('/musicas/:id', (req, res) => {
  const { id } = req.params;
  if (id === "99") {
    return res.status(404).json({ erro: "Música não encontrada." });
  }
  res.status(200).json({ id, titulo: "Bohemian Rhapsody", artista: "Queen" });
});

// 2. EXEMPLO COM QUERY PARAMS (req.query) - Filtro / Busca Dinâmica
app.get('/musicas', (req, res) => {
    const { categoria, ordenacao } = req.query; // Extrai query params opcionais

    res.status(200).json({
        mensagem: "Listagem de musicas filtrada com sucesso",
        filtrosAplicados: {
            categoria: categoria || "Todas",
            ordenacao: ordenacao || "padrao"
        }
    });
});

// 3. EXEMPLO COM BODY (req.body) - Cadastro / Envio de Dados JSON
app.post('/musicas/nome', (req, res) => {
    const { nome, artista, categoria } = req.body;

    // Validação dos campos obrigatórios (Erro do Cliente -> 400)
    if (!nome || !artista) {
        return res.status(400).json({ 
            erro: "Nome incompleto! É obrigatório informar 'nome' e 'artista'." 
        });
    }

    // Sucesso ao criar novo recurso -> 201 Created
    res.status(201).json({
        mensagem: "musicas encontrada com sucesso!",
        produtoCriado: { id: nome, artista, categoria }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor Express rodando na porta ${PORT}`);
    console.log(`Servidor rodando em http://localhost:${PORT}/musicas/:id`);
});

