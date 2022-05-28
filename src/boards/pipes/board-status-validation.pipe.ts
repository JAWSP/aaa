import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

//요놈은 상태를 바꿔주는 커스텀 파이프인데
//만약에 PUBLIC, PRIVATE의 상태가 아닌경우에는 죄다 나가리 시킨다

export class BoardStatusValidationPipe implements PipeTransform {
  //요건 읽기전용 객체
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  //커스텀 파이프를 쓸떄에는 transform메소드를 쓴다
  //해당 메소드는 2개가 있긴한데
  //희얀하게 메타데이타는 안쓰면 지워도 된단다

  transform(value: any, metadata: ArgumentMetadata) {
    //먼저 요청받은 놈들을 죄다 대문자화 시킨다
    value = value.toUpperCase();

    //그리고 받은 요청이 유효한지 판별한다 아니라면 예외처리
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value} 안먹히네요~ 어쩔티비~ 저쩔티비~ 화나죠?~ 근데 네탓이죠? 뭐라 못하죠?`,
      );
    }
    console.log('value', value);
    console.log('meatadata', metadata);

    return value;
  }
  //여기서 유효인지 무효인지 판단하는데
  //위에 만들어 두었던 StatusOptions의 요소들을 비교해가면서 네가 요청한거랑 비교 객체에 있는걸 비교하고(indexOf)
  //만약에 indexOf가 없다고 판단하면 -1을 뱉는다, 아니면 해당 인덱스에 해당되는 값을 밭고
  //그리고 리턴된 값을 받은 index가 -1인지 아닌지 판별한다

  private isStatusValid(status) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
