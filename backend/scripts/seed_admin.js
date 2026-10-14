import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config.js';
import UserModel from '../mongo_models/user_model.js';

async function seedAdmin() {
    try {
        console.log('Conectando a la base de datos...');
        await mongoose.connect(config.dbConnection);
        console.log('Conexión establecida.');

        const defaultUsers = [
            {
                username: 'uliadmin',
                displayName: 'Ulises Admin',
                email: 'admin@correo.com',
                passwordPlain: 'admin',
                role: 'admin'
            },
            {
                username: 'admin',
                displayName: 'Administrador',
                email: 'admin_general@correo.com',
                passwordPlain: 'admin',
                role: 'admin'
            }
        ];

        for (const user of defaultUsers) {
            const exists = await UserModel.findOne({ username: user.username });
            if (exists) {
                console.log(`El usuario '${user.username}' ya existe.`);
            } else {
                const hashedPassword = await bcrypt.hash(user.passwordPlain, 10);
                await UserModel.create({
                    username: user.username,
                    displayName: user.displayName,
                    email: user.email,
                    password: hashedPassword,
                    role: user.role
                });
                console.log(`Usuario '${user.username}' creado exitosamente (contraseña: '${user.passwordPlain}', rol: '${user.role}').`);
            }
        }

        console.log('Seed completado.');
    } catch (error) {
        console.error('Error al inicializar usuarios:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de la base de datos.');
    }
}

seedAdmin();
