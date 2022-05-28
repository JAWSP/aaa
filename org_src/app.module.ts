import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
//main의appmodule를 생성할때 요게 실행이 된다고 한다
//app모듈은 제일 기본이 되는 모듈, c의 main함수같은 그런건가보네
//여기서 모듈을 등록한다고 한다 모듈이 어플리케이션 비스므리한건가
export class AppModule {}
