import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create({ username, password });


        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new InternalServerErrorException('중복된 username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}