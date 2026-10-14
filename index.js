const express = require('express');
const app = express();
app.use(express.json());

 // necessario para ler JSON do corpo das requisicoes
// "Banco de dados" em memoria

let tarefas = [
 { id: 1, titulo: 'Aprender Express', concluida: false },
 { id: 2, titulo: 'Criar minha primeira API', concluida: false },
{ id: 3, titulo: 'Adicionar minha primeira API', concluida: false }
];
let proximoId = 3;

//Ela lista todas as tarefas (com filtro opicional por status)                                           
app.get('/tarefas', (req, res) => {
 const { concluida } = req.query;
 let resultado = tarefas;
 if (concluida !== undefined) {
 resultado = tarefas.filter(t => t.concluida === (concluida === 'true'));
 }
 res.json(resultado);
});

// Ela faz uma busca especifica por uma tarefa                                                         
app.get('/tarefas/:id', (req, res) => {
 const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
 if (!tarefa) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
 res.json(tarefa);
});

// Ela cria uma nova tarefa                                                          
app.post('/tarefas', (req, res) => {
 const { titulo } = req.body;
 if (!titulo) return res.status(400).json({ erro: 'O campo "titulo" e obrigatorio' });
 const novaTarefa = { id: proximoId++, titulo, concluida: false };
 tarefas.push(novaTarefa);
 res.status(201).json(novaTarefa);
});

//Ela atualiza uma tarefa                                                            
app.put('/tarefas/:id', (req, res) => {
 const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
 if (!tarefa) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
 const { titulo, concluida } = req.body;
 if (titulo !== undefined) tarefa.titulo = titulo;
 if (concluida !== undefined) tarefa.concluida = concluida;
 res.json(tarefa);
});

// Ela deletar(apagar) uma tarefa                                                          
app.delete('/tarefas/:id', (req, res) => {
 const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
 if (index === -1) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
 tarefas.splice(index, 1);
 res.status(204).send();
});
app.listen(3000, () => console.log('API de tarefas rodando na porta 3000'));
