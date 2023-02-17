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


    isEnemy(target: Cell, direction: number, cell: Cell): boolean {
        if (
            target.board.cells[target.y - direction][target.x + 1]?.figure &&
            target.board.cells[target.y - direction][target.x + 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x - 2
        ) {
            console.log(1);
            return true;
        } else if (
            target.board.cells[target.y - direction][target.x - 1]?.figure &&
            target.board.cells[target.y - direction][target.x - 1]?.figure
                ?.color !== cell.figure?.color &&
            target.x === cell.x + 2
        ) {
            console.log(2);
            return true;
        }
        return false;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}
