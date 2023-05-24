import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository
    ) { }

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return '로그인 성공'
        } else {
            throw new UnauthorizedException('로그인 실패');
        }
    }
}
