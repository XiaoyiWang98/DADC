import React, {Component} from 'react';
import {
    Form,
    Button,
    Checkbox,
    message,
    Input,
    Icon,
    Upload,
} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {API_ROOT, AUTH_HEADER} from "../../constants";


class DonateForm extends Component {
    state = {
        defaultAddress: this.props.session.idToken.payload["address"].formatted,
        city: this.props.session.idToken.payload["custom:city"],
        state: this.props.session.idToken.payload["custom:state"],
        postal: this.props.session.idToken.payload["custom:postalCode"],
        checked: false,
    }

    handleSubmit = e => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                formData.set('itemname', values.itemname);
                this.state.checked ? formData.set('address', this.state.defaultAddress) : formData.set('address', values.address);
                formData.set('description', values.description);
                formData.set('image', values.image[0].originFileObj);

                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${AUTH_HEADER} ${this.props.session.idToken}`
                    },
                    body: formData,
                })
                    // .then((response) => {
                    //     response.ok
                    //         ? message.success('Post created successfully!')
                    //         : throw new Error('Failed to create post.');
                    // })
                    .catch((e) => {
                        console.error(e);
                        message.error('Failed to create post.');
                    });
            }
        })
    }

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    beforeUpload = () => false;

    onCheckboxChange = e => {
        this.setState({ checked: e.target.checked });
        console.log(`is checked -> ${this.state.checked}`);
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const tailLayout = {
            wrapperCol: {offset: 8, span: 24},
        };

        const tailFormItemLayout = {
            wrapperCol: {
                    span: 24,
                    offset: 4,
            },
        };

        return (
            <Form
                {...formItemLayout}
                onSubmit={this.handleSubmit}
                className="donate"
            >
                <Form.Item
                    label="itemname"
                    name="itemname"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('itemname', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label="Pickup Address"
                    name="address"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('address', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    {...tailFormItemLayout}
                    name="profileAddress"
                    valuePropName="checked"
                    className="check-box"
                >
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.onCheckboxChange}
                    >
                        Use profile address
                    </Checkbox>
                </Form.Item>

                <Form.Item label="Description">
                    {getFieldDecorator('Description', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="Image">
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{required: true, message: 'Please select an image.'}]
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox"/>
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>,
                        )}
                    </div>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const Donate = Form.create({name: 'donate'})(DonateForm);