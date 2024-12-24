import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'champ email vide' })
  @IsEmail({}, { message: 'email invalide' })
  email: string;
  @IsNotEmpty({ message: 'champ password vide' })
  @MinLength(8, { message: 'mot de passe trop court' })
  password: string;
  @IsNotEmpty({ message: 'champ nom vide' })
  nom: string;
  @IsNotEmpty({ message: 'champ prenom vide' })
  prenom: string;
}
