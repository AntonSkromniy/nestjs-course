import { Request as Req } from 'express';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { LoginBodyDto, LoginResponseDto, ProfileResponseDto } from './dto';
import { LocalAuthGuard } from './local-auth-guard';
import { JWTAuthGuard } from './jwt-auth-guard';
import { AuthService } from './auth.service';

// [POST] http://localhost:8081/auth/login
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiBody({ type: LoginBodyDto })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Req) {
    console.log('AuthController login - 3');
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProfileResponseDto })
  @Get('profile')
  @UseGuards(JWTAuthGuard)
  async profile(@Request() req: Req) {
    console.log(req.user);
    return req.user;
  }
}
