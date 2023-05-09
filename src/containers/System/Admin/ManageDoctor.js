import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctors: '',
            description: '',
            allDoctorsReact: [],
        }
    };
    handleChange = (selectedDoctors) => { // ghi data vào state
        this.setState({ selectedDoctors : selectedDoctors  }); 
    };
    handleEditorChange = ({ html, text }) =>{ // hàm này ghi data vào state
        this.setState({
            contentHTML: html,  
            contentMarkdown: text
        })
    }
    componentDidMount = () => {
        this.props.renderAllDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
            this.setState({
                allDoctorsReact: dataSelectDoctor
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.builDataForInputDoctor(this.props.allDoctorsRedux);
            this.setState({
                allDoctorsReact: dataSelectDoctor
            });
        }
    }
    handleSaveContentMarkdown = () => { // xử lí save detail doctor
        this.props.actionSaveDetailDoctorReact({
            contentHTML: this.state.contentHTML , 
            contentMarkdown : this.state.contentMarkdown,
            doctorId : this.state.selectedDoctors.value , 
            description : this.state.de
        });
    };
    handleDescriptionDoctorChange = (event) => { // xử lí onchange cho description
        this.setState({
            description: event.target.value
        });
    }

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

    render() {
        return (
            <>
                <div className='manage-doctor-container container'>
                    <div className="manage-doctor-title">
                        Tao them thong tin doctor
                    </div>
                    <div className='more-infor'>
                        <div className='content-left'>
                            <label>Chọn bác sĩ : </label>
                            <Select
                                value={this.state.selectedDoctors} // 1
                                onChange={this.handleChange}
                                options={this.state.allDoctorsReact}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Thông tin giới thiệu : </label>
                            <textarea
                                rows="5"
                                className='form-control'
                                value={this.state.description}
                                onChange={(event) => this.handleDescriptionDoctorChange(event)}></textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>
                    <button
                        className='save-content-doctor'
                        onClick={this.handleSaveContentMarkdown}>Luu thong tin</button>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors
    }

};

const mapDispatchToProps = dispatch => {
    return {
        renderAllDoctors: () => dispatch(actions.fetchAllDoctorRedux()) , 
        actionSaveDetailDoctorReact : (dataFromRequestInput)=> dispatch(actions.saveDetailDoctorByRedux(dataFromRequestInput))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
