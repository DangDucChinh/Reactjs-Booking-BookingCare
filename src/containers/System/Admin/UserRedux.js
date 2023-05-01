import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { cssTransition } from 'react-toastify';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageUrl: '',
            isImagePreviewOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
        };
    }

    async componentDidMount() {
        this.props.getRoleStart();
        this.props.getPositionStart();
        this.props.getGenderStart();

    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.genderDataFromRootReducer !== this.props.genderDataFromRootReducer) {
            let genders = this.props.genderDataFromRootReducer;
            // lấy data gender từ redux, sau khi đã đăng kí action để xử lí logic và reducer để chọn case xử lí . 
            // sau đó thực hiện tiêm mapStateToProps ( từ state của redux sang props của react)

            this.setState({
                genderArr : genders , 
                gender: genders && genders.length > 0 ? genders[0].key : ''
                // nếu có genders và genders.length > 0 thì lấy key của phần tử đầu tiên gán vào giá trị mặc định cho state 
                // còn nếu ko thỏa mãn đk thì state mặc định được gán rỗng sau khi đã update . 
            });
        }

        if (preProps.positionDataFromRootReducer !== this.props.positionDataFromRootReducer) {
            let positions = this.props.positionDataFromRootReducer;
            this.setState({
                positionArr: positions , 
                position : positions && positions.length > 0 ? positions[0].key : ''
            });
        }

        if (preProps.roleDataFromRootReducer !== this.props.roleDataFromRootReducer) {
            let roles = this.props.roleDataFromRootReducer;
            this.setState({
                roleArr: this.props.roleDataFromRootReducer,
                role : roles && roles.length > 0 ? roles[0].key : ''
            });
        }
    }

    handleOnchageImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl, // đường dẫn, state này dùng cho thư viện để chuyển ảnh 
                avatar: file // state này chính là avatar file 
            });
        }
    };

    isOpenPreviewImage = () => {
        if (!this.state.previewImageUrl) { return; }
        // nếu chưa có link ảnh , chưa có ảnh thì ra khỏi hàm , ko làm gì cả . 
        this.setState({
            isImagePreviewOpen: true
        });
    }

    handleOnchageInput = (event, id) => {
        let copyState = { ...this.state }; // sao chép hết state hiện tại 
        copyState[id] = event.target.value; // state đó gán giá trị bằng value của event
        this.setState({ // cập nhật toàn bộ state , thì sẽ ko cần tìm cái state lẻ mà nó thay đổi nữa
            ...copyState
        });
    }

    isCheckValidate = ()=>{
        let arrId = ['email', 'password', 'gender', 'phoneNumber', 'address', 'position', 'role', 'firstName', 'lastName', 'avatar'];
        let copyState = {...this.state};
        let isValid = true; 
        for(let i = 0; i < arrId.length; i++) {
            if(!copyState[arrId[i]]){
                alert(`This input string cannot be empty :${arrId[i]}`);
                isValid = false;
                break;
            }
        }
        return isValid ; 
    }

    handleSaveUser = () => {
        let isValid = this.isCheckValidate();
        if(isValid === false){ return ; }// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả


        // nếu thoát if thì fire action 
        this.props.createNewUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender , 
            roleId: this.state.role , 
            positionId : this.state.position , 
        });


    }

    render() {
        let positions = this.state.positionArr; // dùng để xả data vào dropdown 
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let language = this.props.language; //dùng redux lưu biến toàn cục language

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        // dùng để lưu và xử lí state của các input 
        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'>React Redux </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' name='email' placeholder='Enter email...' value={email}
                                    onChange={(event) => { this.handleOnchageInput(event, 'email') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' name='password' placeholder='Enter password...' value={password}
                                    onChange={(event) => this.handleOnchageInput(event, 'password')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='firstName' placeholder='Enter first name...' value={firstName}
                                    onChange={(event) => { this.handleOnchageInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' name='lastName' placeholder='Enter last name...' value={lastName}
                                    onChange={(event) => { this.handleOnchageInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' name='phoneNumber' placeholder='Enter phone number...' value={phoneNumber}
                                    onChange={(event) => { this.handleOnchageInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' name='address' placeholder='Enter address...' value={address}
                                    onChange={(event) => { this.handleOnchageInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.handleOnchageInput(event, 'position') }}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}
                                                    value={item.key}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.handleOnchageInput(event, 'role') }}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.handleOnchageInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' class="" id="previewImg"
                                        onChange={(event) => this.handleOnchageImage(event)} hidden />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div
                                        onClick={() => this.isOpenPreviewImage()}
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        className='preview-image'></div>
                                </div>

                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary' onClick={() => this.handleSaveUser()} ><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isImagePreviewOpen === true && <Lightbox
                    mainSrc={this.state.previewImageUrl}
                    onCloseRequest={() => this.setState({ isImagePreviewOpen: false })}
                />}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        positionDataFromRootReducer: state.admin.positions,
        genderDataFromRootReducer: state.admin.genders,
        roleDataFromRootReducer: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser : (data)=> dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

