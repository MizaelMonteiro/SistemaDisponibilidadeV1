import HorarioModel from "../models/horarioModel.ts";

export class HorarioController{

    buscar(){

        return HorarioModel.listar();
    }
}

export default new HorarioController();