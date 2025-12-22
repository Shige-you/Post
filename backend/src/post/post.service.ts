import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';
import { MicroPost } from '../entities/microposts.entity';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PostService {
     constructor(

    @InjectRepository(MicroPost)

    private microPostsRepository: Repository<MicroPost>,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async createPost(message: string, token: string) {
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

    const record = {
      user_id: auth.user_id,
      content: message,
    };
    await this.microPostsRepository.save(record);
  }

  async getList(token: string, start: number = 0, nr_records: number = 1) {
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

    const records = await this.microPostsRepository
      .createQueryBuilder('micro_post')
      .leftJoin('users','u','u.id =micro_post.user_id')
      .select([
        'micro_post.id as id',
        'u.name as user_name',
        'micro_post.content as content',
        'micro_post.created_at as created_at',
      ])
      .orderBy('micro_post.created_at', 'DESC')
      .offset(start)
      .limit(nr_records)
      .getRawMany();

    type ResultType = {
      id: number;
      content: string;
      user_name: string;
      created_at: Date;
    };

    console.log("取得データ",records);
    return records;
  }
}
