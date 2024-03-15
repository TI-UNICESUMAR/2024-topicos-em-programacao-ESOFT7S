import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0/store-project'), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
