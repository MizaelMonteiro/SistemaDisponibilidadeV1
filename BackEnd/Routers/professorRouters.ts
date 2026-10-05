import { Router } from "express";
import loginController from "../controllers/loginController.ts";
import professorController from "../controllers/professorController.ts";
import { authToken } from "../middlewares/authToken.ts";

const router = Router();


router.get("/", authToken, (req, res) => {

    const usuario = req.usuario as any;
    const idUsuario = usuario.idUsuario;

    professorController
        .buscarProfessor(idUsuario)
        .then((professor: any) => {

            if (professor.length === 0) {
                res.status(404).json({
                    mensagem: "Professor não encontrado"
                });
                return;
            }

            res.status(200).json(professor[0]);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                mensagem: error.message
            });
        });
});

router.post("/", (req, res) => {
    const usuarioLogar = req.body
    const usuario = loginController.logar(usuarioLogar)
    usuario
        .then((usuarioLogado) => res.status(201).json(usuarioLogado))
        .catch((error)=> res.status(400).json(error.message))
});



export default router