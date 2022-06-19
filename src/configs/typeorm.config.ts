import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

//ORM은 클래스로 만든 친구들(엔티티)를 DB의 테이블에 쉽게 연동/연결 시키도록 마든거
export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  //env 환경변수를 준 이유는
  //로컬 뿐 만 아니라 DB환경에서 돌릴경우 비밀번호나 호스트등을 넣어줄텐데
  //그것들을 환경변수롤 가져오는거
  // || 는 만약 왼쪽이 없다면 오른쪽 값을 넣어준다는뜻
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  synchronize: dbConfig.synchronize,
};
