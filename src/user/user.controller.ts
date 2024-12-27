import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from 'src/dto/signUp.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: SignUpDto) {
    return this.userService.createUser(body);
  }

  @Get('list')
  async list() {
    return this.userService.getAllUsers();
  }
}
