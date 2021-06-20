import React from "react";
import {Layout,Button, DatePicker, Form, Input, Select,Row, Col,Radio,Card} from "antd";

const { Option } = Select;

class Addmaintenance extends React.Component{
    constructor(props) {
        super(props);        
    }
    
    render(){       
        const WrappedForm = Form.create()(MyForm);
        return <WrappedForm />
    }
}

class MyForm extends React.Component {

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
            <Card title="Thêm mới lịch bảo trì" bordered={false}>
                <Form onSubmit={this.handleSubmit}>
                 <Row>                   
                    <Col span={12}>   
                            <Form.Item label="Chọn máy">
                                <Select defaultValue="1" style={{ width: 200 }}>
                                    <Option value="1">Máy 001</Option>
                                    <Option value="2">Máy 002</Option>
                                    <Option value="3">Máy 003</Option>
                                </Select>
                            </Form.Item>
                    </Col>
                    <Col span={12}>
                        <br/> <br/>
                        <Form.Item>
                            <Radio.Group>
                                <Radio value={1}>Gửi Email</Radio>
                                <Radio value={2}>Nhắn tin</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Thời gian bắt đầu">
                            {getFieldDecorator('fromTime', {
                                rules: [{required: true, message: 'Thời gian bắt đầu không đúng!' }],
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Thời gian kết thúc">
                            {getFieldDecorator('toTime', {
                                rules: [{ required: true, message: 'Thời gian kết thúc không đúng!' }],
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>   
                <Row>
                    <Col span={24}>
                        <Form.Item label="Nội dung">
                            {getFieldDecorator('reason', {
                                rules: [],
                            })(
                                <Input.TextArea style={{'width': '90%'}} rows={4} />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Item>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
                            Lưu
                        </Button>
                    </Form.Item>
                    </Col>
                </Row>
                </Form>
            </Card>
        );
    }
}
export default Addmaintenance;