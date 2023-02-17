import React from 'react';
import { Cell } from '../models/Cell';
import { FC } from 'react';

interface CellProps {
    cell: Cell;
    selected: boolean;
    chooseCell: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, selected, chooseCell }) => {
    return (
        <div 
            className={['cell', cell.color, selected ? 'selected' : ''].join(' ')} 
            onClick={() => chooseCell(cell)}
        >
            {cell.available && !cell.figure && <div className='available'></div>}
            {cell.figure?.logo && (
                <img src={cell.figure.logo} alt={cell.figure.name} />
            )}
        </div>
    );
};

export default CellComponent;
