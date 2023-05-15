import React, { Component } from "react";
import { connect } from 'react-redux';
import { dispatch } from "../../redux";
import { FormattedMessage } from "react-intl";
import './HomeHeader.scss';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnglish: false
        };
    }

    returnToHome = ()=>{
        if(this.props.history){
            this.props.history.push(`/home`);
        }
    }

    render() {
        let lang = this.props.language;
        // console.log('Check useer infor : ', this.props.userInfo);
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo" onClick={()=>this.returnToHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div><FormattedMessage id="homeheader.choose-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.medical-package" /></b></div>
                                <div><FormattedMessage id="homeheader.check-overview" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>Hỗ trợ
                            </div>
                            <div className={lang === 'vi' ? "flag-vi active" : "flag-vi"}>
                                <span className="" onClick={(event) => { this.handleChangeLanguage(LANGUAGES.VI) }}>VI</span>
                            </div>
                            <div className={lang === 'en' ? "flag-en active" : "flag-en"}>
                                <span className="" onClick={(event) => { this.handleChangeLanguage(LANGUAGES.EN) }}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-header-background">
                    {this.props.isShowBanner === true &&
                        <div className="home-header-banner">
                            <div className="content-up">
                                <div className="title-big">NỀN TẢNG Y TẾ</div>
                                <div className="title-small">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                                <div className="search">
                                    <i className="fas fa-search"></i>
                                    <input type="text" className="input-search" placeholder="Tìm chuyên khoa khám bệnh" />
                                </div>
                            </div>
                            <div className="content-down">
                                <div className="options">
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Chuyên khoa</div>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Tổng quát</div>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Từ xa</div>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Xét nghiệm</div>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Tinh thần</div>
                                        </div>
                                    </div>
                                    <div className="option-item">
                                        <div className="option-item-icon">
                                            <i className="far fa-hospital"></i>
                                        </div>
                                        <div className="option-item-text">
                                            <div className="">Nha khoa</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => { dispatch(changeLanguageApp(language)) }
        /**
         * retunr obj , thuộc tính changeLanguageAppRedux. Giá trị của thuộc tính này là một hàm, nhận đối số language và gửi một action creator gọi là changeLanguageApp với đối số là language.

mapDispatchToProps là một hàm =return> 1 đối tượng với các hàm tạo action đã được bọc trong một hàm dispatch. Thông thường, nó được sử dụng trong một ứng dụng React-Redux để cung cấp các hành động mà một thành phần cần phải gửi đến Redux store dưới dạng các props của thành phần.

Action creator là một hàm trong Redux, có nhiệm vụ trả về một object mô tả hành động (action). Object này bao gồm ít nhất một thuộc tính là type, mô tả loại hành động và các thông tin khác liên quan đến hành động đó.
obj mà action creator trả về có định dạng : {
    type : CHANGE_LANGUAGE,
    languegae : 'en'
}
Khi gọi hàm action creator changeLanguageApp, bạn sẽ nhận được một object giống như trên, và sau đó bạn có thể gửi nó đến Redux store bằng cách sử dụng hàm dispatch của Redux. Các reducer trong Redux sẽ nhận và xử lý các hành động này để cập nhật trạng thái của ứng dụng.
*/
    };
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(HomeHeader));