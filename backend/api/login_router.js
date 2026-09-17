import express from 'express';
import dependencies from '../dependencies.js';

const { loginService } = dependencies;

const loginRouter = express.Router();

loginRouter.post('/', async (req, res, next) => {
    try {
        const login = await loginService.login(req.body);

        res.setHeader('Authorization', `Bearer ${login.authorizationToken}`);

        res.status(200).json({
            username: login.username,
            role: login.role,
            token: login.authorizationToken
        });
    } catch (error) {
        if (
            error.message === 'Nombre de usuario y contraseña son obligatorios.' ||
            error.message === 'Usuario no encontrado.' ||
            error.message === 'Contraseña incorrecta.'
        ) {
            return res.status(401).json({
                status: "error",
                message: error.message
            });
        }
        next(error);
    }
});

export default loginRouter;