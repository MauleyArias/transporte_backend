import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearAuthDto } from './dto/create-auth.dto';
import { Public, RequestInfo } from '@/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  login(@Body() createAuthDto: CrearAuthDto, @RequestInfo() requestInfo: RequestInfo) {
    return this.authService.login(createAuthDto,requestInfo);
  }
}
