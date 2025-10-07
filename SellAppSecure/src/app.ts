import express, {Request, Response} from 'express';
import userRoutes from './v2/routes/user.route';
import authRoutes from './v2/routes/auth.route'
import { User } from './v2/interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from './v2/docs/swagger.v2.json';
// import productRoutes from './routes/product.route';
// import { errorMiddleware } from './middlewares/error.middleware';


const app = express();

// Définir les options de Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'User API',
        version: '1.0.0',
        description: 'A simple API to manage users',
      },
    },
    apis: ['./src/routes/*.ts'], // Fichier où les routes de l'API sont définies
};

// Générer la documentation à partir des options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Servir la documentation Swagger via '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());


// Limiter les requêtes
app.use(rateLimit({ windowMs: 60000, max: 50 }));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express! Connexion sécurisée.');
});
app.use('/', authRoutes);
app.use('/api', userRoutes);

// TODO: Ajouter productRoutes
// app.use('/api', productRoutes);

// TODO: Ajouter errorMiddleware
// app.use(errorMiddleware);
// Route de base

export default app;