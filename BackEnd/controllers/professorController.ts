import professorModel from "../models/professorModel.ts";


export class ProfessorController{
    buscarTodos() {
        return professorModel.obterTodosProfessores();
    }   

    buscarProfessor(idUsuario: number) {
        return professorModel.buscarProfessorPorUsuario(idUsuario);
    }

}

export default new ProfessorController();