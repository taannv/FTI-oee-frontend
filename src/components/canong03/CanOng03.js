import React, {Component} from "react";
import {Card,Switch, Col, Row, Typography,Descriptions,Input, Button, Icon,DatePicker,InputNumber} from "antd";
import "../../styles/MachineSplit.css";
import logoheader from "../../assets/images/hongky.jpg";
import {getDataCanOng03, getDataProductionOrderCanOng03, getStatusCanOng03, getSpeedCanOng03} from '../../services/CanOng03Service';
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

class CanOng03Home extends Component{
    constructor(props) {
        super(props);
        const data = {};
        
        this.state = {
            texton:'On',
            split3:data,
            production3:data,
            speed:0,
            status_on:false,
            //curTime : new Date().toLocaleString(),
            date_create: moment().format("DD-MM-YYYY hh:mm:ss")
            
        }
    }

    componentDidMount() {
        getDataCanOng03().then(data=>this.setState({split3:data}));
        getDataProductionOrderCanOng03().then(data=>{
            this.setState({production3:data})
        });
        getStatusCanOng03().then(data=>{
            this.setState({status_on:data.status});
        });
        getSpeedCanOng03().then(data=>{
            this.setState({speed:data.speed})
        });
       
        this.timer = setInterval(()=>{
            getDataCanOng03().then(data=>this.setState({split3:data}));
            getDataProductionOrderCanOng03().then(data=>this.setState({production3:data}));
            getStatusCanOng03().then(data=>this.setState({status_on:data.status}));
            getSpeedCanOng03().then(data=>this.setState({speed:data.speed}));
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
                                <Card title="Lệnh sản xuất" >
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Mã Lệnh SX" span={3}>
                                            {this.state.production3.id}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.Lượng cần SX (cây)" span={3}>
                                            <FormattedNumber value={this.state.split3.slkh} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Nguyên Liệu Vào">
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Độ dày tôn (mm)" span={3}>
                                            <FormattedNumber value= {this.state.production3.day_in} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Khổ băng (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production3.rong_in}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Quy cách đầu ra">
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Chiều rộng (mm)" span={3}>
                                            <FormattedNumber value= {this.state.production3.rong_out} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chiều cao (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production3.cao_out}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chiều dài (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production3.dai_out}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>                        
                    </Col> 
                    <Col span={7}>
                        <Card title="Thời gian sản xuất thực tế">
                        <Descriptions size={'small'} bordered>
                                    <Descriptions.Item label="TG hành chính (giờ)" span={3}>
                                            <FormattedNumber value= {this.state.split3.t / 60} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="TG tăng ca (phút)" span={3}>
                                            <FormattedNumber value= {this.state.split3.tc} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tốc độ định mức (m/p)" span={3}>                                            
                                            <FormattedNumber value={this.state.production3.rong_in}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Nhóm chạy máy" span={3}>                                            
                                            <FormattedNumber value={this.state.production3.nhom}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Thời gian chạy" span={3}>                                            
                                            <FormattedNumber value={this.state.split3.timeOn}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Thời gian dừng" span={3}>                                            
                                            <FormattedNumber value={this.state.split3.timeOff}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                        </Card>
                    </Col>                   
                    
                    <Col span={9}>
                        <Card title="Sản Lượng">
                        <Descriptions size={'small'} bordered>
                                    <Descriptions.Item label="Số lượng đã SX(cây)" span={3}>
                                            <FormattedNumber value= {this.state.split3.slsx} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Khối lượng đã SX(kg)" span={3}>
                                            <FormattedNumber value= {this.state.split3.kltt8t + this.state.split3.kltttc} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.Lượng chính phẩm (cây)" span={3}>                                            
                                            <FormattedNumber value={this.state.split3.chinhpham}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.Lượng thứ phẩm (kg)" span={3}>                                            
                                            <FormattedNumber value={this.state.split3.thupham}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.Lượng phế phẩm (kg)" span={3}>                                            
                                            <FormattedNumber value={this.state.split3.phepham}/>
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

export default CanOng03Home;