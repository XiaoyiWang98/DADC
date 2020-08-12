import React, {Component} from 'react';
import {Form, Input, Button, message, Icon,Checkbox} from 'antd';
import UserPool from "./UserPool";
import { Link } from 'react-router-dom';
import TextArea from "antd/lib/input/TextArea";

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if(!values.middleName){
                    values.middleName = "";
                }

                if(values.ngo){
                    values.ngo = "1";
                }else{
                    values.ngo = "0";
                }

                console.log('Received values of form: ', values);

                UserPool.signUp(values.email,values.password,
                    [
                        {
                            "Name":"address",
                            "Value":values.address
                        },
                        {
                            "Name":"email",
                            "Value":values.email
                        },
                        {
                            "Name":"given_name",
                            "Value":values.firstName
                        },
                        {
                            "Name":"family_name",
                            "Value":values.lastName
                        },
                        {
                            "Name":"middle_name",
                            "Value":values.middleName
                        },
                        {
                            "Name":"phone_number",
                            "Value":values.phone
                        },
                        {
                            "Name":"custom:custom:NGO",
                            "Value":values.ngo
                        }
                    ]
                    ,null,(err,data)=>{
                    if(err){
                        console.error(err);
                        message.error(err.message);
                    } else {
                        console.log(data);
                        message.success("Registration succeed! Please confirm your email before login!");
                        this.props.handleLogout();
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register">

                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type:'email', message: 'Please input a valid email address!'}],
                    })(<Input
                        placeholder="Email"
                    />)}
                </Form.Item>

                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>

                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item label="First Name">
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                    })(
                        <Input
                            placeholder="First Name"
                        />,
                    )}
                </Form.Item>

                <Form.Item label="Middle Name">
                    {getFieldDecorator('middleName', {
                        rules: [{ required: false}],
                    })(
                        <Input
                            placeholder="Middle Name"
                        />,
                    )}
                </Form.Item>

                <Form.Item label="Last Name">
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                    })(
                        <Input
                            placeholder="Last Name"
                        />,
                    )}
                </Form.Item>

                <Form.Item label="Primary Address">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your primary address!' }],
                    })(
                        // <Input
                        //     placeholder="Primary address"
                        // />,
                        <TextArea placeholder="Primary address" autoSize />
                    )}
                </Form.Item>

                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input
                            placeholder="format: +1##########"
                        />,
                    )}
                </Form.Item>

                <Form.Item className="check-box">
                    {getFieldDecorator('ngo', {
                        rules: [{ required: false}],
                    })(
                        <Checkbox>Are you a NGO member?</Checkbox>,
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p>I already have an account, go back to <Link to="/">login</Link>
                    </p>
                </Form.Item>

            </Form>
        );
    }
}

export const Register = Form.create({ name: 'register' })(RegistrationForm);