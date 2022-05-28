import { Module } from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repositiory';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
//보드에 대한 기본적인 모듈
//여기서 하위 모듈들을 선언하려나보다
