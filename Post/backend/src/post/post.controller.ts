import { Body, Controller, Patch,Delete, Get, Post, Query,Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body('message') message: string,
    @Query('token') token: string,
  ) {
    console.log("届いたトークン(POST):",token); 
    return await this.postService.createPost(message, token);
  }
  
  @Get()
  async getList(
    @Query('token') token: string,
    @Query('offset') offset: string, 
    @Query('records') records: string,
  ) {
    console.log("届いたトークン(get)", token);
  
    // 指定がない場合のデフォルト値（0や10）も設定しておくと安全
    const start = parseInt(offset) || 0;
    const nr_records = parseInt(records) || 10;
  
    // Serviceに数値を渡す
    return await this.postService.getList(token, start, nr_records);
  }

  @Delete(':id')
    async deletePost(
      @Param('id') id:string,
      @Query('token') token:string,
    ){
      console.log(`削除リクエスト: ID=${id}, Token=${token}`);
    // Serviceの削除メソッドを呼び出す（後でService側にも作成します）
    return await this.postService.deletePost(parseInt(id), token);
    }
  
  @Patch(':id')
  async updatePost(
    @Param('id') id:string,
    @Body('content')content:string,
    @Query('token')token:string,
  ){
    return await this.postService.updatePost(parseInt(id),content,token);
  }
}