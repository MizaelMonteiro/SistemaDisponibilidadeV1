import { Router } from "express";


import { authToken } from "../middlewares/authToken.ts";
import horarioController from "../controllers/horarioController.ts";

const router = Router();

router.get("/", authToken, (req, res) => {

    const listaHorarios = horarioController.buscar()

    listaHorarios
        .then((horarios) => res.status(200).json(horarios))
        .catch((error) => res.status(400).json(error.message));

});

export default router;