import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
//어플리케이션을 생성하고
//app모듈은 제일 기본이 되는 모듈이라고 한다
//소스 디렉토리에선 비즈니스 코드(?)들이 다 있다고 한다
