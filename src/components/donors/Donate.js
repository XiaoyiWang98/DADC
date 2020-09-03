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
        street: this.props.info.address,
        city: this.props.info.city,
        defState: this.props.info.state,
        postal: this.props.info.postal,
        token:this.props.info.token,
        checked: false,
        disabled: false,
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
                    mode:'cors',
                    headers: {
                        Authorization: `${AUTH_HEADER} ${this.state.token}`,
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
                        console.log(data.result)
                        if(data.result === "SUCCESS"){
                            message.success('Post created successfully!');
                            this.props.backToHome();
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
        this.setState((prevState) => ({disabled: !prevState.disabled}));
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        // const formItemLayout = {

        //     labelCol: {
        //         span: 8,
        //     },
        //     wrapperCol: {
        //         span: 16,
        //     },
        // };

        // const tailLayout = {
        //     wrapperCol: {offset: 8, span: 24},
        // };

        // const tailFormItemLayout = {
        //     wrapperCol: {
        //             span: 24,
        //             offset: 9,
        //     },
        // };


        return (
            <div className="main-content donate-page">
            <div className="main-title">New Donation</div>
            <hr className="divide"/>
            <Form
                
                onSubmit={this.handleSubmit}
                className="donate"
            >
                <Form.Item
                    name="itemname"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('itemname', {
                        rules: [{required: true}],
                    })(<Input
                            placeholder="Item Name"
                        />)}
                </Form.Item>

                <Form.Item >
                    {getFieldDecorator('description', {
                        rules: [{required: true}],
                    })(<Input placeholder="Description"
                    />)}
                </Form.Item>

                <Form.Item
                    name="street"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('street', {
                        rules: [{required: true}],
                    })(<Input disabled={this.state.disabled}
                                placeholder="Pick Up Street Name"
                        />)}
                </Form.Item>

                <Form.Item
                    name="city"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('city', {
                        rules: [{required: true}],
                    })(<Input placeholder="City"
                    disabled={this.state.disabled}/>)}
                </Form.Item>

                <div className="name">
                <Form.Item
                    name="state"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('state', {
                        rules: [{required: true}],
                    })(<Input placeholder="State"
                    disabled={this.state.disabled}/>)}
                </Form.Item>

                <Form.Item
                    name="postalCode"
                    rules={[{required: true}]}
                >
                    {getFieldDecorator('postalCode', {
                        rules: [{required: true}],
                    })(<Input placeholder="Zip Code"
                    disabled={this.state.disabled}/>)}
                </Form.Item>
                </div>

                <Form.Item
                    name="profileAddress"
                    valuePropName="checked"
                    className="check-box"
                >
                    <Checkbox onChange={this.onCheck}>
                        Use Default Address
                    </Checkbox>
                </Form.Item>

                

                <Form.Item >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true, message: 'Please select an image.' }]
                        })(
                            <Upload.Dragger className="dragger" name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Upload.Dragger>,
                        )}
                    </div>
                </Form.Item>

                <Form.Item >
                    <Button className="button-submit" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

export const Donate = Form.create({name: 'donate'})(DonateForm);