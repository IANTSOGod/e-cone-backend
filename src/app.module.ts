import { Module } from '@nestjs/common';
import { AuthentificationModule } from './authentification/authentification.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthentificationModule,
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
