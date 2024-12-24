import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthentificationService } from './authentification.service';
import { VerifyEmailDto } from 'src/dto/verify.dto';
import { JwtAuthGuard } from './jwt.authGuard';
import { RequestWithUser } from './jwt.strategy';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Post('login')
  async Login(@Body() body: LoginDTO) {
    return this.authService.Login(body);
  }

  @Post('verify')
  async Verify(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/confirmMail')
  async setVerify(@Request() request: RequestWithUser) {
    return this.authService.setVerifiedEmail({ id: request.user.userId });
  }
}
