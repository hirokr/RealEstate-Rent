import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(dto:LoginDto) {

    return this.authService.login(dto);
  }

  @Post('register')
  register(dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
