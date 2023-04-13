const express = require("express")
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const db = require("./db")


app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');

app.get("/",(req,res) => {
    res.render("index");
});

app.post("/",async (req,res) => {
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let email = req.body.email
    db.criarUsuario(nome,sobrenome)
    db.criarEmail(email)
    res.render("editar", {nome:nome,sobrenome:sobrenome,email:email});
});

app.post("/editar",(req,res) => {
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let email = req.body.email
    db.editarUsuario(nome,sobrenome)
    db.editarEmail(email)
    res.render("editar", {nome:nome,sobrenome:sobrenome,email:email});
});

app.post("/deletar",(req,res) =>{
    db.deletarUsuario()
    db.deletarEmail()
    res.send("Usuario apagado")
});




app.listen(3000,function(erro){
    if (erro){
        console.log ('Ocorreu um erro')
    }else {
        console.log('Servidor iniciado com sucesso');
    }
    
})