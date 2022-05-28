import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // = @get('/')
  getHello(): string {
    return this.appService.getHello();
    //get 요청을 보냈으면 저 메소드를 호출하여 response
  }
}
