import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Equal,ILike } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity';
import * as crypto from 'crypto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectRepository(Auth)
        private authRepository:Repository<Auth>,
    ){}

    async getAuth(name: string, password: string) {
  console.log('届いた名前:', name);

  // 1. パスワードの存在チェック
  if (!password) {
    console.log('パスワードが入力されていません');
    throw new UnauthorizedException();
  }

  // 2. パスワードをハッシュ化 (DBにはハッシュ化した値が入っている前提)
  const hash = crypto.createHash('md5').update(password).digest('hex');

  // 3. name と hash でユーザーを検索
  const user = await this.userRepository.findOne({
    where: {
      name:ILike(name.trim()),
      hash: Equal(hash), 
    },
  });

  // 4. ユーザーが見つからない = 認証失敗
  if (!user) {
    console.log('DBからユーザーが見つかりませんでした。届いた名前:', name);
    throw new UnauthorizedException();
  }
  console.log('ユーザー発見:', user.name);

  const ret = {
    token: '',
    user_id: user.id,
  };

  // 5. 認証トークンの作成・更新ロジック
  var expire = new Date();
  expire.setDate(expire.getDate() + 1);

  const auth = await this.authRepository.findOne({
    where: {
      user_id: Equal(user.id),
    },
  });

  if (auth) {
    // 既存トークンの有効期限を更新
    auth.expire_at = expire;
    await this.authRepository.save(auth);
    ret.token = auth.token;
  } else {
    // 新規トークンを発行
    const token = crypto.randomUUID();
    const record = {
      user_id: user.id,
      token: token,
      expire_at: expire,
    };
    await this.authRepository.save(record);
    ret.token = token;
  }

  console.log('認証成功！トークンを発行しました');
  return ret;
}
}