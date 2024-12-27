import { Module } from '@nestjs/common';
import { AuthentificationModule } from './authentification/authentification.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthentificationModule,
    UserModule,
    EmailModule,
    ChatModule,
  ],
  controllers: [],
  providers: [AppGateway, ChatService, PrismaService],
})
export class AppModule {}
