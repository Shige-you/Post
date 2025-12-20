import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = (process.env.PORT||3001,'0.0.0.0');
  console.log(`listening on port ${port}`);
 

  // 💡 CORS (Cross-Origin Resource Sharing) の設定を追加
  app.enableCors(
    {
    // 重要な設定: React開発サーバーのオリジンを許可する
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // クッキーや認証ヘッダーを許可する場合
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  }
);

  console.log('listening on port${port}')
  await app.listen(port,'0.0.0.0'); 
}
bootstrap();