import React, {Component} from "react";
import {Button, DatePicker, Form, Input} from "antd";
import {addErrorHistory} from "../../../services/MachineService";
import {DEFAULT_PAGE} from "../../../constants";


class MachineHistoryErrorForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const WrappedForm = Form.create()(MyForm);
        return <WrappedForm machineId={this.props.selectedMachine.id} reloadPage={this.props.reloadPage} />
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
                'startedAt': fieldsValue['startedAt'].format('x'),
                'endedAt': fieldsValue['endedAt'].format('x'),
            };
            console.log('Received values of form: ', values);
            addErrorHistory(this.props.machineId, values)
                .then(data => {
                    this.setState({loading: false});
                    this.props.reloadPage(DEFAULT_PAGE);
                });
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
                        {getFieldDecorator('startedAt', {
                            rules: [{required: true, message: 'Vui lòng chọn Thời gian bắt đầu!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Thời gian kết thúc">
                        {getFieldDecorator('endedAt', {
                            rules: [{ required: true, message: 'Vui lòng chọn Thời gian kết thúc!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "80%"}} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Lý do lỗi">
                        {getFieldDecorator('cause', {
                            rules: [{required: true, message: 'Vui lòng nhập Lý do lỗi!' }],
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
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default MachineHistoryErrorForm;
