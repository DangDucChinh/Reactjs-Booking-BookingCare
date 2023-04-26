import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';


class OutstandingDoctor extends Component {


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };

        return (
            <>
                <div className="section-OutstandingDoctor">
                    <div className="OutstandingDoctor-header">
                        {/* <span className="title-section"><FormattedMessage id="home-section-specialities.popular-specialties" /></span> */}
                        <span>Bác sĩ nổi bật</span>
                        <button class="btn-section" type="button">
                            <FormattedMessage id="home-section-specialities.see-more" />
                        </button>
                    </div>
                    <div className="OutstandingDoctor-body">
                        <Slider {...settings} className="OutstandingDoctor-body">
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.remote-pediatrician" /></p>
                            </div>
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.remote-pediatrician" /></p>
                            </div>
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.remote-nephrologist-urologist" /></p>
                            </div>
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.remote-pulmonologist-respiratory" /></p>
                            </div>
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.remote-neurologist" /></p>
                            </div>
                            <div className="slick-item">
                                <div className="bg-image"></div>
                                <p><FormattedMessage id="home-section-specialities.consulting-doctor-F0" /></p>
                            </div>
                        </Slider>
                    </div>
                </div>
            </>
        );
    };
};


const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
}

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);