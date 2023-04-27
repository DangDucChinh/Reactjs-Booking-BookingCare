import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userSevice";

// bat dau , dang lam , ket thuc
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            console.log('Check getstate: ', getState) ;
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.allcodes));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetch position start error', error);
        }
    };
};

export const fetchPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        payload: positionData
    }
};

export const fetchPositionFailed = () => {
    return {
        type: actionTypes.FETCH_POSITION_FAILED
    }
}

export const fetchGenderStart = ()=>{
    return async(dispatch , getState)=>{
        try {
            let response = await getAllCodeService('gender');
            if(response && response.errCode === 0){
                dispatch(fetchGenderSuccess(response.allcodes)) ; 
            }else{
                dispatch(fetchGenderFailed()); 
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('The error from adminAction Gender : ', error); 
        }
    }
}

export const fetchGenderSuccess = (genderDataFromAPI)=>{
    return {
        type : actionTypes.FETCH_GENDER_SUCCESS , 
        payload : genderDataFromAPI
    };
}; 

export const fetchGenderFailed = ()=>{
    return {
        type : actionTypes.FETCH_GENDER_FAILED
    };
}

export const fetchRoleStart = ()=>{
    return async(dispatch , getState)=>{
        try {
            let response = await getAllCodeService('role');
            if(response && response.errCode === 0){
                dispatch(fetchRoleSuccess(response.allcodes)) ; 
            }else{
                dispatch(fetchRoleFailed()); 
            }
        } catch (error) {
            dispatch(fetchRoleFailed()); 
            console.log('The error from adminAction Role : ', error); 
        }
    }
}

export const fetchRoleSuccess = (roleData)=>{
    return {
        type : actionTypes.FETCH_ROLE_SUCCESS,
        payload : roleData
    };
}; 

export const fetchRoleFailed = ()=>{
    return {
        type : actionTypes.FETCH_ROLE_FAILED
    };
}





