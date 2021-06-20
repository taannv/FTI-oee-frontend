import React from "react";
import moment from 'moment';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import 'moment/locale/vi';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {CutomToolbar} from './CustomToolbar';
import {Modal,Form,Input,Card, Col,Row,Select,DatePicker, Button} from 'antd';
import {addSchedule,getScheduleList,updateSchedule} from '../../services/ScheduleService';
import ScheduleList from './ScheduleList';
import {CalendarOutlined, ProfileOutlined} from '@ant-design/icons'

const { TextArea } = Input;
const { Option } = Select;
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const scheduleNew = {
    id:0,
    start:0,
    end:0,
    title:'',
    content:'',
    allDay:false,
    send_mail:0,
    send_type:'day',
    user_maintenance:'',
    status:0
}
class SchedulerCalendar extends React.Component{
    constructor(props) {        
        super(props);     
        this.state = {
            visible:false,
            schedule:scheduleNew,
            events: [],
            isList:false
        };
    } 
    componentDidMount(){
        this.getDataSchedule();
    }
    getDataSchedule=()=>{
        getScheduleList().then(data=>{
            let newEvents = data.map(item=>{
                return{...item,allDay:false}
            });
            console.log(newEvents);
            this.setState({events:newEvents});
        })
    }
    onEventResize=({event, start, end})=>{
            let value = {...event};
            value.start = moment(start,'YYYY-MM-DD HH:mm:ss');
            value.end = moment(end,'YYYY-MM-DD HH:mm:ss');
            this._onUpdateSchedule(event.id,value);
    }
    
    onEventDrop=({ event, start, end })=>{
        const { events } = this.state;
        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };
        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);
        this.setState({
          events: nextEvents,
        })
    }
    _selectDate=(args)=>{
        let schedule = scheduleNew;
        schedule.start = args.start;
        schedule.end = args.end;
        this.setState({schedule:schedule});
        this.setState({visible:true});
    }
    _eventClick=(e)=>{
        console.log(e);
        this.setState({schedule:e});
        this.setState({visible:true});
    }
    _handleOk=(values)=>{
        let {events,schedule} = this.state;
        console.log(schedule);
        this.setState({visible:false});      
        let param = {
            "content": values.content,
            "end": values.end.format('x'),
            "send_mail": values.send_mail,
            "send_type": values.send_type,
            "start": values.start.format('x'),
            "title": values.title,
            "user_maintenance": values.user_maintenance
        }
        if(schedule.id==0){
            addSchedule(param).then(result=>{
                console.log(result);
                let event = {...result,allDay:false};
                events.push(event);
                this.setState({
                    events: events,
                })
            }).catch(error=>{
                console.log(error);
            })
        }else{
            console.log(values)
            this._onUpdateSchedule(this.state.schedule.id,values);
        }
    }
    _onUpdateSchedule=(id,values)=>{
        let param = {
            "content": values.content,
            "end": values.end.format('x'),
            "send_mail": values.send_mail,
            "send_type": values.send_type,
            "start": values.start.format('x'),
            "title": values.title,
            "user_maintenance": values.user_maintenance
        }
        updateSchedule(id,param).then(result=>{
            const { events } = this.state;
            const idx = events.indexOf(this.state.schedule);
            const nextEvents = [...events];
            nextEvents.splice(idx, 1, result);
            this.setState({
                events: nextEvents,
            })
        });
    }
    _handleCancel=()=>{
        this.setState({visible:false});
    }
    _handleSetList=(ev)=>{
        console.log(ev.target.id);
        if(ev.target.id==='calendar'){
            this.setState({isList:false})
        }else{
            this.setState({isList:true})
        }
    }
    render(){        
        const { events } = this.state;
        
        return(
            <Card title="LỊCH BẢO TRÌ" bordered={false}>        
               <Row style={{marginBottom:20,marginTop:20}}>
                   <Col span={2}>
                        <Button id="calendar" onClick={this._handleSetList} type="primary" danger><CalendarOutlined />Lịch</Button>
                   </Col>
                   <Col span={2}>
                        <Button id="list" onClick={this._handleSetList} type="primary"><ProfileOutlined />Danh sách</Button>
                   </Col>
                </Row>      
                <Row gutter={8} style={{marginBottom:20,marginTop:20}}>
                    <Col span={24}>
                        {this.state.isList ? 
                            <ScheduleList data={events}/>:
                            <DragAndDropCalendar
                                style={{ height: '100vh' }}
                                localizer={localizer}
                                culture="vi"
                                events={events}
                                defaultDate={new Date()}
                                startAccessor="start"
                                endAccessor="end"
                                titleAccessor="title"
                                onEventResize={this.onEventResize}
                                onEventDrop={this.onEventDrop}
                                resizable
                                selectable={true}
                                onSelectSlot={this._selectDate}
                                components={{
                                    toolbar: CutomToolbar
                                }}                
                                onSelectEvent={this._eventClick}
                                popup
                            />
                        }
                        
                    </Col>
                </Row>
                <ScheduleForm visible={this.state.visible} onCreate={this._handleOk} schedule={this.state.schedule} onCancel={this._handleCancel}/>
            </Card>
        )
    }
}
const ScheduleForm = ({ visible, onCreate, onCancel,schedule })=>{
    console.log(schedule);
    const [form] = Form.useForm();    
    const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        },
    };
    form.setFieldsValue({
        'start':moment(schedule.start,'YYYY-MM-DD HH:mm:ss'),
        'end':moment(schedule.end,'YYYY-MM-DD HH:mm:ss'),
        'title':schedule.title,
        'user_maintenance':schedule.user_maintenance,
        'content':schedule.content,
        'send_mail':1,
        'send_type':'day'
    })
    return(
        <Modal title="Thêm lịch bảo trì"
            visible={visible}
            onCancel={onCancel}
            width={630} 
            onOk={() => {
                form
                  .validateFields()
                  .then(values => {
                    form.resetFields();
                    onCreate(values);
                    
                  })
                  .catch(info => {
                    console.log('Validate Failed:', info);
                  });
            }}
            okButtonProps={{ disabled: schedule.status!==0 }}
        >
            <Form {...formItemLayout}  form={form}>
                <Form.Item
                    name="start"
                    label="Thời gian bắt đầu"
                    rules={[
                        {
                        required: true,
                        message:'Thời gian bắt đầu không để trống'
                        },
                    ]}
                >
                <DatePicker showTime/>
                </Form.Item>
                <Form.Item
                    name="end"
                    label="Thời gian kết thúc"
                    rules={[
                        {
                        required: true,
                        message:'Thời gian kết thúc không để trống'
                        },
                    ]}
                >
                <DatePicker showTime/>
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
                    name="user_maintenance"
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
                <Form.Item label="Gửi mail trước" >
                    <Form.Item name="send_mail" style={{float:'left'}}>
                        <Input />     
                    </Form.Item>
                    <Form.Item name="send_type" style={{float:'right'}}>
                        <Select style={{width:100}}>
                            <Option value="day">Ngày</Option>
                            <Option value="hour">Giờ</Option>
                        </Select>
                    </Form.Item>                
                </Form.Item>
            </Form>
        </Modal>        
    );
}
export default SchedulerCalendar;