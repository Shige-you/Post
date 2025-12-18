import { DataSource } from "typeorm";
require('dotenv').config(); // .envファイルを読み込む

const AppDataSource = new DataSource({
    type: "postgres", // データベースの種別
    
    // 1. 環境変数から値を取得
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10), // ポート番号は数値に変換
    username: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME, 
    
    // 2. その他の設定
    synchronize: false, // 開発中はtrueでも良いが、本番では必ずfalse
    logging: true, // SQLログの表示設定
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
})

export default AppDataSource;