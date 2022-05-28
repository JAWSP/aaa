/*
이제 엔티티로 저장하기 떄문에 지운다
export interface Board {
  id: string;
  title: string;
  description: string;
  //요놈은 공개냐 비공개냐 나눠주는거
  status: BoardStatus;
}
*/

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
