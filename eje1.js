const config = require("./config");
const path = require("path");
const express = require("express");
let bodyParser = require("body-parser");
const mysqlSession = require("express-mysql-session");
const app = express();

const session = require("express-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "facebluff"
});
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});


app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});

app.use(middlewareSession);
let agenda = [
    { nombre: "Juan", telefono: "89731982" },
    { nombre: "Carmen", telefono: "28329828" },
    { nombre: "David", telefono: "827272728" }
];
app.use(bodyParser.json());

app.get("/contactos", function (request, response) {
    response.json(agenda);
})


app.get("/contactos/:id_indice", function (request, response) {
    let indice = Number(request.params.id_indice);
    if (!isNaN(indice) && agenda[indice] !== undefined) {
        let elem = agenda[indice];
        response.json(elem);
    }
    else {
        response.status(404);
        response.end();
    }
})

app.post("/contactos", function(request,response){
    let nuevoElemento= request.bodyM
    agenda.push(nuevoElemento);
    response.status(201);
    response.end();
})
app.delete("/contactos/:indice", function(request,response){
    let indice = Number(request.params.indice);
    if(!isNaN(indice) && agenda[indice] !== undefined){
        agenda.splice(indice,1);
        response.status(200);
    }
    else{
        response.status(404)
    }
    response.end();
})
app.put("/contactos/:indice", function(request, response){
    let indice = Number(request.params.indice);
    if(!isNaN(indice) && agenda[indice] !== undefined){
        agenda[indice] = request.body;
    } else{
        response.status(404);
    }
    response.end();
})