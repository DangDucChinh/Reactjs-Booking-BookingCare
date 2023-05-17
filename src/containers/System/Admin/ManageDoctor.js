import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailDoctor } from '../../../services/userSevice';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            allDoctorsReact: [],
            hasOldData: false,

            // save to more infor doctor : 
            // lấy từ db ra
            listPrice: [],
            listPayment: [],
            listProvince: [],
            // lưu cái được chọn vào db
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    };
    handleChange = async (selectedDoctor) => { // ghi data vào state
        this.setState({ selectedDoctor: selectedDoctor });

        let response = await getDetailDoctor(selectedDoctor.value);
        if (response && response.errCode === 0 && response.data.Markdown && response.data.Markdown.contentHTML
            && response.data.Markdown.contentMarkdown && response.data.Markdown.description) {

            let markdown = response.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '';
            if (response.data.Doctor_Infor) {
                addressClinic = response.data.Doctor_Infor.addressClinic ? response.data.Doctor_Infor.addressClinic : '';
                nameClinic = response.data.Doctor_Infor.nameClinic ? response.data.Doctor_Infor.nameClinic : '';
                note = response.data.Doctor_Infor.note ? response.data.Doctor_Infor.note : '';
                paymentId = response.data.Doctor_Infor.paymentId ? response.data.Doctor_Infor.paymentId : '';
                priceId = response.data.Doctor_Infor.priceId ? response.data.Doctor_Infor.priceId : '';
                provinceId = response.data.Doctor_Infor.provinceId ? response.data.Doctor_Infor.provinceId : '';
            }

            selectedPayment = this.state.listPayment.find(item => {
                return item && item.value === paymentId
            });

            selectedPrice = this.state.listPrice.find(item => {
                return item && item.value === priceId
            });

            selectedProvince = this.state.listProvince.find(item => {
                return item && item.value === provinceId
            });




            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
            });
        }
    };
    handleEditorChange = ({ html, text }) => { // hàm này ghi data vào state
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }
    componentDidMount = () => {
        this.props.renderAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux, 'USERS');
            this.setState({
                allDoctorsReact: dataSelectDoctor
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.builDataForInputDoctor(resPrice.allcodes, 'PRICE');
            let dataSelectPayment = this.builDataForInputDoctor(resPayment.allcodes, 'PAYMENT');
            let dataSelectProvince = this.builDataForInputDoctor(resProvince.allcodes, 'PROVINCE');
            this.setState({
                allDoctorsReact: dataSelectDoctor,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            });
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.builDataForInputDoctor(resPrice.allcodes, 'PRICE');
            let dataSelectPayment = this.builDataForInputDoctor(resPayment.allcodes, 'PAYMENT');
            let dataSelectProvince = this.builDataForInputDoctor(resProvince.allcodes, 'PROVINCE');


            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleSaveInforDoctor = () => { // xử lí save detail doctor
        let { hasOldData } = this.state;

        this.props.actionSaveDetailDoctorReact({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            doctorId: this.state.selectedDoctor.value,
            description: this.state.description,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        });
    };
    handleOnChangeText = (event, nameInput) => { // xử lí onchange cho description, cho note, address clinic and name clinic
        let stateCopy = { ...this.state };
        stateCopy[nameInput] = event.target.value;
        this.setState({
            ...stateCopy
        });
    }

    handleChangeSelectedDoctorMoreInfor = async (seletedOption, objInput) => {
        let copyState = { ...this.state };

        let stateName = objInput.name;
        copyState[stateName] = seletedOption;
        this.setState({
            ...copyState
        });
    }

    builDataForInputDoctor = (dataInput, type) => { // so sánh để hiển thị data ra input doctor 
        let result = [];
        let { language } = this.props;

        if (dataInput && dataInput.length > 0) {
            if (type === 'USERS') {
                dataInput.map((item, index) => {
                    let obj = {};
                    let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                    let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj);
                });
            }

            if (type === 'PRICE' || type === 'price') {
                dataInput.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                });
            }

            if (type === 'province' || type === 'PROVINCE' || type === 'payment' || type === 'PAYMENT') {
                dataInput.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`

                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                });
            }
        }

        return result;
    }

    render() {
        console.log('checkstate : ', this.state);
        let { hasOldData } = this.state;
        return (
            <>
                <div className='manage-doctor-container container'>
                    <div className="manage-doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title"></FormattedMessage>
                    </div>
                    <div className='more-infor'>
                        <div className='content-left'>
                            <label><FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage></label>
                            <Select
                                value={this.state.selectedDoctor} // 1
                                onChange={this.handleChange}
                                options={this.state.allDoctorsReact}
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor"></FormattedMessage>}
                            />
                        </div>
                        <div className='content-right'>
                            <label>      <FormattedMessage id="admin.manage-doctor.introductory-information"></FormattedMessage></label>
                            <textarea
                                rows="5"
                                className='form-control'
                                value={this.state.description}
                                onChange={(event) => this.handleOnChangeText(event, 'description')}></textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label> <FormattedMessage id="admin.manage-doctor.choose-price"></FormattedMessage></label>
                            <Select
                                value={this.state.selectedPrice} // 1
                                onChange={this.handleChangeSelectedDoctorMoreInfor}
                                name="selectedPrice"
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-price"></FormattedMessage>}
                                options={this.state.listPrice} />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-province"></FormattedMessage>

                            </label>
                            <Select
                                value={this.state.selectedProvince} // 1
                                onChange={this.handleChangeSelectedDoctorMoreInfor}
                                name="selectedProvince"
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-province"></FormattedMessage>}
                                options={this.state.listProvince} />
                        </div>
                        <div className='col-4 form-group'>
                            <label>   <FormattedMessage id="admin.manage-doctor.choose-payment"></FormattedMessage></label>
                            <Select
                                value={this.state.selectedPayment} // 1
                                onChange={this.handleChangeSelectedDoctorMoreInfor}
                                name="selectedPayment"
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-payment"></FormattedMessage>}
                                options={this.state.listPayment} />
                        </div>
                        <div className='col-4 form-group'>
                            <label>     <FormattedMessage id="admin.manage-doctor.name-clinic"></FormattedMessage></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <FormattedMessage id="admin.manage-doctor.address-clinic"></FormattedMessage>
                            <label></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.note"></FormattedMessage>
                            </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />
                    </div>
                    <button
                        className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={this.handleSaveInforDoctor}>
                        {hasOldData === true ? <span>
                            <FormattedMessage id="admin.manage-doctor.save-infor"></FormattedMessage>
                        </span> : <span>
                            <FormattedMessage id="admin.manage-doctor.create-infor"></FormattedMessage></span>}
                    </button>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    }

};

const mapDispatchToProps = dispatch => {
    return {
        renderAllDoctors: () => dispatch(actions.fetchAllDoctorRedux()),
        actionSaveDetailDoctorReact: (dataFromRequestInput) => dispatch(actions.saveDetailDoctorByRedux(dataFromRequestInput)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
