import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/dto/getUserDecorator';
import { User } from 'src/users/entities/user.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';

@Controller('follows')
@UseGuards(AuthGuard('jwt'))
export class FollowsController {
  constructor(private readonly followsSerive: FollowsService) {}

  @Get()
  findAll() {
    return this.followsSerive.findAll();
  }

  @Get('/follower/:followerId')
  isFollowed(
    @Param('followerId', ParseIntPipe) followerId: number,
    @Query('following', ParseIntPipe) followingId: number,
  ) {
    const relation = this.followsSerive.isFollowed(followerId, followingId);
    return relation;
  }

  @Get('/user/:userId')
  getNumOfFollowersFollowing(@Param('userId', ParseIntPipe) userId: number) {
    return this.followsSerive.getNumOfFollowersFollowing(userId);
  }

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsSerive.create(createFollowDto);
  }

  @Delete(':relation_id')
  delete(@Param('relation_id', ParseIntPipe) relationId: number) {
    return this.followsSerive.delete(relationId);
  }
}
