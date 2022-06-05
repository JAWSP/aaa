import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';
import { UserRespository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '비밀',
      signOptions: {
        expiresIn: 3600, //인증 기한은 3600초
      },
    }),
    TypeOrmModule.forFeature([UserRespository]),
  ],
  controllers: [AuthController],
  //그리고 jwt를 providers에 넣어줘야 하는데
  //왜 imports를 쓰지 않고 providers에다 넣는 이유는 뭘까
  providers: [AuthService, jwtStrategy],
  //exports는 다른 모듈에 사용해주기 위함이라고 한다
  exports: [jwtStrategy, PassportModule],
})
export class AuthModule {}
