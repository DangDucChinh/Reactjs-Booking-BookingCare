import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ProductManage extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='user-redux-container'>
                <div className='title user-redux-title'>Product manage</div>
            <div className="user-redux-body" >
                <div className=''>Thêm mới người dùng</div>
            </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
