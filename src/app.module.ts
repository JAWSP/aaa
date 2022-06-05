import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

//기존 설정해 두었던 ORM설정을 모듈에 연결함
//forRoot안에 넣어둔 설정은 모든 서브모듈에 다 적용이 된다
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
})
//main의appmodule를 생성할때 요게 실행이 된다고 한다
//app모듈은 제일 기본이 되는 모듈, c의 main함수같은 그런건가보네
//여기서 모듈을 등록한다고 한다 모듈이 어플리케이션 비스므리한건가
export class AppModule {}
