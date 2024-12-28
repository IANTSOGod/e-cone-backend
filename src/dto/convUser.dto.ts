import { IsNotEmpty } from 'class-validator';

export class ConvUserDTO {
  @IsNotEmpty({ message: 'Champ obligatoire' })
  userId_1: string;
  @IsNotEmpty({ message: 'Champ obligatoire' })
  userId_2: string;
}
