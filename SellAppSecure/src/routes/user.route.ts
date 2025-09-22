import { Router, Request, Response } from "express";
import { User } from '../interfaces/user.interface';
import { UserController } from "../controllers/user.controller";


const router = Router();

const userController = new UserController();


router.get('/users', userController.getAllUsers);

  
// Route pour obtenir un utilisateur par ID
router.get('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id ? parseInt(req.params.id, 10) : null ;
    // const user = users.find(u => u.id === userId);

    // if (user) {
    //     res.json(user);
    // } else {
    //     res.status(404).send('User not found');
    // }
});



export default router;