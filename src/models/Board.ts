import { Cell } from './Cell';
import { Colors } from './Colors';
import { Checker } from './figures/Checker';


export class Board {
    cells: Cell[][] = []


    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) //black
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null) ) //white
                }
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public hightlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target) 
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public addCheckers() {
        // Расставляем черные фигуры
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                if (i % 2 && j % 2 !== 1) {
                    new Checker(Colors.BLACK, this.getCell(i, j))
                } else if (i % 2 !== 1 && j % 2) {
                    new Checker(Colors.BLACK, this.getCell(i, j))
                }
            }
        }
        // Раставляем черные фигуры
        for (let i = 7; i >= 0; i--) {
            for (let j = 7; j > 4; j--) {
                if (i % 2 && j % 2 !== 1) {
                    new Checker(Colors.WHITE, this.getCell(i, j))
                } else if (i % 2 !== 1 && j % 2) {
                    new Checker(Colors.WHITE, this.getCell(i, j))
                }
            }
        }
    }
}