import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import {Buffer} from 'buffer';


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        let arrDoctorsRender = this.state.arrDoctors;
        let { language} = this.props;
        // arrDoctorsRender = arrDoctorsRender.concat(arrDoctorsRender).concat(arrDoctorsRender);
        console.log('RENDER : ', arrDoctorsRender);

        return (
            <>
                <div className="section-OutstandingDoctor">
                    <div className="OutstandingDoctor-header">
                        {/* <span className="title-section"><FormattedMessage id="home-section-specialities.popular-specialties" /></span> */}
                       
                        <span><h3><FormattedMessage id='homepage.out-standing-doctor' /></h3></span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="OutstandingDoctor-body">
                        <Slider {...settings} className="OutstandingDoctor-body">

                            {arrDoctorsRender && arrDoctorsRender.length > 0 && arrDoctorsRender.map((item, index) => {
                                let imageDoctorBase64 = '';
                                if(item.image){
                                    imageDoctorBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }

                                let nameVi = `${item.positionData.valueVi}, ${item.lastName}, ${item.firstName} `;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName}, ${item.lastName} `;

                                return (
                                    <div className="slick-item" key={index}>
                                        <div className="bg-image" style={{backgroundImage : `url(${imageDoctorBase64})`}}></div>
                                        <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                                        <p>Cơ xương khớp</p>
                                    </div>
                                );
                            })}

                        </Slider>
                    </div>
                </div>
            </>
        );
    };
};


const mapStateToProps = state => {
    return {
        topDoctorsRedux: state.admin.topDoctors,
        language : state.app.language,
        isLoggedIn : state.user.isLoggedIn
        // the this following is the default value for 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.getTopDoctor())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);