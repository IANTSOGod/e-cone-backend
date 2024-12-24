import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser({ email, nom, prenom, password }: SignUpDto) {
    const hashedPassword = await hash(password, 10);
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: email,
          nom: nom,
          prenom: prenom,
          password: hashedPassword,
        },
        select: {
          password: false,
          email: true,
          nom: true,
          prenom: true,
        },
      });
      if (newUser) {
        return newUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
