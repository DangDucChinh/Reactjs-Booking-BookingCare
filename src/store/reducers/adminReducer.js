import actionTypes from "../actions/actionTypes";

const initialState = {
    positions: [],
    roles: [],
    genders: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = { ...state };
            copyStatePosition.positions = action.payload;
            return {
                ...copyStatePosition
            };

        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state
            };

        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyStateGender = { ...state };
            copyStateGender.genders = action.payload;
            return {
                ...copyStateGender
            };

        case action.FETCH_GENDER_FAILED:
            return {
                ...state
            };

        case actionTypes.FETCH_ROLE_START: 
            return {
                ...state
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = { ...state };
            copyStateRole.roles = action.payload;
            return {
                ...copyStateRole
            };

        case actionTypes.FETCH_ROLE_FAILED :
            return {
                ...state
            };

        default:
            return state;
    }
}

export default adminReducer;