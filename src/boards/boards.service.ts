import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from '../auth/user.entity';


@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(Board) // 삭제
        // @InjectRepository(BoardRepository) // 삭제
        private boardRepository: BoardRepository,
    ) { }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`${id}에 해당하는 게시물을 찾지 못했습니다.`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`${id}에 해당하는 게시물을 찾지 못했습니다.`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`${id}번 아이디의 게시물을 찾을 수 없습니다.`);
        }

    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
