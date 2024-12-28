import { Injectable } from '@nestjs/common';
import { ConvUserDTO } from 'src/dto/convUser.dto';
import { MessageDTO } from 'src/dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateMessage(data: MessageDTO) {
    try {
      const existingConv = await this.prismaService.conversation.findFirst({
        where: {
          OR: [
            { userId_1: data.senderId, userId_2: data.receiverId },
            { userId_1: data.receiverId, userId_2: data.senderId },
          ],
        },
      });
      if (existingConv) {
        const result = await this.prismaService.message.create({
          data: {
            conversationId: existingConv.id,
            senderId: data.senderId,
            receiverId: data.receiverId,
            content: data.content,
          },
        });
        if (result) {
          return result;
        }
      } else {
        const newConv = await this.prismaService.conversation.create({
          data: {
            userId_1: data.senderId,
            userId_2: data.receiverId,
          },
        });
        if (newConv) {
          const result = await this.prismaService.message.create({
            data: {
              senderId: data.senderId,
              receiverId: data.receiverId,
              content: data.content,
              conversationId: newConv.id,
            },
          });
          if (result) {
            return result;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllMessagesfromUser(data: ConvUserDTO) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          OR: [
            { userId_1: data.userId_1, userId_2: data.userId_2 },
            { userId_1: data.userId_2, userId_2: data.userId_1 },
          ],
        },
      });
      if (conversation) {
        const result = await this.prismaService.message.findMany({
          where: { conversationId: conversation.id },
        });
        return result;
      } else {
        const newConv = await this.prismaService.conversation.create({
          data: {
            userId_1: data.userId_1,
            userId_2: data.userId_2,
          },
        });
        if (newConv) {
          const result = await this.prismaService.message.findMany({
            where: {
              conversationId: newConv.id,
            },
          });
          return result;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getConv(data: ConvUserDTO) {
    try {
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          OR: [
            { userId_1: data.userId_1, userId_2: data.userId_2 },
            { userId_1: data.userId_2, userId_2: data.userId_1 },
          ],
        },
      });
      if (conversation) {
        return conversation;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
