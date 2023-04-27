import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageUrl: '',
            isImagePreviewOpen : false
        };
    }

    async componentDidMount() {
        this.props.getPositionStart();
        // this.props.getRoleStart();
        this.props.getGenderStart();
    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.genderDataFromRootReducer !== this.props.genderDataFromRootReducer) {
            this.setState({
                genderArr: this.props.genderDataFromRootReducer,
            });
        }

        if (preProps.positionDataFromRootReducer !== this.props.positionDataFromRootReducer) {
            this.setState({
                positionArr: this.props.positionDataFromRootReducer
            });
        }

        if (preProps.roleDataFromRootReducer !== this.props.roleDataFromRootReducer) {
            this.setState({
                positionArr: this.props.roleDataFromRootReducer
            });
        }
    }

    handleOnchageImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl
            });
        }
    };

    isOpenPreviewImage = ()=>{
        if(!this.state.previewImageUrl){ return ;} 
        // nếu chưa có link ảnh , chưa có ảnh thì ra khỏi hàm , ko làm gì cả . 
        this.setState({
            isImagePreviewOpen : true
        });
    }

    render() {
        let positions = this.state.positionArr;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        console.log("Check tại userRedux role : ", this.state);
        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'>React Redux </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' name='email' placeholder='Enter email...' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' name='password' placeholder='Enter password...' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' name='firstName' placeholder='Enter first name...' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' name='lastName' placeholder='Enter last name...' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' name='phoneNumber' placeholder='Enter phone number...' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' name='address' placeholder='Enter address...' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                                        onClick={()=> this.isOpenPreviewImage()}
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        className='preview-image'></div>
                                </div>

                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isImagePreviewOpen ===true && <Lightbox
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
        // roleDataFromRootReducer : state.admin.roles 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // getRoleStart : ()=> dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

