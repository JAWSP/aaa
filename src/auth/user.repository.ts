import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //Dto를 통하여 받은 정보를 가져와서
    const { username, password } = authCredentialsDto;

    //보안을 위하여 비밀번호를 암호화시킨다
    //솔트값을 만들어서 기존 비밀번호랑 합친걸 해쉬시킨다
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //새로운 유저데이터를 만들어서 받은 정보를 생성한다
    const user = this.create({ username, password: hashedPassword });

    //그리고 그 유저를 저장
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('너님 닉 중복임', error.detail);
      }
    }
  }
}
