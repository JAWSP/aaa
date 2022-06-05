import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './auth.entity';

//요청 메세지 안에 유저객체가 있을경우, 요청 메세지를 거치지 않고 유저 데이터를 얻고 싶을떄
//createParamDecorator를 이용하면 이 GetUser메소드는 데코레이터가 된다
export const GetUser = createParamDecorator(
  //ctx는 컨택스트의 약자
  //라 해도 저 인자 둘이 뭔지 모르겠는뎁쇼
  (data, ctx: ExecutionContext): User => {
    //요 메소드를 이용하면 요청 메세지 전문을 긁어모을 수 있다고 한다
    const req = ctx.switchToHttp().getRequest();

    //우리가 원하는건 유저객체뿐이니 유저 객체만 긁어서 리턴한다
    return req.user;
  },
);
