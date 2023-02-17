import { Request as Req } from 'express';
import { Controller, Get, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

// [POST] http://localhost:8081/auth/login
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  async getUserById(@Request() req: Req) {
    const { username } = req.body;
    const user = await this.userService.findOne(username, 'username');
    if (!user) {
      throw new NotFoundException();
    } else {
      const { id, username } = user;
      return { id, username };
    }
  }

  @Get('id')
  async getUserByName(@Request() req: Req) {
    const { id } = req.body;
    const user = await this.userService.findOne(id, 'userId');
    if (!user) {
      throw new NotFoundException();
    } else {
      const { id, username } = user;
      return { id, username };
    }
  }
}
