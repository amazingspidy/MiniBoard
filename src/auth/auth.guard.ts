import { CanActivate, ExecutionContext, Injectable , UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.cookies['login']) {
      return true;
    }

    if (!request.body.email || !request.body.password) {
      return false;
    }

    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}

//로컬 인증 전략을 사용하여 요청을 인증하고, 인증이 성공하면 인증 세션을 시작하는 역할을 수행
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { //AuthGuard 상속
  async canActivate(context: any): Promise<boolean> {
    //부모 클래스인 AuthGuard('local')의 canActivate 메서드를 호출
    // const result = (await super.canActivate(context)) as boolean;

    // const request = context.switchToHttp().getRequest();
    // await super.logIn(request);
    // return result;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);
      return result;
    } catch (err) {
      response.redirect('/?error_msg=로그인 실패! 다시 로그인해주세요!'); // 홈으로 리다이렉트
      return false;
      //throw new UnauthorizedException('인증 정보가 일치하지 않습니다.');
    }
  }
}

//요청이 인증되었는지 확인하고, 인증되었을 경우에만 요청을 허용하는 역할
@Injectable()
export class AutenticatedGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('canActivate is called');
    console.log('isAuthenticated:', request.isAuthenticated());
    return request.isAuthenticated();
  }
}


//구글 어스 가드.
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;  //여기서 GoogleStrategy validate실행.
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // 세션에 적용함.
    return result;
  }
}