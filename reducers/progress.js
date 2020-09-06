import persist from './persist';

export const INITIAL_STATE = {
    completedGoals: {},
};

const progressReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COMPLETE_GOAL':
            return {
                ...state,
                completedGoals: {
                  ...state.completedGoals,
                  [action.payload.id]: action.payload 
                },
              };
        
        case 'RESET_GOAL':
            const stateCompletedGoals = state.completedGoals;
            delete stateCompletedGoals[action.payload.id];
            return {
                ...state,
                completedGoals: stateCompletedGoals
            };
    
        default:
            return state;
    }
};

export default persist('progressReducer', ['completedGoals'], progressReducer);