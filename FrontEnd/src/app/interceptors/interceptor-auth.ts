import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem('token');



    if (token) {

        const requisicaoComToken = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next(requisicaoComToken);
    }
    console.log("Nenhum token encontrado, prosseguindo sem adicionar cabeçalho de autorização.");

    return next(req);
};