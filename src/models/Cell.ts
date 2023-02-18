import { Colors } from './Colors';
import { Figure } from './figures/Figure';
import { Board } from './Board';
import { Queen } from './figures/Queen';

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

    isEnemy(target: Cell, direction: number, cell: Cell): boolean {
        if (
            target.board.cells[target.y - direction][target.x + 1]?.figure &&
            target.board.cells[target.y - direction][target.x + 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x - 2
        ) {
            return true;
        } else if (
            target.board.cells[target.y - direction][target.x - 1]?.figure &&
            target.board.cells[target.y - direction][target.x - 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x + 2
        ) {
            return true;
        }
        return false;
    }

    isEnemyX2(target: Cell, direction: number, cell: Cell): boolean {
        if (
            target.board.cells[target.y + direction][target.x + 1]?.figure &&
            target.board.cells[target.y + direction][target.x + 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x - 2
        ) {
            return true;
        } else if (
            target.board.cells[target.y + direction][target.x - 1]?.figure &&
            target.board.cells[target.y + direction][target.x - 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x + 2
        ) {
            return true;
        }
        return false;
    }

    addLostFigure(figure: Figure | null) {
        if (figure !== null) {
            figure.color === Colors.BLACK
                ? this.board.lostBlackFigures.push(figure)
                : this.board.lostWhiteFigures.push(figure);
        }
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell, selectedCell: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            const avgY = (target.y + selectedCell.y) / 2;
            const avgX = (target.x + selectedCell.x) / 2;
            if (
                this.board.cells[avgY] &&
                this.board.cells[avgY][avgX].figure?.color !==
                    selectedCell.figure?.color
            ) {
                this.addLostFigure(this.board.cells[avgY][avgX]?.figure);
                this.board.cells[avgY][avgX].figure = null;
            }
            if (target.y === 0 && selectedCell.figure?.color === 'white') {
                target.setFigure(this.figure);
                this.figure = new Queen(selectedCell.figure?.color, target);
                this.figure = null;
            } else if (
                target.y === 7 &&
                selectedCell.figure?.color === 'black'
            ) {
                target.setFigure(this.figure);
                this.figure = new Queen(selectedCell.figure?.color, target);
                this.figure = null;
            } else {
                target.setFigure(this.figure);
                this.figure = null;
            }
        }
    }

    // isEmpty(): boolean {
    //     return this.figure === null;
    // }

    // isEmptyDiagonal(target: Cell): boolean {
    //     const absX = Math.abs(target.x - this.x);
    //     const absY = Math.abs(target.y - this.y);
    //     if (absY !== absX) return false;

    //     const dy = this.y < target.y ? 1 : -1;
    //     const dx = this.x < target.x ? 1 : -1;

    //     for (let i = 1; i < absY; i++) {
    //         if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
    //             return false;
    //         // } else if (!!this.board.getCell(this.x + dx * i - 1, this.y + dy * i - 1).figure && this.board.getCell(this.x + dx * i - 2, this.y + dy * i - 2).isEmpty()) {
    //         //     return true;
    //         // }
    //     }
    //     return true;
    // }
}
