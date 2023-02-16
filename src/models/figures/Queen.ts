import { CheckerNames, Figure } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/checker_black_crown.png';
import whiteLogo from '../../assets/checker_white_crown.png';

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super (color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = CheckerNames.QUEEN
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }
        // if (this.cell.isEmptyDiagonal(target))
        //     return true
        return false
    }
}