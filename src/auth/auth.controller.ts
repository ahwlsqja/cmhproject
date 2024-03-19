import { Body, Controller, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdatehostDto } from "src/users/dto/update-token";
import { LoginDto } from "src/users/dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserInfo } from "src/utils/userInfo.decorator";
import { Users } from "src/users/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sing-up")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie("authorization", `Bearer ${user.access_token}`);
    res.send("로그인 완료");
  }
}
