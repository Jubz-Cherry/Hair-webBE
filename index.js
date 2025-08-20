const express = require('express');
const app = express();
const cors = require('cors');
const hairList = require('./Data/hairList');
const browsList = require('./Data/browsList');
const services = require('./Server/services');
const path = require('path');
const User = require('./Models/users');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use('/imgsobrancelha', express.static(path.join(__dirname, 'public/imgsobrancelha')));
app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));

mongoose.connect("mongodb://localhost:27017/appoint", {})
.then(() => {
    console.log("Mongo funcionando!");
}).catch((err) => {
    console.log("Mongo não esta conectado", err);
}); 


app.get('/cabelos', async (req, res) => {
  try {
    res.send(hairList);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar lista' });
  }
});

app.get('/sobrancelhas', async (req, res) => {
  try {
    res.send(browsList);
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

app.get('/servico/sobrancelhas', async (req, res) => {
  try {
    res.status(200).json(browsList); 
  } 
  catch (err) {
    res.status(500).json({ error: 'Erro ao carregar o Serviço' });
  }
  
});

app.post("/agendar", async (req, res) => {
  try {
    const { name, number, description, Date, time } = req.body;

    if (!name || !number || !description || !Date || !time) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    const userExists = await User.findOne({ number });
    if (userExists) {
      return res.status(409).json({ error: "Número já cadastrado." });
    }

    const newUser = new User({
      name,
      number,
      description,
      Date,
      time,
    });

    await newUser.save();

    res.status(201).json({ message: "Horário agendado com sucesso!" });

  } catch (err) {
    console.error("Erro ao agendar:", err);
    res.status(500).json({ error: "Erro interno ao agendar horário." });
  }
});


app.listen(3003, () => {
    console.log("API rodando em http://localhost:3003");
});