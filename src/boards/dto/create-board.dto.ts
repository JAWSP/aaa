import { IsNotEmpty } from 'class-validator';

//제목과 description이 비어있는지 아닌지 확인을 해주는놈이다
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
