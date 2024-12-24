import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async senEmail(
    @Body() body: { to: string; subject: string; text: string; html?: string },
  ) {
    return this.emailService.sendEmail(body);
  }
}
