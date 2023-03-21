import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dummyuser:mypassword@cluster0.sweantc.mongodb.net/task-tracker'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
