import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";



export function authCoordenador(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Token não informado"
        });
    }

    const usuario = req.usuario as JwtPayload;

    if (usuario.nivelAcesso !== "COORDENADOR") {
        return res.status(403).json({
            mensagem: "Acesso permitido somente para coordenadores."
        });
    }

    const token = authHeader.split(" ")[1];



    next();
}