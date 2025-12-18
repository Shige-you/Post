import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'; 

// 💡 AuthService のモック定義
// AuthController が持つメソッド（getAuthなど）が呼び出すサービスメソッドを定義
const mockAuthService = {
    getAuth: jest.fn(), // AuthServiceにあるメソッドをモック化
    // 必要に応じて、他のAuthServiceのメソッドも追加
};

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                // 🚨 AuthServiceをモックで差し替える
                {
                    provide: AuthService, 
                    useValue: mockAuthService, // 上で定義したモックオブジェクトを使用
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        // モックが提供されたため、インスタンス化が成功しPASSするはずです
        expect(controller).toBeDefined();
    });
    
    // 🔽 今後は、ここに getAuth エンドポイントのテストを追加します
    // it('should call authService.getAuth when controller.login is called', () => { ... });
});