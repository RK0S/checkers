import { Colors } from './Colors';
import { Figure } from './figures/Figure';
import { Board } from './Board';

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(
        board: Board,
        x: number,
        y: number,
        color: Colors,
        figure: Figure | null
    ) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    // isEmpty():boolean {
    //     return this.figure === null
    // }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    isEnemyX2(target: Cell, cell: Cell, direction: number): boolean {
        const board = this.board.getCopyBoard();
        let firstTrue = false;
        if (board?.cells[cell.y + direction][cell.x - 1]?.figure) {
            firstTrue =
                board?.cells[cell.y + direction][cell.x - 1]?.figure?.color !==
                cell.figure?.color;
        }
        let secondTrue = false;
        if (board?.cells[cell.y + direction][cell.x + 1]?.figure) {
            secondTrue =
                board?.cells[cell.y + direction][cell.x + 1]?.figure?.color !==
                cell.figure?.color;
        }
        if (
            !target.figure &&
            board?.cells[cell.y + direction][cell.x - 1]?.figure &&
            board?.cells[cell.y + direction][cell.x + 1]?.figure &&
            (firstTrue ||
            secondTrue)
        ) {
            return true;
        }
        return false;
    }

    isEmptyDiagonalForChecker(target: Cell, color: Colors): boolean {
        // if (color === Colors.WHITE) {
        //     const absX = this.x - target.x
        //     const absY = this.y - target.y
        //     if (absX !== absY) {
        //         return false
        //     }
        // }
        // const absX = Math.abs(target.x - this.x)
        // const absY = Math.abs(target.y - this.y)
        // if (absX !== absY) {
        //     console.log([absX, absY]);
        //     return false
        // }
        // const dy = this.y < target.y ? 1 : -1
        // const dx = this.x < target.x ? 1 : -1

        // for (let i = 1; i < absY; i++) {
        //     if (!this.board.getCell(this.x + dx * i, this.y + dy*i).isEmpty())
        //         return false
        // }
        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell, selectedCell: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            // console.log(selectedCell);
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}
