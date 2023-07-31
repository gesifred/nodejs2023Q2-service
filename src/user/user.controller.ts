import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, NotFoundException, Put, ForbiddenException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-passwd.dto';
import { v4 as uuidv4, validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateUserDto) {
    console.log(createCatDto);
    return this.userService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid userId'); //400
    const resp = this.userService.findOne(id);
    if (!resp) {
      throw new NotFoundException(`user ${id} doesnt exist in database`);
    } else {
      return resp;
    }
  }
  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const cat  = this.userService.updatePassword(id, updateUserDto);
    if(cat === undefined)
      throw new NotFoundException(`user ${id} doesnt exist in database`);
    else if(cat === false)
      throw new ForbiddenException(`wrong password for user ${id}`) //403
    else 
      return cat;
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (this.userService.remove(id))
      return "User was found and deleted"
    else 
      throw new NotFoundException(`user ${id} doesnt exist in database`);
  }
}
