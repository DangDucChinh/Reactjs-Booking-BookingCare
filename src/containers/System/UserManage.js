import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userSevice';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUser: []
        }
    };
    async componentDidMount() {
        let response = await getAllUsers('ALL');
        console.log(response);
        this.setState({
            arrayUser: response.users
        }, () => {
            console.log('check 1 sau khi load data xong thì callback', this.state.arrayUser);
        });
    }

    render() {
        console.log('checkout user : ', this.state);
        return (
            <div className="user-container">
                <div className='title text-center'>
                    Manage User Dadcy
                </div>
                <div className='table-users mt-3 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>ID</th>
                            <th>Thao tác</th>
                        </tr>
                            { this.state.arrayUser && this.state.arrayUser.map((item, index)=>{
                                    return (
                                            <tr>
                                                <td>{index}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.id}</td>
                                                <td>
                                                    <button className='btn-edit'><i class="fas fa-wrench"></i></button>
                                                    <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>

                                    );
                                })
                            }
                    </table>
                </div >
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
