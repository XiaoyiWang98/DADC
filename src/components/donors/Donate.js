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
import {API_ROOT, AUTH_HEADER} from "../../constants";


class DonateForm extends Component {
    state = {
        street: this.props.session.idToken.payload["address"]["formatted"],
        city: this.props.session.idToken.payload["custom:city"],
        defState: this.props.session.idToken.payload["custom:state"],
        postal: this.props.session.idToken.payload["custom:postalCode"],
        checked: false,
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData();
                formData.set('name', values.itemname);
                formData.set('address', values.street);
                formData.set('city', values.city);
                formData.set('state', values.state);
                formData.set('zip', values.postalCode);
                formData.set('description', values.description);
                formData.set('image', values.image ? values.image[0].originFileObj : undefined);

                fetch(`${API_ROOT}/donor/new_item`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${AUTH_HEADER} ${this.props.session.idToken}`,
                    },
                    body: formData,
                })
                    .then((response) => {
                        if(response.ok ) {
                            return response.json();
                        }
                        throw new Error('Failed to send request.');
                    })
                    .then((data) => {
                        console.log(data)
                        if(data.result === "SUCCESS"){
                            message.success('Post created successfully!');
                        } else {
                            throw new Error('Failed to create post.')
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                        message.error('Failed to create post.');
                    });
            }
        })
    }

    onFinish = () => {
        this.props.form.resetFields();
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    beforeUpload = () => false;

    onCheck = e => {
        if( e.target.checked ){
            this.props.form.setFieldsValue({
                street:this.state.street,
                city:this.state.city,
                state: this.state.defState,
                postalCode: this.state.postal
            });
        } else {
            this.props.form.resetFields();
        }
    };

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
                    offset: 9,
            },
        };

        return (
            <Form
                {...formItemLayout}
                onSubmit={this.handleSubmit}
                onFinish={this.onFinish}
                className="donate"
            >
                <Form.Item
                    label="Item name"
                    name="itemname"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('itemname', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label="Street"
                    name="street"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('street', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label="City"
                    name="city"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('city', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label="State"
                    name="state"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('state', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    label="Postal code"
                    name="postalCode"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('postalCode', {
                        rules: [{required: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    {...tailFormItemLayout}
                    name="profileAddress"
                    valuePropName="checked"
                    className="check-box"
                >
                    <Checkbox onChange={this.onCheck}>
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
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
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