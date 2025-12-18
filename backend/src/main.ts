import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 💡 CORS (Cross-Origin Resource Sharing) の設定を追加
  app.enableCors({
    // 重要な設定: React開発サーバーのオリジンを許可する
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // クッキーや認証ヘッダーを許可する場合
  });

  await app.listen(3001); 
}
bootstrap();