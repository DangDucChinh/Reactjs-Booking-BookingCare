import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers, getAllDoctor
    , deleteUserService, editUserService, getTopDoctorService, saveDetailDoctor, getAllCodeScheduleTime
} from "../../services/userSevice";
import { toast } from "react-toastify";
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
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserService(userIdWillDelete);
            console.log('Phản hồi : ', response);
            if (response && response.errCode === 0) {
                toast.success("Delete user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserByRedux());
            } else {
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

export const editUser = (id, userDataFromInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUserService(id, userDataFromInput);

            if (response && response.errCode === 0) {
                toast.success("Update the user successfully!!!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserByRedux());
            } else {
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

export const editUserSuccess = () => {
    return { type: actionTypes.EDIT_USER_SUCCESS };
}

export const editUserFailed = () => {
    return { type: actionTypes.EDIT_USER_FAILED };
}

export const getTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorService('');
            if (response && response.errCode === 0) {

                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
                    payload: response.data
                    // response của api này là 1 obj chứa message , errCode , data
                });
            } else {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_FAILED
                });
            }
        } catch (error) {
            console.log('Lỗi tại adminAction', error);
            dispatch({
                type: actionTypes.GET_TOP_DOCTOR_FAILED
            });
        }
    }
};

export const fetchAllDoctorRedux = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctor();
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
                    payload: response.data
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_FAILED
                });
            }

        } catch (error) {
            console.log('Lỗi tại adminAction', error);
            dispatch({
                type: actionTypes.GET_ALL_DOCTOR_FAILED
            });
        }
    };
}

export const saveDetailDoctorByRedux = (dataFromRequestInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveDetailDoctor(dataFromRequestInput);
            console.log("CHEKC RES : ", response);
            if (response && response.errCode === 0) {
                toast.success("Save detail doctor successfully!!!");
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_SUCCESS
                });
            } else {
                toast.error(" Failed save detail 1!!! 1");
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_FAILED
                });
            }
        } catch (error) {
            console.log('Lỗi tại adminAction saveDetailDoctorByRedux', error);
            toast.error(" Failed save detail 2!!!");
            dispatch({
                type: actionTypes.SAVE_DOCTOR_FAILED
            });
        }
    };
};


export const fetchAllCodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService("TIME");
            if (response && response.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_CODE_SCHEDULE_TIME_SUCCESS,
                    payload: response.allcodes
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_CODE_SCHEDULE_TIME_FAILED
                });
            }
        } catch (error) {
            console.log('Lỗi tại admin action : ', error);
            dispatch({
                type: actionTypes.GET_ALL_CODE_SCHEDULE_TIME_FAILED
            });
        }
    }
};
//////////////////////////////////




export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

            let responsePrice = await getAllCodeService('price');
            let responsePayment = await getAllCodeService('payment');
            let responseProvince = await getAllCodeService('province');


            if (responsePrice && responsePrice.errCode === 0 &&
                responsePayment && responsePayment.errCode === 0 &&
                responseProvince && responseProvince.errCode === 0) {
                let data = {
                    resPrice: responsePrice,
                    resPayment: responsePayment,
                    resProvince: responseProvince
                };
                dispatch(fetch_required_doctor_infor_success(data));
            } else {
                dispatch(fetch_required_doctor_infor_failed());
            }
        } catch (error) {
            dispatch(fetch_required_doctor_infor_failed());
            console.log('The error from adminAction price for schedule : ', error);
        }
    }
}

export const fetch_required_doctor_infor_success = (allRequiredData) => {
    return {
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
        payload : allRequiredData
    };
};

export const fetch_required_doctor_infor_failed = () => {
    return {
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
    };
}










