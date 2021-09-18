import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto): Promise<void> {
    const { email, username, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      username,
      password: hashedPwd,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
