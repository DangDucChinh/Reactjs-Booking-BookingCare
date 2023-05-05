import axios from "../axios";
const handleLogin = (userEmail, userPassword) => {
    // gọi đến server node js 
    // dùng 1 package phía client gửi 1 request đến server gọi là axios
    // thế nên import axios

    return axios.post('/api/login', { // đặt tên trùng với tên của đối tượng post (url , {}) trên server
        email: userEmail,
        password: userPassword
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const getAllCodeService = (typeInput)=>{
    return axios.get(`/api/get-all-codes?type=${typeInput}`);
}

const createNewUserService = (data)=>{
    // console.log('Check data from service : ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userIdWillDelete)=>{
    return axios.delete(`/api/delete-user/${userIdWillDelete}`);

}

const editUserService = (id, userDataFromInput)=>{
    return axios.put(`/api/update-user/${id}`,userDataFromInput);
    // return axios.delete(`/api/delete-user/${userIdWillDelete}`);
}

export { handleLogin, getAllUsers, getAllCodeService , createNewUserService , deleteUserService , editUserService};