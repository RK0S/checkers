import { Colors } from '../Colors';
import logo from '../../assets/checker_black_crown.png';
import { Cell } from '../Cell';

export enum CheckerNames {
    FIGURE = 'Фигура',
    CHECKER = 'Шашка',
    QUEEN = 'Дамка',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: CheckerNames;
    id: number;

    constructor (color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = CheckerNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if (target?.figure?.color === this.color) 
            return false
        return true;
    }

}