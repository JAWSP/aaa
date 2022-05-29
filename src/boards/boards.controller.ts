import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
//import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
//import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  //해당 컨트롤러에 service의존성을 주입하게 된다

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe) //핸들러 레벨파이프,통과되면 아래 핸들러를 실행
  //인자는 @Body에서 받아서 나온 CreateBoardDto타입의 인자 CreateBoardDto변수를 받는다
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto);
  }
  /*
  //get요청을 받으면 모든 게시물을 가져오도록 했다
  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  //특정 id를 이용하여 게시물 찾기
  //실제 요청시 localhost:5000?id=qwkdsawqd12&title=qdqwdasdwq 같이 오게 된다고 한다
  //3000번이아니라 5000번이라서 @param데코레이터의 id를 찾아서 나온 id를 인자로 받음
  //param에서 여러개 가져올려면 @Param() params: string[] 요런 느낌으로다가 하면 됨

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }
  /*
  //Post로 인자를 받아서 처리를 함
  //dto적용안했을때
  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.createBoard(title, description);
  }
  
  //dto적용했을때
  //그리고 생성한 내용을 유효성 검사하기 위해 Pipes를 쓴다
  //여기서는 핸들러 단위로 빌트인 파이프를 써서 파이프를 쓴다고 하고
  //dto에서는 npm으로 설치한 파이프의 키워드를 이용하여 그걸 씀
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  //삭제
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    return this.boardsService.deleteBoard(id);
  }

  //상태 변경
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    //여기서 커스텀 파이프가 적용됨
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
  */
}
