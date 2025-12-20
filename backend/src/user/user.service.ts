import { 
    Injectable,
    NotFoundException,
    ForbiddenException,
 } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Equal,MoreThan } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectRepository(Auth)
        private authRepository:Repository<Auth>,
    ){}

    async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

    async getUser(token: string, id: number) {

    // ログイン済みかチェック

    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    const user = await this.userRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

 async createUser(name: string, email: string, password: string) {
    const hash = createHash('sha256').update(password).digest('hex');
    const record = {
      name: name,
      email: email,
      hash: hash,
    };
    await this.userRepository.save(record);
  }
}
