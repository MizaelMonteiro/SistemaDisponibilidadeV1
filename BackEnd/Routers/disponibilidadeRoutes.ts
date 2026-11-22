import { Router } from "express";
import disponibilidadeController from "../controllers/disponibilidadeController.ts";
import { authToken } from "../middlewares/authToken.ts";
import { authCoordenador } from "../middlewares/authCoordenador.ts";
import professorModel from "../models/professorModel.ts";

const router = Router();


router.get("/", authToken, (req, res) => {
    const usuario = req.usuario as any;

    const idUsuario = usuario.idUsuario;
    console.log("ID do usuário logado:", idUsuario);
    disponibilidadeController
        .consultarDisponibilidade(idUsuario)
        .then((disponibilidades) => {
            res.status(200).json(disponibilidades);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error.message);
        });
});

router.get(
    "/professor/:idProfessor",
    authToken,
    authCoordenador,
    disponibilidadeController.consultarDisponibilidadeProfessor
);

router.get("/:idProfessor",authToken, (req, res) => {

    const idProfessor = Number(req.params.idProfessor);

    disponibilidadeController
        .consultarDisponibilidade(idProfessor)
        .then((disponibilidades) => {
            res.status(200).json(disponibilidades);
        })
        .catch((error) => {
            res.status(400).json(error.message);
        });
});


router.post("/", authToken, (req, res) => {

    const usuario = req.usuario as any;
    const idUsuario = usuario.idUsuario;
    const justificativa = req.body.justificativa;

    const { horarios } = req.body;

    disponibilidadeController
        .salvarDisponibilidade(idUsuario, horarios,justificativa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error.message);
        });
});
/*
router.get("/minha-justificativa",(req, res) => {
    console.log("Rota minha-justificativa acessada");
    console.log("Dados do usuário:", req.usuario);
    disponibilidadeController.consultarMinhaJustificativa(req, res)
    

});

*/
export default router;