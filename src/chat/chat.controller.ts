import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConversationDTO } from 'src/dto/conversation.dto';
import { Post, Body } from '@nestjs/common';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('getMessages')
  async getMessages(@Body() data: ConversationDTO) {
    return await this.chatService.getAllMessagesfromConv(data);
  }
}
