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
        if (value && value.length < 8){
            callback('Minimum length of the password is 8 characters');
        }else if(value && !(/\d/.test(value))){
            callback('Password requires numbers');
        }else if(value && !(/(?=.*[a-z])/.test(value))){
            callback('Password requires lowercase letters');
        }else if(value && !(/(?=.*[A-Z])/.test(value))){
            callback('Password requires uppercase letters');
        } else if(value && !(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value))){
            callback('Password requires special characters');
        }  else {
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], {force: true});
            }
            callback();
        }
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
                            "Value":("+1").concat(values.phone)
                        },
                        {
                            "Name":"custom:custom:NGO",
                            "Value":values.ngo
                        },
                        {
                            "Name":"custom:city",
                            "Value":values.city
                        },
                        {
                            "Name":"custom:state",
                            "Value":values.state
                        },
                        {
                            "Name":"custom:postalCode",
                            "Value":values.postal
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

                <Form.Item label="Mailing Address">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your mailing address!' }],
                    })(
                        // <Input
                        //     placeholder="Primary address"
                        // />,
                        <TextArea placeholder="Mailing address" autoSize />
                    )}
                </Form.Item>

                <Form.Item label="City">
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: 'Please input the city of your mailing address!' }],
                    })(
                        // <Input
                        //     placeholder="Primary address"
                        // />,
                        <Input placeholder="Ex: San Francisco" autoSize />
                    )}
                </Form.Item>

                <Form.Item label="State">
                    {getFieldDecorator('state', {
                        rules: [{ required: true, message: 'Please input the state of your mailing address!' }],
                    })(
                        // <Input
                        //     placeholder="Primary address"
                        // />,
                        <Input placeholder="Ex: CA" autoSize />
                    )}
                </Form.Item>

                <Form.Item label="Postal Code">
                    {getFieldDecorator('postal', {
                        rules: [{ required: true, message: 'Please input the postal code of your mailing address!' }],
                    })(
                        // <Input
                        //     placeholder="Primary address"
                        // />,
                        <Input placeholder="Ex: 94116" autoSize />
                    )}
                </Form.Item>

                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input
                            placeholder="Phone Number"
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