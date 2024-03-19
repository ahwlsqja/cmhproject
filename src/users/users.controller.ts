import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserInfo } from 'src/utils/userInfo.decorator';
import { Users } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdatehostDto } from './dto/update-token';


@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@UserInfo() user : Users) {

    if(user.IsAdmin === false){
      throw new Error("권한이 존재하지 않습니다.");
    }

    return await this.usersService.findAll();
  }

  @Get("profile/:id")
  async findOne(@Param("id") id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@UserInfo() user : Users, 
  @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("token")
  async tokenupdate(
    @Body() email: string,
    emailtoken: string,
    @Body() updatehostDto: UpdatehostDto,
    @UserInfo() user: Users,
  ) {

    if(emailtoken !== user.emailtoken){
      throw new Error("인증 번호가 맞지 않습니다.");
    }
    
    return await this.usersService.tokenupdate(email, updatehostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async remove(@UserInfo() user : Users) {
    return await this.usersService.remove(user.id);
  }

}
