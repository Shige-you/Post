import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // 👈 追加
import { MicroPost } from '../entities/microposts.entity'; // 👈 追加 (パスは必要に応じて調整)
import { Auth } from '../entities/auth.entity'; // 👈 追加 (パスは必要に応じて調整)

// 💡 共通のモックリポジトリオブジェクトを定義
const mockRepository = {
    // PostService のメソッドが利用するであろう TypeORM メソッドをモック化
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(), // 削除機能があれば必要
    find: jest.fn(),   // 複数の投稿を取得する機能があれば必要
    // 他にも必要に応じて追加
};

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(MicroPost),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Auth),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () =>{
    expect(service).toBeDefined();
  });
});