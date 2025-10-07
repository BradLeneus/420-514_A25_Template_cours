import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

const router = Router();

let users: User[] = []; // Simuler une base de données en mémoire

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user: User = { 
        id: req.body.id,
        name: req.body.name, 
        email: req.body.email, 
        username: req.body.username, 
        role: req.body.role,
        password: hashedPassword 
    };
    console.log(user, hashedPassword);
    users.push(user);
    res.status(201).send('Utilisateur enregistré');
});

router.post('/login', async (req, res) => {
    const accessToken = await AuthService.login(req.body.email, await bcrypt.hash(req.body.password, 10));
    console.log(accessToken)
    if (accessToken) {
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});

export default router;