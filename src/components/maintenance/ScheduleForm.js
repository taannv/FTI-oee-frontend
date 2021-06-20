import React from "react";
import {DatePicker, Input, Col,Row,Form,Select} from "antd";
import moment from "moment";
const { TextArea } = Input;
const { Option } = Select;

class ScheduleForm extends React.Component{
    constructor(props){
        super(props)       
    }   

    render(){        
        const formItemLayout = {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 16,
            },
        };
        let schedule = this.props.dataSchedule;
        return(
            <Form {...formItemLayout} onFinish={this.props.onFinish}>
                <Form.Item
                    name="fromDate"
                    label="Thời gian bắt đầu"
                    rules={[
                        {
                        required: true,
                        message:'Thời gian bắt đầu không để trống'
                        },
                    ]}
                >
                <DatePicker showTime style={{"width": "95%"}} defaultValue={moment(schedule.start,'YYYY-MM-DD HH:mm:ss')}
                    onChange={e=>{
                            if(e!=null){
                                schedule.start = e.format('YYYY-MM-DD HH:mm:ss');
                                this.props.onChangeData(e.format('YYYY-MM-DD HH:mm:ss'),'dateFrom');
                            }
                    }} />
                </Form.Item>
                <Form.Item
                    name="toDate"
                    label="Thời gian kết thúc"
                    rules={[
                        {
                        required: true,
                        message:'Thời gian kết thúc không để trống'
                        },
                    ]}
                >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{"width": "95%"}}  defaultValue={moment(schedule.end,'YYYY-MM-DD HH:mm:ss')}
                onChange={e=>{
                    if(e!=null){
                        schedule.end = e.format('YYYY-MM-DD HH:mm:ss');
                        this.props.onChangeData(e.format('YYYY-MM-DD HH:mm:ss'),'dateTo');
                    }
                }}/>
                </Form.Item>
                <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[
                            {
                            required: true,
                            message:'Tiêu đề không để trống'
                            },
                        ]}
                    >
                <Input />
                </Form.Item>
                <Form.Item
                    name="user"
                    label="Người thực hiện"
                >
                <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Nội dung bảo trì"                            
                >
                    <TextArea rows={4} />
                </Form.Item>      
                <Row style={{paddingLeft:50}}>
                    <Col span={18}>
                    <Form.Item name="mail" label="Gửi mail trước" >
                        <Input />                            
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Select style={{width:80}}>
                            <Option value="day">Ngày</Option>
                            <Option value="hour">Giờ</Option>
                        </Select>
                    </Col>                  
                </Row>
            </Form>
        )
    }
}
export default ScheduleForm;