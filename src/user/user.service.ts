import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { VerifyEmailDto } from 'src/dto/verify.dto';
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
      return { message: 'Duplicate email', status: 500 };
    }
  }

  async deleteUser({ email }: VerifyEmailDto) {
    try {
      await this.prismaService.user.delete({
        where: {
          email: email,
        },
      });
      return { message: 'Utilisateur supprimé', status: 200 };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          email: true,
          nom: true,
          prenom: true,
        },
      });
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
