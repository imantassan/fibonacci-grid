const incrementCountType = 'INCREMENT_COUNT';
const initialState = { matrix: [] };

export const actionCreators = {
    increment: (row, column) => ({ type: incrementCountType, row, column })
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === incrementCountType) {
        var newState = { ...state };
        return { ...state, count: state.count + 1 };
    }

    return state;
};