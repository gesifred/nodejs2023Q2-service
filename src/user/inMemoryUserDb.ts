//import { v4 as uuidv4 } from 'uuid';
import { UserInterface } from './interfaces/user.interfaces';

class UserDb {
  private static readonly users: Map<string, UserInterface> = new Map<string, UserInterface>();

  /*constructor() {
        Db.users = new Map<string, UserInterface>();
    }*/

  static getUser(id: string): UserInterface | undefined {
    return UserDb.users.get(id);
  }

  static addUser(user: UserInterface): void {
    UserDb.users.set(user.id, user);
  }

  static deleteUser(id: string): boolean {
    return UserDb.users.delete(id);
  }

  static updateUser(user: UserInterface): boolean {
    //todo
    const record: UserInterface | undefined = UserDb.users.get(user.id);
    if (record) {
      /*let el: string;
            for (el of Object.keys(user)) {
                record[el as keyof] = user[el as keyof UserInterface];
            }*/
      Object.assign(record, user);
      UserDb.users.set(user.id, record);
      return true;
    }
    return false;
  }
  static getAllUsers(): Array<UserInterface> {
    const allUsers: Array<UserInterface> = [];
    for (const entry of UserDb.users.entries()) {
      console.log('adding', entry[0], entry[1] as UserInterface);
      const cleanUser: UserInterface = {
        id: '', // uuid v4
        login: '',
        password: '',
        version: 0, // integer number, increments on update
        //createdAt: 0, // timestamp of creation
        //updatedAt: 0, // timestamp of last update
      };
      Object.assign(cleanUser, entry[1]);
      delete cleanUser.password;
      allUsers.push(cleanUser);
    }
    return allUsers;
  }
}

export default UserDb;
