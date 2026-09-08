import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export function authToken(
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

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensagem: "Token não informado"
        });
    }

    try {

        const segredo = process.env.JWTSECRET;

        if (!segredo) {
            return res.status(500).json({
                mensagem: "JWTSECRET não configurado no servidor"
            });
        }

        const usuario = jwt.verify(token, segredo);
        req.usuario = usuario;
        
        next();

    } catch (error) {

        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });

    }
}