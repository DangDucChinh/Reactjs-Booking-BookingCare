import actionTypes from "../actions/actionTypes";

const initialState = {
    positions: [],
    roles: [],
    genders: [],
    users : []
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

        case actionTypes.FETCH_ALL_USER_SUCCESS : 
            state.users = action.payload ; // lấy dpayload từ action sau khi thực hiện get dữ liệu tại đó. tại sao chúng ta lại gán vào đây ?? // vì chúng ta cần sử dụng nó cho global, vì vậy nó cần dc lưu trữ sâu sắc vào redux . 
            return {...state};
        case actionTypes.FETCH_ALL_USER_FAILED : 
            return { ...state };
        

        default:
            return state;
    }
}

export default adminReducer;