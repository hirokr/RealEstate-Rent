import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwt: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.database.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash,
          role: dto.role,
          phoneNumber: dto.phoneNumber,
        },
      });
      return this.signToken(user.cognitoId as string, user.email, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with this email already exists');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.database.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('incorrect');

    const pwMatches = await argon.verify(user.password as string, dto.password);

    if (!pwMatches) throw new ForbiddenException('wrong');

    return this.signToken(user.cognitoId as string, user.email, user.role);
  }

  async signToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email, role };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET || 'JwtService',
    });

    return {
      access_token: token,
    };
  }

  
}
