import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  //const port = 3000;
  await app.listen(port);
  //여기서 로그를 남겨주는데, nestjsd에서는 로거 클래스(?)가 내장탑제(빌트인)되었다고함
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
//어플리케이션을 생성하고
//app모듈은 제일 기본이 되는 모듈이라고 한다
//소스 디렉토리에선 비즈니스 코드(?)들이 다 있다고 한다
