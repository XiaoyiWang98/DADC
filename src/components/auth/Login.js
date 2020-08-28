import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import Pool from "./UserPool";

class NormalLoginForm extends Component {

    authenticate = async (Username,Password) =>
        await new Promise((resolve,reject)=>{

            const user = new CognitoUser({Username, Pool});
            const authDetails = new AuthenticationDetails({Username, Password});
            user.authenticateUser(authDetails, {            
                onSuccess: data => {
                    console.log("onSuccess: ",data);                   
                    resolve(data);
                },
                onFailure: err => {
                    console.error('onFailure: ', err)
                    reject(err)
                },
                newPasswordRequired: data => {
                    console.log('newPasswordRequired: ',data)
                    resolve(data);
                }
            });
            console.log('user->',user);
        });

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.authenticate(values.username,values.password)
                    .then(data=>{
                        console.log('Logged in!', data);

                        if(((data.idToken.payload["custom:custom:NGO"] == 0)&&(this.props.userNGO==false))
                        ||((data.idToken.payload["custom:custom:NGO"] == 1)&&(this.props.userNGO==true))){
                            message.success("Login Success");
                            this.props.handleLoginSucceed();
                        }else{
                            this.props.userNGO?
                                message.error("Please switch to Donor Page to login")
                                :message.error("Please switch to NGO Page to login");
                            this.props.handleLogout();
                        }

                })
                    .catch(err=>{
                        console.error('Failed to login!',err.code);
                        message.error(err.message);
                    })
            }
        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {this.props.userNGO?
                        <h4>Welcome and Pickup</h4>
                        :<h4>Welcome and Donate</h4>
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, type:'email', message: 'Please input a valid email address!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;