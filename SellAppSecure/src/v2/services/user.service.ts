import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

const users: User[] = [
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', username: 'jane.doe', password: '', role: 'admin' },
];

export class UserService {
  public static async getAllUsers(): Promise<User[]> {
    // Logique pour récupérer tous les utilisateurs
    // TODO: map sur users et créer le UserModel
    return [new UserModel(1, 'John Doe', 'john.doe@example.com', 'john.doe', '', 'admin')];
  }

  public static findByEmail(email: string) {
    return this.getAllUsers().then(users=> users.filter(user => user.email === email)[0]);
  }

  // TODO: ajouter la logique ici
//   public static async getUserById(userId: number): Promise<User>{
        
//   }
}