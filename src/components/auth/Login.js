import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
        });

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.authenticate(values.username,values.password)
                    .then(data=>{
                        console.log('Logged in!', data);
                        message.success("Login Success");
                        this.props.handleLoginSuccessed();
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
                    {getFieldDecorator('username', {
                        rules: [{ required: true, type:'email', message: 'Please input a valid email address!' }],
                    })(
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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

const Login = Form.useForm({ name: 'normal_login' })(NormalLoginForm);
export default Login;