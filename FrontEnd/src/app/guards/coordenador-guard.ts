import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import {jwtDecode} from "jwt-decode";

interface TokenUsuario {
    nivelAcesso: "PROFESSOR" | "COORDENADOR";
}

export const coordenadorGuard: CanActivateFn = () => {
    const router = inject(Router);
    const token = localStorage.getItem("token");

    if (!token) {
        return router.createUrlTree(["/login"]);
    }

    try {
        const usuario = jwtDecode<TokenUsuario>(token);

        if (usuario.nivelAcesso === "COORDENADOR") {
            return true;
        }
        alert("Acesso negado. Apenas coordenadores podem acessar esta rota.");
    } catch {
        // Token malformado.
    }

    return router.createUrlTree(["/"]);
};