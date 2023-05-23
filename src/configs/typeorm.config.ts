import { TypeOrmModule } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModule = {
    typr: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'redjun89!@',
    database: 'board-app',
    entities: [__dirname + '/../**/*.ertity.{js,ts}'],
    synchronize: true
}