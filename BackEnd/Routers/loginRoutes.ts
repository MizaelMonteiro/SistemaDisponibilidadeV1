import { Router } from "express";
import loginController from "../controllers/loginController.ts";

const router = Router();



router.post("/", (req, res) => {
    const usuarioLogar = req.body
    const usuario = loginController.validarLogin(usuarioLogar)
    usuario
        .then((usuarioLogado) => res.status(201).json(usuarioLogado))
        .catch((error)=> res.status(400).json(error.message))
});

export default router