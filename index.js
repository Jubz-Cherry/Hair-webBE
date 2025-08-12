const express = require('express');
const app = express();
const cors = require('cors');
const hairList = require('./Data/hairList');
const path = require('path');


app.use(cors());
app.use(express.json());
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));


app.get('/cabelos', async (req, res) => {
  try {
    res.send(hairList);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar lista' });
  }
});


app.listen(3003, () => {
    console.log("API rodando em http://localhost:3003");
});