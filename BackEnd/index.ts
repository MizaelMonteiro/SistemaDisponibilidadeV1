import "dotenv/config";
import express, { urlencoded } from "express";


import usuariorouter from "./Routers/usuarioRoutes.ts";
import loginrouter from "./Routers/loginRoutes.ts";
import horariorouter from "./Routers/horarioRoutes.ts";

import conexao from "./infraestrutura/conexao.ts";


import cors from 'cors';




const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({extended:true}))





app.use("/usuarios", usuariorouter);
app.use("/login", loginrouter);
app.use("/horarios", horariorouter);


app.listen(3000, () => {
    console.log("Backend funcionando!");
});