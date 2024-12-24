import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'champ email vide' })
  @IsEmail({}, { message: 'email invalide' })
  email: string;
  @IsNotEmpty({ message: 'champ password vide' })
  @MinLength(8, { message: 'mot de passe trop court' })
  password: string;
}
