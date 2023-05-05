import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUsers , deleteUserService, editUserService} from "../../services/userSevice";
import {toast} from "react-toastify";
// bat dau , dang lam , ket thuc
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
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

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('gender');
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.allcodes));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('The error from adminAction Gender : ', error);
        }
    }
}

export const fetchGenderSuccess = (genderDataFromAPI) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        payload: genderDataFromAPI
    };
};

export const fetchGenderFailed = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILED
    };
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('role');

            if (response && response.errCode === 0) {
                dispatch(fetchRoleSuccess(response.allcodes));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('The error from adminAction Role : ', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => {
    return {
        type: actionTypes.FETCH_ROLE_SUCCESS,
        payload: roleData
    };
};

export const fetchRoleFailed = () => {
    return {
        type: actionTypes.FETCH_ROLE_FAILED
    };
}

// export const fetchCreateNewUserStart = (data)=>{
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);
            console.log('check data response at admin action : ', response);
            if (response && response.errCode === 0) {
                toast.success("Create a new user successfully!");
                dispatch(fetchCreateNewUserSuccess());// sau khi tạo new user xong thì chúng ta sẽ tiến hành getAllUSer cập nhật bảng luôn.
                dispatch(fetchAllUserByRedux());
            } else {
                dispatch(fetchCreateNewUserFailed());
            }
        } catch (error) {
            dispatch(fetchCreateNewUserFailed());
            console.log('Fetch Create new user failed at admin Action : ', error);
        }
    }
}

export const fetchCreateNewUserSuccess = () => {
    return {
        type: actionTypes.FETCH_CREATE_NEW_USER_SUCCESS
    }
}

export const fetchCreateNewUserFailed = () => {
    return {
        type: actionTypes.FETCH_CREATE_NEW_USER_FAILED
    }
}

export const fetchAllUserByRedux = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers('ALL');
            console.log('check response at admin action : ', response); // một lô các user nguyên gốc trừ password
            if (response && response.errCode === 0) {
                dispatch(fetchAllUserSuccess(response.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log('Error fetching all user at AdminAction:', error);
        }
    };
}

export const fetchAllUserSuccess = (dataAllUser) => {
    return {
        type: actionTypes.FETCH_ALL_USER_SUCCESS,
        payload: dataAllUser
    };
}

export const fetchAllUserFailed = () => {
    return { type: actionTypes.FETCH_ALL_USER_FAILED };
}

export const deleteUserByRedux = (userIdWillDelete) => {
    return async(dispatch , getState)=>{
        try {
            let response = await deleteUserService(userIdWillDelete); 
            console.log('Phản hồi : ', response);
            if(response && response.errCode === 0){
                toast.success("Delete user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserByRedux());
            }else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('Error when delete user at AdminAction : ', error);
        };
    }
}

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS
    }
}

export const deleteUserFailed = () => {
    return { type: actionTypes.DELETE_USER_FAILED }
}

export const editUser = (id , userDataFromInput)=>{
    return async(dispatch , getState)=>{
        alert('BUG2'); 
        try {
            console.log("Phản hồi đầu tiên:");
            console.log(userDataFromInput) ; 
            let response = await editUserService(id , userDataFromInput);
            console.log("Phản hồi : ",response);
            
            if(response && response.errCode === 0){
                toast.success("Update the user successfully!!!");
                dispatch(editUserSuccess()); 
                dispatch(fetchAllUserByRedux());
            }else{
                toast.success("Update the user error !!!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update the user failed!");
            dispatch(editUserFailed());
            console.log('Edit user failed at adminAction: ', error);
        }
    }
}

export const editUserSuccess = ()=>{
    return {type : actionTypes.EDIT_USER_SUCCESS};
}

export const editUserFailed = ()=>{
    return {type : actionTypes.EDIT_USER_FAILED};
}







