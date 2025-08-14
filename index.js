const express = require('express');
const app = express();
const cors = require('cors');
const hairList = require('./Data/hairList');
const services = require('./Server/services');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/imgservices', express.static(path.join(__dirname, 'public/imgservices')));
app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));


app.get('/cabelos', async (req, res) => {
  try {
    res.send(hairList);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar lista' });
  }
});

app.get('/servicos', async (req, res) => {
  try {
    res.send(services);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar Serviços' });
  }
});

app.get('/servico/cabelos', async (req, res) => {
  try {
    res.status(200).json(hairList); 
  } 
  catch (err) {
    res.status(500).json({ error: 'Erro ao carregar o Serviço' });
  }
  
});

app.listen(3003, () => {
    console.log("API rodando em http://localhost:3003");
});