import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { VerifyEmailDto } from 'src/dto/verify.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async Login({ email, password }: LoginDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const match = await compare(password, user.password);
        if (match) {
          if (user.verified === true) {
            const payload = await this.generatePayload({ userId: user.id });
            const access_token = payload.access_token;
            return access_token;
          } else {
            return { message: 'Email non vérifié', status: 401 };
          }
        } else {
          return { message: 'Incorrect password', status: 401 };
        }
      } else {
        return { message: 'User not found', status: 404 };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verifyEmail({ email }: VerifyEmailDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const payload = await this.generatePayload({ userId: user.id });
        const access_token = payload.access_token;
        try {
          const htmlContent = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      body {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
      }
      .welcome {
        text-align: center;
        font-size: xx-large;
        color: white;
        padding-top: 30px;
        margin: 0;
      }

      .description {
        margin: 0;
        font-size: 20px;
      }

      .tokenInput {
        margin-top: -130px;
        margin-left: 100px;
        width: 400px;
        height: 60px;
        border-radius: 10px;
        font-size: 16;
        border: 0px;
      }
      .header {
        background-color: rgb(226, 95, 1);
        width: 600px;
        height: 100px;
        margin-top: 0;
        padding-top: 0;
      }

      .main {
        background-color: rgb(211, 205, 205);
        width: 600px;
        height: 400px;
        margin-top: 0;
        padding-top: 0;
        text-align: center;
        display: grid;
        grid-row: 1;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="header">
        <p class="welcome">Welcome to e-cone</p>
      </div>
      <div class="main">
        <p class="description">Copy this token to validate your email</p>
        <input type="text" value=${access_token} class="tokenInput" />
      </div>
    </div>
  </body>
</html>
        `;
          const resp = await this.emailService.sendEmail({
            to: user.email,
            subject: 'Give access token',
            text: `This is your access_token: ${access_token}`,
            html: htmlContent,
          });
          if (resp) {
            return { message: 'Un token envoyé', status: 200 };
          }
        } catch (error) {
          throw new Error(error);
        }
      } else {
        return { message: 'User not found' };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setVerifiedEmail({ id }: { id: string }) {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          verified: true,
        },
      });
      if (user) {
        return { message: 'email verifié' };
      } else {
        return { message: 'User not found' };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async generatePayload({ userId }: UserPayload) {
    const token = await this.jwtService.signAsync({ userId });
    return {
      access_token: token,
    };
  }
}
