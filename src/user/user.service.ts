import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
//import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateUserDto } from './dto/update-passwd.dto';
import { User } from './interfaces/user.interfaces';
import { v4 as uuidv4 } from 'uuid';
import CatDb from './inMemoryUserDb';
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const currentCatDto = createUserDto;
    const timestamp = Date.now();
    const currentCat: User = {
      id: uuidv4(),
      login: currentCatDto.login,
      password: currentCatDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    CatDb.addUser(currentCat);
    return {
      id: currentCat.id,
      login: currentCatDto.login,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    return 'This action adds a new user';
  }

  findAll() {
    return CatDb.getAllUsers();
  }

  findOne(id: string) {
    let currentUser: User = CatDb.getUser(id);

    /*this.cats.forEach(cat => {
      if (cat.id == id) currentCat = cat
    });*/
    if (currentUser === undefined)
      return false

    return {
      id: currentUser.id,
      login: currentUser.login,
      //password: currentUser.password,
      version: currentUser.version,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
    }
  }
  updatePassword(id: string, updateUserDto: UpdateUserDto) {
    let currentCat: User = CatDb.getUser(id);
    if (currentCat === undefined)
      return undefined
    else {
      console.log("to update ", currentCat);
      //console.log(`comparing old ${updateUserDto.oldPassword} with new ${currentCat.password}`)
      if (updateUserDto.oldPassword !== currentCat.password)
        return false
      currentCat.password = updateUserDto.newPassword
      currentCat.version++;
      currentCat.updatedAt = Date.now();
      if (updateUserDto.login) currentCat.login = updateUserDto.login;
      CatDb.updateUser(currentCat);
      //console.log("updated ", currentCat)
      //delete currentCat.password;
      return {
        id: currentCat.id,
        login: currentCat.login,
        //password: currentCat.password,
        version: currentCat.version,
        createdAt: currentCat.createdAt,
        updatedAt: currentCat.updatedAt,
      }
    }
  }

  remove(id: string) {
    let currentUser: User = CatDb.getUser(id);
    if (currentUser === undefined)
      return undefined;
    else {
      CatDb.deleteUser(id);
      return true;
    }
  }
}
