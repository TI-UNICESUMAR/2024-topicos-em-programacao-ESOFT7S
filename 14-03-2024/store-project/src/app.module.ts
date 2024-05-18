import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0/store-project'), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
