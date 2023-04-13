const mysql = require ("mysql2/promise");

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

const connection = await mysql.createConnection({
    host     :'localhost',
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'atvii'
});

console.log('Conectou no MySQL!');
global.connection = connection;
return global.connection;
}

async function criarUsuario(nome, sobrenome){
    const conn = await connect();
    const sql = 'INSERT INTO USUARIO (nome, sobrenome) VALUES (?, ?);';
    const values = [nome,sobrenome];
    return await conn.query(sql,values, function(err) {
        if (err) throw err;
        console.log('Usuário criado com sucesso!');
        });
}

async function criarEmail(email){
    const conn = await connect();
    const [rows] = await conn.query('SELECT id FROM USUARIO ORDER BY id DESC LIMIT 1');
    const ultimoId = rows[0].id;
    const sql = 'INSERT INTO EMAIL (email,id) VALUES (?,?);';
    const values = [email,ultimoId];
    return await conn.query(sql,values, function(err) {
        if (err) throw err;
        console.log('Email criado com sucesso!');
        });
}

async function editarUsuario(nome, sobrenome){
    const conn = await connect();
    const [rows] = await conn.query('SELECT id FROM USUARIO ORDER BY id DESC LIMIT 1');
    const ultimoId = rows[0].id;
    const sql = 'UPDATE USUARIO SET nome = ?, sobrenome = ? WHERE id = ?';
    const values = [nome,sobrenome,ultimoId];
    return await conn.query(sql,values, function(err) {
    if (err) throw err;
    console.log('Usuário atualizado com sucesso!');
    });
}

async function editarEmail(email){
    const conn = await connect();
    const [rows] = await conn.query('SELECT id FROM USUARIO ORDER BY id DESC LIMIT 1');
    const ultimoId = rows[0].id;
    const sql = 'UPDATE EMAIL SET email = ? WHERE id = ?';
    const values = [email,ultimoId];
    return await conn.query(sql,values, function(err) {
    if (err) throw err;
    console.log('Email atualizado com sucesso!');
    });
}

async function deletarEmail(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT id FROM USUARIO ORDER BY id DESC LIMIT 1');
    const ultimoId = rows[0].id;
    const sql = 'DELETE FROM email WHERE id = ?';
    const values = [ultimoId];
    return await conn.query(sql,values, function(err) {
    if (err) throw err;
    console.log('Email apagado com sucesso!');
    });
}

async function deletarUsuario(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT id FROM USUARIO ORDER BY id DESC LIMIT 1');
    const ultimoId = rows[0].id;
    const sql = 'DELETE FROM usuario WHERE id = ?';
    const values = [ultimoId];
    return await conn.query(sql,values, function(err) {
    if (err) throw err;
    console.log('Usuário apagado com sucesso!');
    });
}


module.exports = {criarUsuario,criarEmail,editarUsuario,editarEmail,deletarEmail,deletarUsuario}