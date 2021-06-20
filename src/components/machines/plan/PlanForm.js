import React, {Component} from "react";
import {Button, DatePicker, Form, Icon, Input, InputNumber, Select, Upload,Row, Col} from "antd";

class PlanForm extends Component {

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
        this.state = {
            loading: false,
            machines: [
                {id: '1', name: 'Máy 001'},
                {id: '2', name: 'Máy 002'},
                {id: '3', name: 'Máy 003'}
            ],
            fileList: [
            ]
        }
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

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        //fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
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
            }
        };
        const machineOption = this.state.machines.map(machine => (
            <Select.Option key={machine.id}>{machine.name}</Select.Option>
        ));
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.props.onHandleSumbit}>
                    <Row type="flex" >
                        <Col span={12} style={{alignItems:'left'}}>
                            <Form.Item label="Bắt đầu">
                                {getFieldDecorator('fromTime', {
                                    rules: [{required: true, message: 'Thời gian bắt đầu không đúng!' }],
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "95%"}} />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Kết thúc">
                                {getFieldDecorator('toTime', {
                                    rules: [{ required: true, message: 'Thời gian kết thúc không đúng!' }],
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "95%"}} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Đầu vào">
                                {getFieldDecorator('inputVolume', {
                                    rules: [{ required: true, message: 'Khối lượng đầu vào không đúng!' }],
                                })(
                                    <InputNumber min={0}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Đầu ra">
                                {getFieldDecorator('outputVolume', {
                                    rules: [{ required: true, message: 'Khối lượng đầu ra không đúng!' }],
                                })(
                                    <InputNumber min={0} />
                                )}
                            </Form.Item>
                        </Col>        
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Lệnh sản xuất">
                                {getFieldDecorator('produceCommand', {
                                    rules: [{ required: true, message: 'Lệnh sản xuất không đúng!' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>                                    
                            <Form.Item label="Máy">
                                <Select style={{ width: '100%' }}>
                                    {machineOption}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}> 
                            <Form.Item label="Tải lên tập tin">
                                <Upload {...props} fileList={this.state.fileList}>
                                    <Button>
                                        <Icon type="upload" /> Chọn tập tin
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                    <Row>
                    <Col span={24}>                                    
                            <Form.Item label="Ghi chú" wrapperCol={{ sm: 24 }} labelCol={{sm:3}}>
                                {getFieldDecorator('reason', {
                                    rules: [],
                                })(
                                    <Input.TextArea style={{'width': '100%'}} rows={5} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item
                    <Form.Item label="Bắt đầu">
                        {getFieldDecorator('fromTime', {
                            rules: [{required: true, message: 'Thời gian bắt đầu không đúng!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "95%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Kết thúc">
                        {getFieldDecorator('toTime', {
                            rules: [{ required: true, message: 'Thời gian kết thúc không đúng!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "95%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Đầu vào">
                        {getFieldDecorator('inputVolume', {
                            rules: [{ required: true, message: 'Khối lượng đầu vào không đúng!' }],
                        })(
                            <InputNumber min={0}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Đầu ra">
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
                            <Input style={{'width': '95%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Máy">
                        <Select style={{ width: '95%' }}>
                            {machineOption}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tải lên tập tin">
                        <Upload {...props} fileList={this.state.fileList}>
                            <Button>
                                <Icon type="upload" /> Chọn tập tin
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        {getFieldDecorator('reason', {
                            rules: [],
                        })(
                            <Input.TextArea style={{'width': '95%'}} rows={5} />,
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
                            Xác nhận
                        </Button>
                    </Form.Item> */}
                </Form>
            </div>
        );
    }
}
export default PlanForm;