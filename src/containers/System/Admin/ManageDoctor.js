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
            hasOldData : false
        }
    };
    handleChange = async (selectedDoctors) => { // ghi data vào state
        this.setState({ selectedDoctors : selectedDoctors  }); 

        let response = await getDetailDoctor(selectedDoctors.value);
        if(response && response.errCode === 0 && response.data.Markdown && response.data.Markdown.contentHTML
            && response.data.Markdown.contentMarkdown && response.data.Markdown.description){
            let markdown = response.data.Markdown;
            this.setState({
                contentHTML : markdown.contentHTML , 
                contentMarkdown : markdown.contentMarkdown,
                description : markdown.description , 
                hasOldData : true
            });
        }else {
            this.setState({
                contentHTML : '',
                contentMarkdown : '',
                description : '' , 
                hasOldData : false
            });
        }
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
        let {hasOldData} = this.state ; 

        this.props.actionSaveDetailDoctorReact({
            contentHTML: this.state.contentHTML , 
            contentMarkdown : this.state.contentMarkdown,
            doctorId : this.state.selectedDoctors.value , 
            description : this.state.description, 
            action : hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
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
        // console.log('checkstate : ' , this.state);
        let { hasOldData} = this.state;
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
                            onChange={this.handleEditorChange} 
                            value={this.state.contentMarkdown}/>
                    </div>
                    <button
                        className={hasOldData === true ?'save-content-doctor' : 'create-content-doctor'}
                        onClick={this.handleSaveContentMarkdown}>
                            {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                        </button>
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
