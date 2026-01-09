import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm'; 
import { User } from '../entities/user.entity'; 
import { Auth } from '../entities/auth.entity'; 

// 💡 共通のモックリポジトリオブジェクトを定義
const mockRepository = {
    // AuthService のメソッド（認証ロジックなど）で使われる TypeORM メソッドをモック化
    findOne: jest.fn(), 
    save: jest.fn(),    
}
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // 🚨 1. User リポジトリのモックを提供
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        // 🚨 2. Auth リポジトリのモックを提供
        {
          provide: getRepositoryToken(Auth),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});