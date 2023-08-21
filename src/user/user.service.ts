import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
//import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateUserDto } from './dto/update-passwd.dto';
import { UserInterface } from './interfaces/user.interfaces';
import { v4 as uuidv4 } from 'uuid';
//import CatDb from './inMemoryUserDb';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const currentCatDto = createUserDto;
    //const timestamp = Date.now();
    const id = uuidv4();
    const rounds = 10;
    const hash = await bcrypt.hash(currentCatDto.password, rounds);

    const currentUser: UserInterface = {
      id: id,
      login: currentCatDto.login,
      password: hash,
      //version: 1,
      //createdAt: timestamp,
      //updatedAt: timestamp,
    };
    await this.userRepository.save(currentUser);
    const currentCat = await this.userRepository.findOneBy({ id });
    //CatDb.addUser(currentUser);
    return {
      id: currentCat.id,
      login: currentCat.login,
      version: currentCat.version,
      createdAt: new Date(currentCat.createdAt).valueOf(),
      updatedAt: new Date(currentCat.updatedAt).valueOf(),
    };
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find(); //CatDb.getAllUsers();
  }

  async findOne(id: string) {
    const currentUser: UserInterface = await this.userRepository.findOneBy({
      id,
    }); //CatDb.getUser(id);

    /*this.cats.forEach(cat => {
      if (cat.id == id) currentCat = cat
    });*/
    if (currentUser === null) return false;

    return {
      id: currentUser.id,
      login: currentUser.login,
      //password: currentUser.password,
      version: currentUser.version,
      createdAt: new Date(currentUser.createdAt).valueOf(),
      updatedAt: new Date(currentUser.updatedAt).valueOf(),
    };
  }
  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    //const currentUser: UserInterface = await this.userRepository.findOneBy({ id });//CatDb.getUser(id);
    const currentUser = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.login',
        'user.password',
        'user.version',
        'user.createdAt',
        'user.updatedAt',
      ])
      .where('user.id = :id', { id })
      .getOne();
    if (currentUser === null) return undefined;
    else {
      console.log('to update ', currentUser);
      //console.log(`comparing old ${updateUserDto.oldPassword} with new ${currentCat.password}`)
      const rounds = 10;
      const hash = await bcrypt.hash(updateUserDto.oldPassword, rounds);
      const isMatch = await bcrypt.compare(updateUserDto.oldPassword, currentUser.password);

      if (!isMatch /*hash !== currentUser.password*/) return false;
      const hashUpdate = await bcrypt.hash(updateUserDto.newPassword, rounds);
      currentUser.password = hashUpdate;
      //currentUser.version++;
      //currentUser.updatedAt = Date.now();
      if (updateUserDto.login) currentUser.login = updateUserDto.login;
      await this.userRepository.save(currentUser);
      //CatDb.updateUser(currentCat);
      //console.log("updated ", currentCat)
      //delete currentCat.password;
      return {
        id: currentUser.id,
        login: currentUser.login,
        //password: currentCat.password,
        version: currentUser.version,
        createdAt: new Date(currentUser.createdAt).valueOf(),
        updatedAt: new Date(currentUser.updatedAt).valueOf(),
      };
    }
  }

  async remove(id: string) {
    const currentUser: UserInterface = await this.userRepository.findOneBy({
      id,
    }); //CatDb.getUser(id);
    if (currentUser === null) return undefined;
    else {
      await this.userRepository.delete(id);
      //CatDb.deleteUser(id);
      return true;
    }
  }
}
