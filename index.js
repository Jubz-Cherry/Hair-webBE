const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./Models/users');
const services = require('./Server/services');
const makeList = require('./Data/makeList');
const ciliosList = require('./Data/ciliosList');
const hairList = require('./Data/hairList');
const browsList = require('./Data/browsList');
const appointmentService = require('./Server/appointmentService');



app.use(cors());
app.use(express.json());
app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));
app.use('/imgsobrancelha', express.static(path.join(__dirname, 'public/imgsobrancelha')));
app.use('/imgmake', express.static(path.join(__dirname, 'public/imgmake')));
app.use('/imgcilios', express.static(path.join(__dirname, 'public/imgcilios')));


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

app.get('/servico/maquiagem', async (req, res) => {
  try {
    res.status(200).json(makeList); 
  } 
  catch (err) {
    res.status(500).json({ error: 'Erro ao carregar o Serviço' });
  }
  
});

app.get('/servico/cilios', async (req, res) => {
  try {
    res.status(200).json(ciliosList); 
  } 
  catch (err) {
    res.status(500).json({ error: 'Erro ao carregar o Serviço' });
  }
  
});

app.post("/marcar",async (req,res) => {
  try {
    const createdUser = await appointmentService.Create(req.body);
    res.status(201).json({ message: "Agendamento criado com sucesso", createdUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/userservice",async (req,res) => {
    var userservice = await appointmentService.FindAll(false);
    res.json(userservice);
});

app.delete('/userservice/:id', async (req, res) => {
  const { id } = req.params;

  try {

   const deletedUser = await appointmentService.Delete(id);

    if (!deletedUser) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Usuário deletado com sucesso', deletedUser });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

app.listen(3003, () => {
    console.log("API rodando em http://localhost:3003");
});