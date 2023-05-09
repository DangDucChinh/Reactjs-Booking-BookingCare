import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS} from '../../../utils/constant';
import {CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import {Buffer} from 'buffer';


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
            avatar: '',

            action: '',
            userEditId : ''
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
                genderArr: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
                // nếu có genders và genders.length > 0 thì lấy key của phần tử đầu tiên gán vào giá trị mặc định cho state 
                // còn nếu ko thỏa mãn đk thì state mặc định được gán rỗng sau khi đã update . 
            });
        }

        if (preProps.positionDataFromRootReducer !== this.props.positionDataFromRootReducer) {
            let positions = this.props.positionDataFromRootReducer;
            this.setState({
                positionArr: positions,
                position: positions && positions.length > 0 ? positions[0].keyMap : ''
            });
        }

        if (preProps.roleDataFromRootReducer !== this.props.roleDataFromRootReducer) {
            let roles = this.props.roleDataFromRootReducer;
            this.setState({
                roleArr: this.props.roleDataFromRootReducer,
                role: roles && roles.length > 0 ? roles[0].keyMap : ''
            });
        }

        if (preProps.listUsers !== this.props.listUsers) {
            let roles = this.props.roleDataFromRootReducer;
            let positions = this.props.positionDataFromRootReducer;
            let genders = this.props.genderDataFromRootReducer;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: genders && genders.length > 0 ? genders[0].keyMap : '',
                position: positions && positions.length > 0 ? positions[0].keyMap : '',
                role: roles && roles.length > 0 ? roles[0].keyMap : '',
                avatar: '',
                action : CRUD_ACTIONS.CREATE , 
                previewImageUrl : ''
                // khi list người dùng có sự thay đổi, hành động cập nhật lúc này đã xong . 
                // lúc đó , các input cần trở về trạng thái rỗng để tiếp tục nhận dữ liệu và xử lí chúng, Do đó action lại quay về trạng
                // thái create . 
            })
        }
    }

    handleOnchageImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            console.log('BASE :', base64);
            this.setState({
                previewImageUrl: objectUrl, // đường dẫn, state này dùng cho thư viện để chuyển ảnh 
                avatar: base64 // state này chính là avatar file 
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

    isCheckValidate = () => {
        let arrId = ['email', 'password', 'gender', 'phoneNumber', 'address', 'position', 'role', 'firstName', 'lastName'];
        let copyState = { ...this.state };
        let isValid = true;
        for (let i = 0; i < arrId.length; i++) {
            if (!copyState[arrId[i]]) {
                alert(`This input string cannot be empty :${arrId[i]}`);
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.isCheckValidate();
        if (isValid === false) { return; }// nếu isValid === false thì thoát khỏi hàm mà ko làm gì cả


        // nếu thoát if thì fire action 
        let {action } = this.state; 
        // 1. nếu action === create thì fire redux create user
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position , 
                avatar : this.state.avatar
            });
        }

        if(action === CRUD_ACTIONS.EDIT){
            // fire redux edit user
            alert('BUG');
            this.props.editUser(this.state.userEditId,{
                id : this.state.userEditId,
                email : this.state.email , 
                password : this.state.password ,
                firstName : this.state.firstName ,
                lastName : this.state.lastName , 
                phoneNumber : this.state.phoneNumber,
                address : this.state.address , 
                gender : this.state.gender , 
                roleId : this.state.role , 
                positionId : this.state.position,
                avatar : this.state.avatar
            });
        }
        
        
    }

    handleEditUserFromParent = (dataFromChild) => {
        // console.log('Check handle edit user from parent', dataFromChild);
        let imageBase64 = '';
        if(dataFromChild.image){
            imageBase64 = new Buffer(dataFromChild.image, 'base64').toString('binary');
        }
        this.setState({
            email: dataFromChild.email,
            password: 'HARDCODE',
            firstName: dataFromChild.firstName,
            lastName: dataFromChild.lastName,
            phoneNumber: dataFromChild.phoneNumber,
            address: dataFromChild.address,
            gender: dataFromChild.gender,
            position: dataFromChild.positionId,
            role: dataFromChild.roleId,
            avatar: '',
            previewImageUrl : imageBase64 , 
            action : CRUD_ACTIONS.EDIT ,
            userEditId : dataFromChild.id 
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
                                    onChange={(event) => { this.handleOnchageInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false } />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' name='password' placeholder='Enter password...' value={password}
                                    onChange={(event) => this.handleOnchageInput(event, 'password')} 
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false } />
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
                                    onChange={(event) => { this.handleOnchageInput(event, 'position') }} value={position}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}
                                                    value={item.keyMap}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.handleOnchageInput(event, 'role') }} value={role}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.handleOnchageInput(event, 'gender') }} value={gender}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()} >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?  <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>

                            <div className='col-12 mt-3'>
                                <TableManageUser handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                                {/* ko dính dáng gì đến redux , phần tử tại đây chỉ đơn giản là component con muốn 
                                gọi đến hàm trong component cha . Truy cập vào bởi key thì sẽ đến được value
                                - Cũng ko có dấu đóng mở ngoặc tại handleEditUSerFromPArent, lí do là bởi hàm con chạy đến key
                                này thì nó sẽ nhận cổng từ cha theo cơ chế : this.props ; Như vậy dùng key mở đc value thì sẽ mò đến hàm của cha , lúc đó hàm viết tại cha ( mới có ngoặc ) 
                                
                                - đây chính là cách truyền dữ liệu từ con sang cha, ( tại con dùng this.props để lấy value bởi key, sau đó dữ liệu sẽ đc cha nhận tại đó . 
                                
                                - Còn nếu truyền từ cha sang con thì tại thành phần đó có thể mang theo một phần có thể userr 
                                đẩy lùi và có thể mang theo một phần c*/}
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
        roleDataFromRootReducer: state.admin.roles,
        listUsers: state.admin.users

        // khi redux vừa lưu thêm= tạo mới dữ liệu thì biến listUsers được cập nhật . Khi đó DidupDate sẽ hoạt động
        // và tạo nên tình trạng setStae khi có sự khác nhau giữa các giá trị cũ và hiện tại ( được cập nhật) 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)), 
        editUser : (id , data) => dispatch(actions.editUser(id , data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

