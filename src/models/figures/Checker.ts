import { Figure, CheckerNames } from './Figure';
import blackLogo from '../../assets/checker_black_def.png';
import whiteLogo from '../../assets/checker_white_def.png';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export class Checker extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = CheckerNames.CHECKER;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        if (
            (target.y === this.cell.y + direction &&
                (target.x === this.cell.x + 1 ||
                    target.x === this.cell.x - 1)) || 
            (target.y === this.cell.y + direction * 2 &&
                (target.x === this.cell.x + 2 || target.x === this.cell.x - 2) && this.cell.isEnemy(target, direction, this.cell))
        ) {
            return true;
        }
        return false;
    }
}
