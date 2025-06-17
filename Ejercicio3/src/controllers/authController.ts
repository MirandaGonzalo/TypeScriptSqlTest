import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const { user, password } = req.body;

        if (!user || !password) {
            res.status(401).json({ message: 'Datos inválidos' });
            return;
        }
        try {
            const password = "admin123";
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const usuarioCreado = {
                usuario: "admin",
                password: hashedPassword, 
                id: 1
            };
            if (usuarioCreado.usuario !== user) {
                res.status(401).json({ message: 'Datos inválidos' });
                return;
            }

            const sonIguales = await bcrypt.compare(password, usuarioCreado.password);

            if (!sonIguales) {
                res.status(401).json({ message: 'Datos inválidos' });
                return;
            }
            const payload = { user: { id: usuarioCreado.id, email: usuarioCreado.usuario } };

            jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1 * 60 * 60 * 1000
                });
                res.json({ message: 'Usuario Autenticado' });
                return;
            });
        } catch (error) {        
            res.status(500).send('Error del servidor');
            return;
        }
    };
}