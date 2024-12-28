import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConvUserDTO } from 'src/dto/convUser.dto';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('getMessages')
  async getMessages(@Body() data: ConvUserDTO) {
    return this.chatService.getAllMessagesfromUser(data);
  }

  @Post('getConv')
  async getConv(@Body() data: ConvUserDTO) {
    return this.chatService.getConv(data);
  }
}
