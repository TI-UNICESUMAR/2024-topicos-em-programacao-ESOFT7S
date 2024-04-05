import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)

    const isMath = await bcrypt.compare(pass, user.password)

    if (!isMath) throw new UnauthorizedException();

    const payload = { sub: user._id, userMail: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }
}