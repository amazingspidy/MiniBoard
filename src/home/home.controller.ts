import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AutenticatedGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('/')
export class HomeController {
  //constructor(private readonly userService: UserService) {}
  @UseGuards(AutenticatedGuard)
  @Get()
  @Render('home')
  async homePage(@Req() req: Request) {
    console.log('User info from session:', req.session);
  }
}
