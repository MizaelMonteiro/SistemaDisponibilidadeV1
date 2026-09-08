import { Router } from "express";

import usuariosController from "../controllers/usuariosController.ts";

import { authToken } from "../middlewares/authToken.ts";

const router = Router();

router.get("/", authToken,(req, res) => {

    const listaUsuarios = usuariosController.buscar();

    listaUsuarios
        .then((usuarios) => res.status(200).json(usuarios))
        .catch((error) => res.status(400).json(error.message));
});


router.post("/", (req, res) => {

    const novoUsuario = req.body;

    const usuario = usuariosController.criar(novoUsuario);

    usuario
        .then((usuarioCriado) => res.status(201).json(usuarioCriado))
        .catch((error) => res.status(400).json(error.message));
});


router.put("/:id", (req, res) => {

    const id = Number(req.params.id);
    const usuarioAtualizado = req.body;

    const usuario = usuariosController.atualizar(
        usuarioAtualizado,
        id
    );

    usuario
        .then((resultadoUsuarioAtualizado) =>
            res.status(200).json(resultadoUsuarioAtualizado)
        )
        .catch((error) =>
            res.status(400).json(error.message)
        );
});


router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const usuario = usuariosController.deletar(id);

    usuario
        .then((resultadoDeletar) =>
            res.status(200).json(resultadoDeletar)
        )
        .catch((error) =>
            res.status(400).json(error.message)
        );
});


router.get("/protegida", authToken, (req, res) => {

    res.json({
        message: "Acessando rota protegida"
    });

});


export default router;