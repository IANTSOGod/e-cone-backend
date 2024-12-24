import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty({ message: 'champ vide' })
  @IsEmail({}, { message: 'email invalide' })
  email: string;
}
