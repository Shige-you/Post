import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    // 1. まず ConfigModule を読み込む（isGlobal: true でどこでも使えるようにする）
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. forRootAsync を使って、ConfigService が準備できてから接続する
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        // configService.get なら、数値への変換もスマートに書けます
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        // 開発中なら true でも OK ですが、安全のため意識しておきましょう
        synchronize: false, 
        ssl: { rejectUnauthorized: false },
      }),
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}