import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';

// import * as actions from "../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";
// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
// import './Login.scss';
// import { FormattedMessage } from 'react-intl';
// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        // khai báo các state 
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
        };
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        }); // truyền vào đối tượng mới để cập nhật state cũ
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleClickBtn = () => {
        console.log("Username : " + this.state.username, " Password : " + this.state.password);
    }

    handleHideShowPass = (event) => {
        this.setState({
            isShowPass: !this.state.isShowPass
        });
    }






    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username : </label>
                            <input type='text'
                                onChange={(event) => { this.handleUsernameChange(event) }}
                                value={this.state.username}
                                className='form-control'
                                name='username'
                                placeholder='Enter your username' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='control'>
                                <input type={this.state.isShowPass ? 'password' : 'text'}
                                    onChange={(event) => { this.handlePasswordChange(event) }}
                                    value={this.state.password}
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter your password' />
                                <span className='show-hide-pass' onClick={(event) => { this.handleHideShowPass(event) }}>
                                    <i class={this.state.isShowPass ? 'fas fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 login-input '>
                            <button
                                onClick={() => this.handleClickBtn()}
                                className='col-12 btn-login' type='submit' >LOGIN</button>
                        </div>
                        <div className='col-12 login-input'>
                            <span className='forgot-password'>Forgot your password ? </span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className=''>Or Login with : </span>
                        </div>
                        <div className='col-12 social-login text-center'>
                            <i class="fab fa-google-plus icon" style={{ color: '#c80909' }}></i>
                            <i class="fab fa-facebook icon" style={{ color: '#045bf1' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
