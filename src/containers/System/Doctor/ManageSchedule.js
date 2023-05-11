import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorsForSelect: [],
            selectedDoctor: {},
            currentDate: '',
            allScheduleTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllCodeScheduleTimeByRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
            this.setState({
                doctorsForSelect: dataSelectDoctor
            });
        }

        if (prevProps.allScheduleTimeByRedux !== this.props.allScheduleTimeByRedux) {
            this.setState({
                allScheduleTime: this.props.allScheduleTimeByRedux
            });
        }


        // if (prevProps.language !== this.props.language) {
        //     let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
        //     this.setState({
        //         allDoctorsReact: dataSelectDoctor
        //     });
        // }
    }

    handleChange = async (selectedDoctor) => { // ghi data vào state
        this.setState({ selectedDoctor: selectedDoctor });

        // let response = await getDetailDoctor(selectedDoctors.value);
        // if(response && response.errCode === 0 && response.data.Markdown && response.data.Markdown.contentHTML
        //     && response.data.Markdown.contentMarkdown && response.data.Markdown.description){
        //     let markdown = response.data.Markdown;
        //     this.setState({
        //         contentHTML : markdown.contentHTML , 
        //         contentMarkdown : markdown.contentMarkdown,
        //         description : markdown.description , 
        //         hasOldData : true
        //     });
        // }else {
        //     this.setState({
        //         contentHTML : '',
        //         contentMarkdown : '',
        //         description : '' , 
        //         hasOldData : false
        //     });
        // }
    };

    builDataForInputDoctor = (dataInput) => { // so sánh để hiển thị data ra input doctor 
        let result = [];
        let { language } = this.props;

        if (dataInput && dataInput.length > 0) {
            dataInput.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }

        return result;
    }

    handleClickScheduleTime = () => {

    }

    handleChangeDatePicker = (date) => {
        this.setState({ currentDate: date[0] });
    }

    render() {
        // console.log('state : ', this.state);
        let { allScheduleTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor} // 1
                                    onChange={this.handleChange}
                                    options={this.state.doctorsForSelect}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                    onChange={this.handleChangeDatePicker}
                                    className='form-control' />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {allScheduleTime && allScheduleTime.length > 0 &&
                                    allScheduleTime.map((item, index) => {
                                        return (
                                            <button className='btn btn-schedule' key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary btn-save' onClick={this.handleClickScheduleTime}>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allScheduleTimeByRedux: state.admin.allScheduleTime,
    }

};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctorRedux()),
        fetchAllCodeScheduleTimeByRedux: () => dispatch(actions.fetchAllCodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
