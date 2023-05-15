import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import Select from 'react-select';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userSevice';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

var bien = 0;

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    getArrDays = (language) => {
        let allDays = [];
        // tạo 1 dropdown chứa 7 ngày tiếp theo tính từ ngày hôm nay 
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (this.props.language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }

        return allDays;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1); // the messi international formatted believe it the suitcaser
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            });
        }
        console.log('conponent con didmount , tại đây các tham số nhận từ cha vẫn oke và chưa thay đổi , cha sẽ didmount sau đây ? ', this.props.doctorIdFromParent);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({ allDays: allDays });
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data
            });
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {

            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                });
            }
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        bien = bien + 1;
        console.log(`Render con lần :${bien} tại con, nhận tham số từ cha `, this.state.allAvailableTime);
        console.log('tham số truyền từ cha bởi props , vẫn trong render của con ,sau khi con render xong thì didmount ?? :', this.props.doctorIdFromParent);

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select className='select-time' onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index} >{item.label}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    return (<button className='btn-time' key={index}>
                                        {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                    </button>)
                                })

                                : <div><FormattedMessage id="patient.detail-doctor.no-schedule"></FormattedMessage></div>
                            }
                        </div>
                    </div>
                </div>
            </  >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
