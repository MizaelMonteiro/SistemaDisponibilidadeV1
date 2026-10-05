import professorModel from "../models/professorModel.ts";


export class ProfessorController{

  buscarProfessor(idUsuario: number) {
        return professorModel.buscarProfessorPorUsuario(idUsuario);
    }
}

export default new ProfessorController();