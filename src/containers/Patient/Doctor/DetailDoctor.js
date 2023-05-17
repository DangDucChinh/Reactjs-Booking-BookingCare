import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailDoctor } from '../../../services/userSevice';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';





class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        console.log('Cha didmount , nếu cha setstate thì cha render , sau đó lại truyền props khiến conrender , sau đó lại lặp lại đến khi con render xong .');
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                currentDoctorId : this.props.match.params.id
            });

            let res = await getDetailDoctor(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            } else {
                this.setState({
                    detailDoctor: {}
                })
            }
        }
       
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;

        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName} `;
        };
        console.log('Render lần đầu tại cha, sau khi render xong truyền tham số xuống cho con');


        return (
            <>
                <HomeHeader isShowBanner={false}></HomeHeader>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{
                            backgroundImage: `url(${detailDoctor.image})`
                        }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'><h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3></div>
                            <div className='right'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <div>{detailDoctor.Markdown.description} </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />

                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
