import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //localhost:3000/auth/signup <- 앤드포인트
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(AuthCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessTocken: string }> {
    return this.authService.signIn(AuthCredentialsDto);
  }

  //요청 객체를 보는 메소드
  @Post('/test')
  //AuthGuard를 이용하면 토큰이 없거나 잘못되면 에러를 던질 수 있으며
  //요청메세지(서버로부터)에서 jwt.strategy에서 리턴한 유저의 정보에 대한 객체를 넣을 수 있다고 한다
  //어떻게 처리하고 넣냐고? 기적의 미들웨어 Guard가 알아서 해주는듯하다
  //그러니까 저 AuthGuard가 있어야지 jwt.strategy에 접근해서 그 파일안의 validate메소드를 접근하여 유효성이
  //맞는지 판단하고 맞다면 서버가 보내는 메세지안에 유저객체를 넣어준다
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user', user);
  }
  //test(@Req() req) {
  //  //console.log('req', req);
  // }
}
