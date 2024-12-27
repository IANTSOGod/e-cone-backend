import { Injectable } from '@nestjs/common';
import { ConversationDTO } from 'src/dto/conversation.dto';
import { MessageDTO } from 'src/dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateMessage(data: MessageDTO) {
    try {
      const conversation = await this.prismaService.conversation.create({
        data: {
          userId_1: data.senderId,
          userId_2: data.receiverId,
        },
      });
      if (conversation) {
        const response = await this.prismaService.message.create({
          data: {
            senderId: data.senderId,
            receiverId: data.receiverId,
            conversationId: conversation.id,
            content: data.content,
          },
        });
        if (response) {
          return response;
        }
      } else {
        return { message: 'Conversation impossible', status: 401 };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllMessagesfromConv(data: ConversationDTO) {
    try {
      const messages = await this.prismaService.message.findMany({
        where: { conversationId: data.conversationId },
      });
      if (messages) {
        return messages;
      } else {
        return { message: 'Aucun message', status: 201 };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
