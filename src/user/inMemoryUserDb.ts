//import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/user.interfaces';

class UserDb {
  private static readonly users: Map<string, User> = new Map<string, User>();

  /*constructor() {
        Db.users = new Map<string, User>();
    }*/

  static getUser(id: string): User | undefined {
    return UserDb.users.get(id);
  }

  static addUser(user: User): void {
    UserDb.users.set(user.id, user);
  }

  static deleteUser(id: string): boolean {
    return UserDb.users.delete(id);
  }

  static updateUser(user: User): boolean {
    //todo
    const record: User | undefined = UserDb.users.get(user.id);
    if (record) {
      /*let el: string;
            for (el of Object.keys(user)) {
                record[el as keyof] = user[el as keyof User];
            }*/
      Object.assign(record, user);
      UserDb.users.set(user.id, record);
      return true;
    }
    return false;
  }
  static getAllUsers(): Array<User> {
    const allUsers: Array<User> = [];
    for (const entry of UserDb.users.entries()) {
      console.log('adding', entry[0], entry[1] as User);
      const cleanUser: User = {
        id: '', // uuid v4
        login: '',
        password: '',
        version: 0, // integer number, increments on update
        createdAt: 0, // timestamp of creation
        updatedAt: 0, // timestamp of last update
      };
      Object.assign(cleanUser, entry[1]);
      delete cleanUser.password;
      allUsers.push(cleanUser);
    }
    return allUsers;
  }
}

export default UserDb;
