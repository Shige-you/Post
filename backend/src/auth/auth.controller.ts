import { Controller, Get,Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { stringify } from 'querystring';

@Controller('auth')
export class AuthController {
constructor(private readonly authService:AuthService){}

    @Get()
    async getAuth(
         @Query ('user_id') name:string,
        @Query ('pass') password:string,
    ){
       return await this.authService.getAuth(name,password);
    }
}
