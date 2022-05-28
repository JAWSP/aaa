import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  //요걸 리턴하면 웹사이트에 출력이 된다고 한다
}
