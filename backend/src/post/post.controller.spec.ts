import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service'; 

// 💡 PostService のモック定義
// PostController が持つメソッド（createPost, getPostsなど）が呼び出すサービスメソッドを定義
const mockPostService = {
    createPost: jest.fn(), 
    getPosts: jest.fn(),
    // PostControllerが利用する他のPostServiceメソッドがあれば追加
};

describe('PostController', () => {
    let controller: PostController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [
                // 🚨 PostServiceをモックで差し替える
                {
                    provide: PostService, 
                    useValue: mockPostService, // 上で定義したモックオブジェクトを使用
                },
            ],
        }).compile();

        controller = module.get<PostController>(PostController);
    });

    it('should be defined', () => {
        // モックが提供されたため、インスタンス化が成功しPASSするはずです
        expect(controller).toBeDefined();
    });
    
    // 🔽 今後は、ここに createPost などのエンドポイントのテストを追加します
});