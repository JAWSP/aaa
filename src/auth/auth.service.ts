import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRespository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //user리포지토리 의존성 주입
  constructor(
    @InjectRepository(UserRespository)
    private userRespository: UserRespository,
    private jwtService: JwtService,
  ) {}

  //회원 가입시 저장해주는거
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRespository.createUser(authCredentialsDto);
  }

  //로그인
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessTocken: string }> {
    //입력받은 유저네임, 패스워드를 받고
    //해당 유저가 있는지 찾아본다 없으면 없는 값이 나오겠지(undefined같은거)
    const { username, password } = authCredentialsDto;
    const user = await this.userRespository.findOne({ username });

    //입력받은 패스워드를 bcrypt시켜서 기존에 등록된 패스워드랑 비교를 해본다
    if (user && (await bcrypt.compare(password, user.password))) {
      //로그인 성공시 유저 토큰을 생성
      //준비율인 secret + Payload, 페이로드도 중요하니까 함부로 유출하면 안됨
      const payload = { username };
      //sign메소드가 페이로드랑 시크릿을 합쳐서 토큰을 만들어주게 한다
      const accessTocken = await this.jwtService.sign(payload);

      return { accessTocken };
    } else {
      //만약 아이디/비번중 하나라도 틀리면 에러를 던져준다
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
