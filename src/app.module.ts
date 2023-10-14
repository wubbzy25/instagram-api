import { Module } from '@nestjs/common';
import { AuthModule } from './users/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Task } from './tasks/entities/task.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/like.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Image } from './images/entities/image.entity';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { FollowsModule } from './follows/follows.module';
import { Follow } from './follows/entities/follows.entity';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    CommentsModule,
    CommentsModule,
    LikesModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'socialmedia',
      entities: [User, Task, Comment, Like, Image, Follow],
      synchronize: true,
    }),
    ImagesModule,
    MulterModule.register({ dest: './uploads' }),
    FollowsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
