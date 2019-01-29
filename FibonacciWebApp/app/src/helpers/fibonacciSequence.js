import { matrixSize, sequenceLength } from '../config/index';

// Cache of fibonacci numbers. The sequence is calculated and extended on demand.
export const fibonacciSequence = (function() {
    // Holds all the fibonacci numbers
    const sequence = [1, 1];
    // Stores indexes of fibonacci numbers within the sequence
    const indexes = {
        1: 2
    };

    // Calculates the next fibonacci number and adds to the sequence
    const calculateNext = () => {
        const newNumber = sequence[sequence.length - 2] + sequence[sequence.length - 1];
        sequence.push(newNumber);
        indexes[newNumber] = sequence.length;
    };

    // Makes sure the cached sequence contains enough numbers to be able to check the given number
    const ensureCreated = (number) => {
        while (sequence[sequence.length - 1] < number) {
            calculateNext();
        }
    };

    return {
        /**
         * Checks if the number is a fibonacci number and returns its index in the sequence on success
         * @param {number} number Number to check
         * @returns {number|null} Sequence index if the number is a fibonacci number, otherwise null.
         */
        getSequenceIndex: (number) => {
            ensureCreated(number);

            return indexes[number];
        }
    };
})();

/**
 * Recursively finds a sequence of fibonacci numbers within the given matrix starting at the given cell.
 * @param {any} matrix Full matrix containing all cells.
 * @param {any} cell The cell to start the sequence at.
 * @param {any|null} parentCell The previous cell in the sequence if it's not the starting cell.
 * @param {number} parentIndex Fibonacci sequence index of the parent.
 * @param {number} sequenceLeft Total elements left to find within the sequence recursively.
 * @param {Array<string>} cellIndexes Array of cell indexes within the matrix which produce a fibonacci sequence.
 */
export const findSequence = (matrix, cell, parentCell, parentIndex, sequenceLeft, cellIndexes) => {
    const key = `${cell.row},${cell.column}`;
    if (!parentCell) {
        sequenceLeft = sequenceLength;
        cellIndexes = [];
    }

    // Ignore cells that are part of other sequences found
    if (!!cell.active) {
        return null;
    }

    // Check if the cell
    let index = fibonacciSequence.getSequenceIndex(cell.count);
    if (!index) {
        return null;
    }

    // 1 needs special handling as it's the only number which repeats in the sequence
    if (cell.count === 1 && parentCell.count === 1 && parentIndex === 2) {
        index--;
    }

    // Numbers must be in a consecutive order within the fibonacci sequence
    if (!!parentIndex && index !== parentIndex - 1) {
        return null;
    }

    cellIndexes = cellIndexes.concat([key]);

    // Stop when the full sequence is found
    if (--sequenceLeft === 0) {
        // Reset the cells to 0 and mark them appropriately
        cellIndexes.forEach(index => {
            const sequenceCell = matrix[index];
            sequenceCell.active = true;
            sequenceCell.temporaryCount = sequenceCell.count;
            sequenceCell.count = 0;
        });
        return cellIndexes;
    }

    // Try searching for sequence in all directions: [down, right, up, left]
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const newRow = cell.row + direction[0];
        const newColumn = cell.column + direction[1];

        if ((!parentCell || newRow !== parentCell.row || newColumn !== parentCell.column)
            && newRow >= 0 && newRow < matrixSize.height
            && newColumn >= 0 && newColumn < matrixSize.width) {

            const result = findSequence(matrix, matrix[`${newRow},${newColumn}`], cell, index, sequenceLeft, cellIndexes);
            if (result !== null) {
                return result;
            }
        }
    }

    // Dead end at this cell
    return null;
};