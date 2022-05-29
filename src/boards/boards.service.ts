import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
//import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repositiory';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  //id에 맞는 게시물을 찾기
  async getBoardById(id: number): Promise<Board> {
    //영상에서는 findOne메소드를 쓰라고 했지만 ORM의 버전차이떄문에 이제부터 findOneBy메소드를 써야한다
    //추가)0.2로 다운그레이드 했읍니다
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`응 아니야 응 아니아니야 ${id}따윈 없는거야`);
    }
    return found;
  }

  //게시물을 생성
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    //새로운 게시물을 생성, 이전과 달리 ORM에서 알아서 번호를 주기 떄문에 uuid가 필요없음
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    //await로 하는 이유는 이게 비동기로 동작이 이루어지기 때문에 충분히 결과를 받고 난 뒤 리턴할려고
    await this.boardRepository.save(board);

    return board;
  }

  /*
  //모든 데이터를 뿌리기
  //그 옆의 : 뒤는 리턴값을 나타냄
  //CRUD의 R
  getAllBoards(): Board[] {
    return this.boards;
  }

  //id를 기준으로 특정 게시물을 찾기
  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    //만약에 없다면 예외 인스턴스르 뱉는다
    if (!found) {
      //해당 예외는 Nestjs에 기본적으로 있는놈이라고함

      throw new NotFoundException(`응 아니야 응 아니아니야 ${id}따윈 없는거야`);
    }
    return found;
  }

  //CRUD의 C
  //게시판의 게시물 만들기
  
  //dto 적용전
  createBoard(title: string, description: string) {
    const board: Board = {
      //이러면 유니크한 id값을 줄 수 있다고 한다
      id: uuid(),
      //title: title,
      //description: description,
      //와 같다고 한다
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    
  //dto 적용후
  createBoard(createBoardDto: CreateBoardDto) {
    //    const title = createBoardDto.title;
    //아래와 같음
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    //그리해서 게시물들의 집합인 boards에서
    //방금 만든 board를 push한다
    this.boards.push(board);
    return board;
  }

  //특정 id를 가지는 게시물을 지우기
  //filter메소드는 해당 조건에 부합하는 얘들로 다시 재정비를 시키는것이라고 한다
  //특정 게시물을 찾는건 기존에 만들었던 게시물 찾는 메소드를 이용한다
  deleteBoard(id: string): void {
    //저렇게 지울 게시물을 찾는데 없다면 찾는 메소드에서 알아서 예외를 던진다
    const found = this.getBoardById(id);
    this.boards.filter((board) => board.id !== found.id);
  }

  //특정 id를 가지는 게시물의 상태를 바꾸기
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
*/
}
