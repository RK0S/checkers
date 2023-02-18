import React, { FC, useState, useEffect } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
    board,
    setBoard,
    currentPlayer,
    swapPlayer,
}: BoardProps) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function chooseCell(cell: Cell) {
        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell, selectedCell);
            swapPlayer(); //Смена игрока, здесь надо условие на проверку прыжков
            setSelectedCell(null);
        } else if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
        }
    }

    useEffect(() => {
        hightlightCells();
    }, [selectedCell]);

    function hightlightCells() {
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Ход игрока: {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                chooseCell={chooseCell}
                                key={cell.id}
                                cell={cell}
                                selected={
                                    cell.x === selectedCell?.x &&
                                    cell.y === selectedCell?.y
                                }
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
