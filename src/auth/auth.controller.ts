import { Body, Controller, Get, Post, Request, Response, UseGuards, Res, Render, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { AutenticatedGuard, LocalAuthGuard, LoginGuard, GoogleAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Get('register')
  registerPage(@Response() res) {
    res.render('register');
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) { //Body에 유저정보실어옴.
    //return await this.authService.register(userDto);
    try {
      await this.authService.register(userDto);
      return { status: 'success', message: '회원가입 성공! 로그인 후 접속해주세요'};
    }
    catch (err) {
      return { status: 'failed', message: err.response};
    }
  }

  @Get('login')
  loginPage(@Response() res) {
    res.render('login');
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      //쿠키 설정해주기.
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 10 * 60 * 24 * 7,
      });
      return res.send({ message: 'login success' });
    }
    return res.status(401).send({ message: 'login failed' });
  }

  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
    }
    return res.send({ message: 'login2 success ' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인 된때만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  async login3(@Request() req, @Response() res) {
    //return res.redirect('success');
    const user = await this.authService.validateUser(req.body.email, req.body.password);
      if (!user) {
        console.log('불일치함.')
        
      }
      
      else {
      //console.log(user);
      req.user = user;

      return res.redirect('success');
      }
  }

  @UseGuards(AutenticatedGuard)
  @Get('success')
  @Render('authentichome')
  gotosuccess(@Request() req) {
    return { user: req.user };
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }  //구글 로그인창을 띄우는 메서드?


  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) { //구글 로그인 성공시 실행하는 메서드
    const { user } = req;  // 요청에서 유저정보 뽑아내고
    req.session.user = user; // 세션에 유저 정보 저장
    return res.redirect('/'); // 홈페이지로 리다이렉트
  }
}
