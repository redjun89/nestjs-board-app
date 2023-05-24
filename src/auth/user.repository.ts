import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password} = authCredentialsDto;

        const user = this.create({ username, password });

        await this.save(user);
    }
}