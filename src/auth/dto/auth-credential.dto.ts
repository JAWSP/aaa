import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

//유저 생성에 관한 Dto를 생성한다
export class AuthCredentialsDto {
  //class-validator를 이용하여 각각 컬럼에 유효성 체크를 시킨다
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 넣게 Matches란 데코레이터를 넣음
  //2번째 인자는 만약에 저 조건이 아니라면 어찌 띄울것인가를 말함
  @Matches(/^[a-zA-Z0-9]*$/, { message: '비밀번호는 오직 영어랑 숫자만' })
  password: string;
}
