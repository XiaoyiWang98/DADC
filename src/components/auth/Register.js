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

                if(this.props.userNGO){
                    values.ngo = "1";
                }else{
                    values.ngo = "0";
                }

                if(!values.lastName){
                    values.lastName="b";
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

        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 4 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };
        // const tailFormItemLayout = {
        //     wrapperCol: {
        //         xs: {
        //             span: 24,
        //             offset: 0,
        //         },
        //         sm: {
        //             span: 16,
        //             offset: 4,
        //         },
        //     },
        // };

        return (
            <Form  onSubmit={this.handleSubmit} className="register">

               <dev className="signUp">
               {this.props.userNGO?
                        <h4>Sign Up As Ngo</h4>
                        :<h4>Sign Up As Resident</h4>
                    }
               </dev>

               <hr className="line"/>

                
                {this.props.userNGO ?
                <div >
                    <Form.Item >
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: 'Please input your Bussiness name!'}],
                        })(
                            <Input
                                placeholder="Organization Name"
                            />,
                        )}
                    </Form.Item>
                    </div>
                    :
                    <div className="name">
                    <Form.Item >
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: 'Please input your first name!'}],
                        })(
                            <Input
                                placeholder="First Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item >
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                    })(
                        <Input
                            placeholder="Last Name"
                        />,
                    )}
                </Form.Item>
                </div>
                }
                
               

                <Form.Item >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type:'email', message: 'Please input a valid email address!'}],
                    })(<Input
                        placeholder="Email"
                    />)}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input
                            placeholder="Mobile Number"
                        />,
                    )}
                </Form.Item>

                <Form.Item  hasFeedback>
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
                    })(<Input.Password placeholder="Password"/>)}
                </Form.Item>

                <Form.Item hasFeedback>
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
                    })(<Input.Password onBlur={this.handleConfirmBlur} 
                                        placeholder="Confirm Password"
                    />)}
                </Form.Item>

                {this.props.userNGO? <Form.Item  hasFeedback>
                    {getFieldDecorator("NGOInvitation", {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your NGO Invitation Code!',
                            },
                        ],
                    })(<Input onBlur={this.handleConfirmBlur} 
                                placeholder="NGO Invitation Code"/>)}
                </Form.Item>: null}

                
{/* 
                {this.props.userNGO?
                    null:
                    <Form.Item >
                        {getFieldDecorator('middleName', {
                            rules: [{ required: false}],
                        })(
                            <Input
                                placeholder="Middle Name"
                            />,
                        )}
                    </Form.Item>
                } */}

                

                <Form.Item >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your mailing address!' }],
                    })(
                        <Input placeholder="Street Address" autoSize />
                    )}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: 'Please input the city of your mailing address!' }],
                    })(
                        <Input placeholder="City" autoSize />
                    )}
                </Form.Item>
                <div className="name">
                <Form.Item >
                    {getFieldDecorator('state', {
                        rules: [{ required: true, message: 'Please input the state of your mailing address!' }],
                    })(
                        <Input placeholder="State" autoSize />
                    )}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('postal', {
                        rules: [{ required: true, message: 'Please input the postal code of your mailing address!' }],
                    })(
                        <Input placeholder="Zip Code" autoSize />
                    )}
                </Form.Item>
                </div>
                

                

                <Form.Item className="signUp">
                    <Button className="button-submit" htmlType="submit">
                        Sign Up
                    </Button><br/>
                    Already have an account?<Link className="link" to="/Login">Sign in</Link><br/>
                    {this.props.userNGO?
                        <span>
                            Switch to <Link className="link" onClick={this.props.switchToDonor}>Resident Account</Link>
                        </span>:
                        <span>
                            Switch to <Link className="link" onClick={this.props.switchToNGO}>Ngo Account</Link>
                        </span>
                    }
                </Form.Item>

            </Form>
        );
    }
}

export const Register = Form.create({ name: 'register' })(RegistrationForm);