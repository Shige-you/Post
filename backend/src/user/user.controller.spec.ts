import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../user/user.service'; // 1. UserService をインポート

describe('UserController', () => {
  let controller: UserController; 
  // let service: UserService; // ※モックサービスへのアクセスが必要ならこれも追加

  beforeEach(async () => {
    // 2. モックで置き換える UserService の定義
    const mockUserService = {
      // UserController が利用するメソッドをモック化します
      // 例えば、getUser と createUser を空の関数として定義
      getUser: jest.fn(), 
      createUser: jest.fn(), 
    };
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        // 3. モックサービスの差し替え設定
        {
          provide: UserService, 
          useValue: mockUserService, // 上で定義した偽のオブジェクトを使用
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService); // ※モックサービスを取得する場合
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  // 🔽 ここに、getUser や createUser の呼び出しを確認するテストを追加していきます
  // it('should call service.getUser when controller.getUser is called', () => { ... });
});