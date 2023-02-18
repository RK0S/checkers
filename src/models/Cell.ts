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

    addLostFigure(figure: Figure | null) {
        if (figure !== null) {
            figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
        }
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell, selectedCell: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            const avgY = (target.y + selectedCell.y) / 2
            const avgX = (target.x + selectedCell.x) / 2
            if (this.board.cells[avgY] && this.board.cells[avgY][avgX].figure?.color !== selectedCell.figure?.color) {
                this.addLostFigure(this.board.cells[avgY][avgX]?.figure)
                this.board.cells[avgY][avgX].figure = null
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}
