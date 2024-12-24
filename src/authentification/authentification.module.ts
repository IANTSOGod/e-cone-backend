import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthentificationController],
  providers: [
    AuthentificationService,
    PrismaService,
    EmailService,
    JwtStrategy,
  ],
})
export class AuthentificationModule {}
