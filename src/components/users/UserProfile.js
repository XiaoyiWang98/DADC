import React, { Component } from "react";
import UserPool from "../auth/UserPool";
import "../../styles/UserProfile.css";
import { EditTwoTone } from "@ant-design/icons";
import { Button, Input, Form } from "antd";

class UserProfileForm extends Component {
  state = {
    user_id: this.props.info.user_id,
    email: this.props.info.email,
    address: this.props.info.address,
    NGO: this.props.info.NGO,
    lastName: this.props.info.lastName,
    firstName: this.props.info.firstName,
    phoneNumber: this.props.info.phoneNumber,
    city: this.props.info.city,
    state: this.props.info.state,
    postal: this.props.info.postal,
    edit: false,
  };

  componentDidMount() {
    console.log(this.props.info);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
    console.log(this.state.user_id);
    console.log(this.state.address);
    console.log(this.state.phoneNumber);
    console.log(this.state.email);
    console.log(this.state.city);
    console.log(this.state.state);
    console.log(this.state.postal);
  }

  // componentDidUpdate(){
  //     this.props.updateInfo(this.state);
  // }
  editProfile = () => {
    this.setState({ edit: !this.state.edit });
    console.log("edit->", this.state.edit);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = UserPool.getCurrentUser();
        console.log("user->", user);
        if (user != null) {
          user.getSession(function (err, session) {
            if (err) {
              alert(err.message || JSON.stringify(err));
            }
          });
        }
        user.updateAttributes(
          [
            {
              Name: "address",
              Value: values.address,
            },
            {
              Name: "email",
              Value: values.email,
            },
            {
              Name: "given_name",
              Value: values.firstName,
            },
            {
              Name: "family_name",
              Value: values.lastName,
            },
            {
              Name: "phone_number",
              Value: values.phoneNumber,
            },
            {
              Name: "custom:city",
              Value: values.city,
            },
            {
              Name: "custom:state",
              Value: values.state,
            },
            {
              Name: "custom:postalCode",
              Value: values.postal,
            },
          ],
          (err, result) => {
            if (err) {
              alert(err.message || JSON.stringify(err));
            } else {
              this.setState({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                address: values.address,
                city: values.city,
                state: values.state,
                postal: values.postal,
                edit: false,
              });
              this.props.updateInfo(this.state);
            }
            console.log("call result:" + result);
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      city,
      state,
      postal,
    } = this.state;
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

    // var NGO_label;
    // if (this.state.NGO === 1) {
    //     NGO_label = null;
    // } else {
    //     NGO_label = "not";
    // }

    return (
      <div className="main-content my-profile">
        <div className="main-title">My Profile</div>
        <hr className="divide" />
        {!this.state.edit ? (
          <div className="profile">
            {this.state.NGO == 0 ? (
              <div>
                <div className="describe profile-name">
                  <div>Name</div>
                  <EditTwoTone
                    twoToneColor="#02a95c"
                    size="large"
                    onClick={this.editProfile}
                  />
                </div>
                <div className="info">
                  {this.state.firstName} {this.state.lastName}
                </div>
              </div>
            ) : (
              <div>
                <div className="describe">
                  Organization Name:
                  <EditTwoTone
                    twoToneColor="#02a95c"
                    size="large"
                    onClick={this.editProfile}
                  />
                </div>
                <div className="info">{this.state.firstName}</div>
              </div>
            )}
            <div className="describe">Email</div>
            <div className="info">{this.state.email}</div>

            <div className="describe">Phone Number</div>
            <div className="info">{this.state.phoneNumber}</div>

            <div className="describe">Address</div>
            <div className="info">{this.state.address}</div>
            <div className="info">
              {this.state.city}, {this.state.state} {this.state.postal}
            </div>
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit} className="register">
            <div className="name">
              <Form.Item>
                {getFieldDecorator("firstName", {
                  initialValue: firstName,
                  rules: [
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ],
                })(<Input placeholder="First Name" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("lastName", {
                  initialValue: lastName,
                  rules: [
                    { required: true, message: "Please input your last name!" },
                  ],
                })(<Input placeholder="Last Name" />)}
              </Form.Item>
            </div>

            <Form.Item>
              {getFieldDecorator("email", {
                initialValue: email,
                rules: [
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email address!",
                  },
                ],
              })(<Input placeholder="Email" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("phoneNumber", {
                initialValue: phoneNumber,
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ],
              })(<Input placeholder="Phone Number" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("address", {
                initialValue: address,
                rules: [
                  {
                    required: true,
                    message: "Please input your mailing address!",
                  },
                ],
              })(
                // <Input
                //     placeholder="Primary address"
                // />,
                <Input placeholder="Mailing address" />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("city", {
                initialValue: city,
                rules: [
                  {
                    required: true,
                    message: "Please input the city of your mailing address!",
                  },
                ],
              })(
                // <Input
                //     placeholder="Primary address"
                // />,
                <Input placeholder="Ex: San Francisco" />
              )}
            </Form.Item>

            <div className="name">
              <Form.Item>
                {getFieldDecorator("state", {
                  initialValue: state,
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the state of your mailing address!",
                    },
                  ],
                })(<Input placeholder="State" autoSize />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("postal", {
                  initialValue: postal,
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the postal code of your mailing address!",
                    },
                  ],
                })(<Input placeholder="Zip Code" autoSize />)}
              </Form.Item>
            </div>

            <Form.Item>
              <div className="profile-edit">
                <Button className="button-submit" htmlType="submit">
                  Save
                </Button>
                <Button type="default" onClick={this.editProfile}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const UserProfile = Form.create({ name: "UserProfile" })(UserProfileForm);
export default UserProfile;
