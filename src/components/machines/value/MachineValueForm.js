import React, {Component} from "react";
import {Button, DatePicker, Form, Input, InputNumber} from "antd";

class MachineValueForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const WrappedForm = Form.create()(MyForm);
        return <WrappedForm />
    }
}

class MyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false}
    }


    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true})
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                this.setState({loading: false});
                return;
            }
            // Should format date value before submit.
            const values = {
                ...fieldsValue,
                'fromTime': fieldsValue['fromTime'].format('YYYY-MM-DD HH:mm:ss'),
                'toTime': fieldsValue['toTime'].format('YYYY-MM-DD HH:mm:ss'),
            };
            console.log('Received values of form: ', values);
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
        return (
            
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Thời gian bắt đầu">
                        {getFieldDecorator('fromTime', {
                            rules: [{required: true, message: 'Thời gian bắt đầu không đúng!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Thời gian kết thúc">
                        {getFieldDecorator('toTime', {
                            rules: [{ required: true, message: 'Thời gian kết thúc không đúng!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Khối lượng đầu vào">
                        {getFieldDecorator('inputVolume', {
                            rules: [{ required: true, message: 'Khối lượng đầu vào không đúng!' }],
                        })(
                            <InputNumber min={0}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Khối lượng đầu ra">
                        {getFieldDecorator('outputVolume', {
                            rules: [{ required: true, message: 'Khối lượng đầu ra không đúng!' }],
                        })(
                            <InputNumber min={0} />
                        )}
                    </Form.Item>
                    <Form.Item label="Lệnh sản xuất">
                        {getFieldDecorator('produceCommand', {
                            rules: [{ required: true, message: 'Lệnh sản xuất không đúng!' }],
                        })(
                            <Input style={{'width': '80%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        {getFieldDecorator('reason', {
                            rules: [],
                        })(
                            <Input.TextArea style={{'width': '80%'}} rows={5} />,
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default MachineValueForm;