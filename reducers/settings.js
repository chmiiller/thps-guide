import persist from './persist';

export const INITIAL_STATE = {
    currentGame: { "id": 1, "title": "Tony Hawk's Pro Skater" },
};

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_GAME':
            return {
                ...state,
                currentGame: action.payload
            };
    
        default:
            return state;
    }
};

export default persist('settingsReducer', ['currentGame'], settingsReducer);