import { matrixSize, sequenceLength } from '../config/index';
import { fibonacciSequence, findSequence } from '../helpers/fibonacciSequence';

const incrementCountType = 'INCREMENT';
const clearChangesType = 'CLEAR_CHANGES';

// Initial state contains full size matrix which doesn't change throughout the lifetime of the app
const initialState = {
    matrix: [...Array(matrixSize.height).keys()].map(row => [...Array(matrixSize.width).keys()].map(column => ({
        row,
        column,
        previousCount: null,
        count: 0,
        temporaryCount: null,
        active: false
    }))).reduce((total, current) => {
        current.forEach(element => {
            total[`${element.row},${element.column}`] = element;
        });

        return total;
    },
        {})
};

export const actionCreators = {
    increment: (row, column) => dispatch => Promise.resolve(dispatch({ type: incrementCountType, row, column })),
    clearChanges: () => dispatch => Promise.resolve(dispatch({ type: clearChangesType }))
};

export const reducer = (state, action) => {
    state = state || initialState;

    // Clear changes action simply reset the cells to their normal state without any highlights
    if (action.type === clearChangesType) {
        const { matrix } = state;
        const newState = {
            ...state,
            matrix: Object.keys(matrix).reduce((total, key) => {
                    const current = matrix[key];
                    total[key] = {
                        ...current,
                        temporaryCount: null,
                        previousCount: null,
                        active: false
                    };

                    return total;
                },
                {})
        };

        return newState;
    }

    // Increases the numbers within the same row and same column
    if (action.type === incrementCountType) {
        const { row, column } = action;
        const { matrix } = state;
        const newState = {
            ...state,
            matrix: Object.keys(matrix).reduce((total, key) => {
                    const current = matrix[key];
                    // Cells within the same row or same column are increased
                    if (current.row === row || current.column === column) {
                        total[key] = {
                            ...current,
                            previousCount: current.count,
                            count: current.count + 1,
                            temporaryCount: null,
                            active: false
                        };
                    }
                    // Others are reset to their normal state
                    else {
                        total[key] = {
                            ...current,
                            temporaryCount: null,
                            previousCount: null,
                            active: false
                        };
                    }

                    return total;
                },
                {})
        };

        // Filter cells that are not fibonacci numbers and sort them in descending order
        // i.e. start searching for sequences from the highest numbers
        const candidates = Object.keys(newState.matrix).reduce((total, key) => {
                const current = newState.matrix[key];
                if (fibonacciSequence.getSequenceIndex(current.count) >= sequenceLength) {
                    total.push(current);
                }
                return total;
            },
            []).sort((a, b) => b.count - a.count);

        // Run candidate cells against the algorithm
        candidates.forEach(cell => findSequence(newState.matrix, cell));

        return newState;
    }

    return state;
};