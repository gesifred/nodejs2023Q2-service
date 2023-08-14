import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-passwd.dto';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCatDto: CreateUserDto) {
    //console.log(createCatDto);
    return await this.userService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid userId'); //400
    const resp = await this.userService.findOne(id);
    if (!resp) {
      throw new NotFoundException(`user ${id} doesnt exist in database`);
    } else {
      return resp;
    }
  }
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const cat = await this.userService.updatePassword(id, updateUserDto);
    if (cat === undefined)
      throw new NotFoundException(`user ${id} doesnt exist in database`);
    else if (cat === false)
      throw new ForbiddenException(`wrong password for user ${id}`); //403
    else return cat;
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.userService.remove(id)) return 'User was found and deleted';
    else throw new NotFoundException(`user ${id} doesnt exist in database`);
  }
}
