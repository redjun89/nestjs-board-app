import { BaseEntity, Column, PrimaryGeneratedColumn, Entity} from "typeorm";
import { BoardStatus } from "./board-status.enum"

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}