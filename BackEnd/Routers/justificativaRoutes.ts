import { Router } from "express";

import disponibilidadeController from "../controllers/disponibilidadeController.ts";

import { authToken } from "../middlewares/authToken.ts";
import { authCoordenador } from "../middlewares/authCoordenador.ts";

const router = Router();

// Professor consulta a própria justificativa.
router.get("/", authToken, (req, res) => {
    disponibilidadeController.consultarMinhaJustificativa(req, res);
});

// Coordenador consulta a justificativa de um professor específico.
router.get(
    "/professor/:idProfessor",
    authToken,
    authCoordenador,
    disponibilidadeController.consultarJustificativaProfessor
);

export default router;