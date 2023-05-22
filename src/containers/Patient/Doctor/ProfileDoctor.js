import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userSevice';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';




class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorIdForChildFromDad);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let response = await getProfileDoctorById(id);
            if (response && response.errCode === 0) {
                result = response.data;
            }
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) { }

        if (this.props.doctorIdForChildFromDad !== prevProps.doctorIdForChildFromDad) {
            // this.getInforDoctor(this.props.doctorIdForChildFromDad);
        } // khi có sự thay đổi của thành phần state được truyền từ cha qua props đến con này, sẽ tiến hành gọi hàm và trả ra data của doctor khi lấy được doctorId
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking"></FormattedMessage></div>
                </>
            )
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName} `;
        };

        return (
            <>
                <div className=''>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{
                            backgroundImage: `url(${dataProfile.image})`
                        }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'><h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3></div>
                            <div className='down'>
                                {isShowDescriptionDoctor === true ?
                                    <>
                                        {
                                            dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                            && <span>{dataProfile.Markdown.description} </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='price'>
                    <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                            <NumberFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                            : ''}

                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?
                            <NumberFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'USD'}
                            />
                            : ''}

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    }

};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
