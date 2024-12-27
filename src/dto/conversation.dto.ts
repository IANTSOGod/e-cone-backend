import { IsNotEmpty } from 'class-validator';

export class ConversationDTO {
  @IsNotEmpty({ message: 'Champ obligatoire' })
  conversationId: number;
}
