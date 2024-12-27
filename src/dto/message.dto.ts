import { IsNotEmpty } from 'class-validator';

export class MessageDTO {
  @IsNotEmpty({ message: 'senderId is required' })
  senderId: string;
  @IsNotEmpty({ message: 'receiverId is required' })
  receiverId: string;
  @IsNotEmpty({ message: 'content is required' })
  content: string;
}
