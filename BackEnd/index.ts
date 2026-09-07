import "dotenv/config";
import express, { urlencoded } from "express";


import usuariorouter from "./Routers/usuarioRoutes.ts";
import loginrouter from "./Routers/loginRoutes.ts";

import conexao from "./infraestrutura/conexao.ts";
import tabelas from "./infraestrutura/tabelas.ts";

import cors from 'cors';




const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

tabelas.init(conexao)



app.use("/usuarios", usuariorouter);
app.use("/login", loginrouter);


app.listen(3000, () => {
    console.log("Backend funcionando!");
});