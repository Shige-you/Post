import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm'; 

// 💡 共通のモックリポジトリオブジェクトを定義
const mockRepository = {
    // サービス内で使われるメソッドを jest.fn() でモック化
    findOne: jest.fn(), 
    save: jest.fn(),     
};

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                // 1. Userリポジトリのモックを提供
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
                // 2. Authリポジトリのモックを提供
                {
                    provide: getRepositoryToken(Auth),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        // モックのリポジトリが正しく提供されたため、UserServiceのインスタンス化が成功し、テストがPASSするはずです。
        expect(service).toBeDefined();
    });
});