import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//ORM은 클래스로 만든 친구들(엔티티)를 DB의 테이블에 쉽게 연동/연결 시키도록 마든거
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  synchronize: true,
};
