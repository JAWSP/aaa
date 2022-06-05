import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './auth.entity';
import { UserRespository } from './user.repository';
//jwt를 어찌 인증할지 정희하는 파일

//jwtStrategy를 다른곳에 사용하기 위하여 인젝터블 데코레이터를 넣어줌
@Injectable()
//상속해주는 클래스는 PassportStrategy
//그리고 상속해주는 클래스 안의 인자는 그냥 Strategy인데 기본전략인 passport-jwt를 사용하기 위하여 넣어줌
//그러니까 디폴트 설정을 넣어주기 위한 핑계수단이란거
//근데 저렇게 인자가 가능하긴 하나?
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRespository)
    private userRePository: UserRespository,
  ) {
    //super는 부모 컴포넌트를 사용하기 위한 키워드라고 한다
    super({
      //첫번쨰는 기존에 설정해둔 시크릿 메세지를 같은내용으로 정의하는거고
      //두번쨰는 클라이언트에서 어떤 형식의 토큰(여기서는 Bearer Tocken)을 가져올건지 결정한다
      secretOrKey: '비밀',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //여기서 부터 메소드임 앞은 의존성주입이고
  //그리고 그렇게 디코딩한 유저가 실제 DB에 저장된 유저인지 확인한다
  //아니면 에러 던져서 나가리
  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRePository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('앙기모찌');
    return user;
  }
}
