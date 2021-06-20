import React, {Component} from "react";
import {Card,Switch, Col, Row, Typography,Descriptions,Input, Button, Icon,DatePicker,InputNumber} from "antd";
import "../../styles/MachineSplit.css";
import logoheader from "../../assets/images/hongky.jpg";
import {getDataMachineSplit,getDataProductionOrder,getSpeedMachine,getStatusMachine} from '../../services/MachineService';
import {DEFAULT_PAGE} from "../../constants";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle,faExclamationTriangle,faBell,faClock} from '@fortawesome/free-solid-svg-icons';
import {FormattedNumber,IntlProvider} from 'react-intl';
import ReactSpeedometer from "react-d3-speedometer";
import NumberFormat from 'react-number-format';

const {RangePicker} = DatePicker;
const {Title} = Typography;
const {Meta} = Card;
const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');

class SplitHome extends Component{
    constructor(props) {
        super(props);
        const data = {};
        
        this.state = {
            texton:'On',
            split:data,
            production:data,
            speed:0,
            status_on:false,
            //curTime : new Date().toLocaleString(),
            date_create: moment().format("DD-MM-YYYY hh:mm:ss")
            
        }
    }

    componentDidMount() {
        getDataMachineSplit().then(data=>this.setState({split:data}));
        getDataProductionOrder().then(data=>{
            // console.log(data);
            this.setState({production:data})
        });
        getStatusMachine().then(data=>{
            this.setState({status_on:data.status});
        });
        getSpeedMachine().then(data=>{
            this.setState({speed:data.speed})
        });
        this.timer = setInterval(()=>{
            getDataMachineSplit().then(data=>this.setState({split:data}));
            getDataProductionOrder().then(data=>this.setState({production:data}));
            getStatusMachine().then(data=>this.setState({status_on:data.status}));
            getSpeedMachine().then(data=>this.setState({speed:data.speed}));
        },2000)
        this.tick = setInterval(this.onTick,1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.tick);
    }
   
    onChangeOnOff=(checked)=> {
        console.log(checked)
        if(checked){
            this.setState({texton:'On'});
        }else{
            this.setState({texton:'Off'});
        }
    }
    onTick=()=>{
        this.setState({
            date_create: moment().format("DD-MM-YYYY hh:mm:ss"),
        });
      }
    
    render(){
        return(
            <IntlProvider locale={'vi'}>
            <div>
                <Row gutter={6} style={{marginBottom:10}}>
                    <Col span={16}>
                        <img src={logoheader} width="100%" height="80%"/>
                    </Col>
                    <Col span={8}>
                        <Row>   
                            <Col span={24}>
                                <Card><span className="span-title" style={{fontSize:15}}><FontAwesomeIcon disible icon={faClock} size="lg" style={{color:'bluelight'}}/> {this.state.date_create} </span></Card>
                                <Card>
                                    <div style={{ marginBottom: 10 }}>
                                        <FontAwesomeIcon icon={faCircle} size="lg" style={{color:this.state.status_on?'#76dc45':'gray'}}/> On
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <FontAwesomeIcon icon={faCircle} size="lg" style={{color:!this.state.status_on?'#f90000':'gray'}}/> Off
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <FontAwesomeIcon disible icon={faExclamationTriangle} size="lg" style={{color:'gray'}}/> Warning
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <FontAwesomeIcon icon={faBell} size="lg" style={{color:'gray'}}/> ALARM                                
                                    </div> 
                                     
                                </Card>
                            </Col>
                        </Row>
                        <Row>  
                            <Col span={24} >
                                <div align="center">
                                    <ReactSpeedometer 
                                        ringWidth={40}
                                        startColor="#e3ff00"
                                        endColor="#f00"
                                        segments={10}
                                        maxValue={160}
                                        value={this.state.speed}
                                        height={200}/>
                                    <span style={{fontSize:18,fontWeight:500}}>Tốc độ</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={8}>
                        <Row gutter={6}>
                            <Col span={24} style={{marginBottom:10}} >
                                <Card title="Sản Lượng" >
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Lệnh SX" span={3}>
                                            {this.state.production.productionOrder}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="KL cần SX(kg)" span={3}>
                                            <FormattedNumber value={this.state.split.plan} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="KL theo KH(kg)" span={3}>
                                            <FormattedNumber value={this.state.split.plan} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="KL đã SX(kg)" span={3}>
                                                <FormattedNumber value={this.state.split.produce} />
                                        </Descriptions.Item>
                                    </Descriptions>

                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Nguyên Liệu">
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Chiều dày(mm)" span={3}>
                                            <FormattedNumber value= {this.state.production.height} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chiều rộng(mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production.width}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="KL cuộn(kg)" span={3}>
                                            <FormattedNumber value={this.state.production.mass}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>                        
                    </Col>                    
                    <Col span={7}>
                        <Card title="Quy Cách Xả">
                            <Descriptions >
                                <Descriptions.Item>
                                    <Row gutter={8} style={{marginBottom:10}}>
                                        <Col span={2}>
                                            
                                        </Col>
                                        <Col span={11}>                                            
                                            <span className="span-title">Chiều Rộng</span>                                        
                                        </Col>
                                        <Col span={11}>
                                            <span className="span-title">Số Lượng</span>    
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                            1
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.width1} />
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.amount1} />
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                            2
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.width2}/>
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.amount2} />
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                            3
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.width3} />
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.amount3}  />
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                            4
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.width4}  />
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.amount4}  />
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                            5
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.width5}  />
                                        </Col>
                                        <Col span={11}>
                                            <Input value={this.state.production.amount5}  />
                                        </Col>
                                    </Row>       
                                    <Row gutter={8} style={{marginBottom:8}}>
                                        <Col span={2}>
                                        </Col>
                                        <Col span={11}>
                                            <span>BienT</span>
                                            <Input value={this.state.production.bienT} />
                                        </Col>
                                        <Col span={11}>
                                            <span>BienN</span>
                                            <Input value={this.state.production.bienN} />
                                        </Col>
                                    </Row>                              
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col span={9}>
                        <Card title="Thời Gian Vận Hành">
                            <Descriptions >
                                <Descriptions.Item>
                                    <Row gutter={6} style={{marginBottom:8}}>
                                        <Col span={10}>
                                          <span className="span-title">Thời gian mở máy</span> 
                                        </Col>
                                        <Col span={7}>
                                            <Input value={ Math.floor((this.state.split.timeOn +this.state.split.timeOff) /60)} addonAfter="Giờ"/>
                                        </Col>
                                        <Col span={7}>
                                            <Input value={(this.state.split.timeOn+this.state.split.timeOff) % 60} addonAfter="Phút"/>
                                        </Col>
                                    </Row>
                                    <Row gutter={6} style={{marginBottom:8}}>
                                        <Col span={10}>
                                          <span className="span-title">Thời gian máy chạy</span> 
                                        </Col>
                                        <Col span={7}>
                                            <Input value={ Math.floor(this.state.split.timeOn /60)} addonAfter="Giờ"/>
                                        </Col>
                                        <Col span={7}>
                                            <Input value={this.state.split.timeOn % 60}  addonAfter="Phút"/>
                                        </Col>
                                    </Row>               
                                    <Row gutter={6} style={{marginBottom:8}}>
                                        <Col span={10}>
                                          <span className="span-title">Thời gian máy dừng</span> 
                                        </Col>
                                        <Col span={7}>
                                            <Input value={ Math.floor(this.state.split.timeOff /60)} addonAfter="Giờ"/>
                                        </Col>
                                        <Col span={7}>
                                            <Input value={this.state.split.timeOff % 60}  addonAfter="Phút"/>
                                        </Col>
                                    </Row>                                                               
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>              
            </div>
            </IntlProvider>
        );
    }
}

export default SplitHome;