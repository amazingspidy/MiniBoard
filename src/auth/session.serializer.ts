import { Injectable } from '@nestjs/common';
import { PassportSerializer  } from '@nestjs/passport';
import { doesNotMatch } from 'assert';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  //세션에 정보 저장시 사용
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  //세션에서 정보를 꺼내올때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    
    if(!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}