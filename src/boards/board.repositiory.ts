import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

//DB를 핸들링하는 부분은 여기서 처리한다고 한다
//그러니까 요청을 받게되면 컨트롤러에서 지시를 하여 서비스에서 DB관련이라면 여기에 있는 메소드를 가리켜서 실행하게 만든다
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  //Dto에 타입과 des의 정보를 넣음
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    //새로운 게시물을 생성, 이전과 달리 ORM에서 알아서 번호를 주기 떄문에 uuid가 필요없음
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    //await로 하는 이유는 이게 비동기로 동작이 이루어지기 때문에 충분히 결과를 받고 난 뒤 리턴할려고
    //그리고 위에서 받고 생성한 개시물을 저장한다
    await this.save(board);

    return board;
  }
}
