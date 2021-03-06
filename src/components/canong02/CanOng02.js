import React, {Component} from "react";
import {Card,Switch, Col, Row, Typography,Descriptions,Input, Button, Icon,DatePicker,InputNumber} from "antd";
import "../../styles/MachineSplit.css";
import logoheader from "../../assets/images/hongky.jpg";
import {getDataCanOng02, getDataProductionOrderCanOng02,getStatusCanOng02,getSpeedCanOng02} from '../../services/CanOng02Service';
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

class CanOng02Home extends Component{
    constructor(props) {
        super(props);
        const data = {};
        
        this.state = {
            texton:'On',
            split2:data,
            production2:data,
            speed:0,
            status_on:false,
            //curTime : new Date().toLocaleString(),
            date_create: moment().format("DD-MM-YYYY hh:mm:ss")
            
        }
    }

    componentDidMount() {
        getDataCanOng02().then(data=>this.setState({split2:data}));
        getDataProductionOrderCanOng02().then(data=>{
            this.setState({production2:data})
        });
        getStatusCanOng02().then(data=>{
            this.setState({status_on:data.status});
        });
        getSpeedCanOng02().then(data=>{
            this.setState({speed:data.speed})
        });
       
        this.timer = setInterval(()=>{
            getDataCanOng02().then(data=>this.setState({split2:data}));
            getDataProductionOrderCanOng02().then(data=>this.setState({production2:data}));
            getStatusCanOng02().then(data=>this.setState({status_on:data.status}));
            getSpeedCanOng02().then(data=>this.setState({speed:data.speed}));
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
                                    <span style={{fontSize:18,fontWeight:500}}>T???c ?????</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={8}>
                        <Row gutter={6}>
                            <Col span={24} style={{marginBottom:10}} >
                                <Card title="L???nh s???n xu???t" >
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="M?? L???nh SX" span={3}>
                                            {this.state.production2.id}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.L?????ng c???n SX (c??y)" span={3}>
                                            <FormattedNumber value={this.state.split2.slkh} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Nguy??n Li???u V??o">
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="????? d??y t??n (mm)" span={3}>
                                            <FormattedNumber value= {this.state.production2.day_in} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Kh??? b??ng (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production2.rong_in}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Quy c??ch ?????u ra">
                                    <Descriptions size={'small'} bordered>
                                        <Descriptions.Item label="Chi???u r???ng (mm)" span={3}>
                                            <FormattedNumber value= {this.state.production2.rong_out} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chi???u cao (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production2.cao_out}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chi???u d??i (mm)" span={3}>                                            
                                            <FormattedNumber value={this.state.production2.dai_out}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>                        
                    </Col> 
                    <Col span={7}>
                        <Card title="Th???i gian s???n xu???t th???c t???">
                        <Descriptions size={'small'} bordered>
                                    <Descriptions.Item label="TG h??nh ch??nh (gi???)" span={3}>
                                            <FormattedNumber value= {this.state.split2.t / 60} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="TG t??ng ca (ph??t)" span={3}>
                                            <FormattedNumber value= {this.state.split2.tc} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="T???c ????? ?????nh m???c (m/p)" span={3}>                                            
                                            <FormattedNumber value={this.state.production2.rong_in}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Nh??m ch???y m??y" span={3}>                                            
                                            <FormattedNumber value={this.state.production2.nhom}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Th???i gian ch???y" span={3}>                                            
                                            <FormattedNumber value={this.state.split2.timeOn}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Th???i gian d???ng" span={3}>                                            
                                            <FormattedNumber value={this.state.split2.timeOff}/>
                                        </Descriptions.Item>
                                    </Descriptions>
                        </Card>
                    </Col>                   
                    
                    <Col span={9}>
                        <Card title="S???n L?????ng">
                        <Descriptions size={'small'} bordered>
                                    <Descriptions.Item label="S??? l?????ng ???? SX(c??y)" span={3}>
                                            <FormattedNumber value= {this.state.split2.slsx} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Kh???i l?????ng ???? SX(kg)" span={3}>
                                            <FormattedNumber value= {this.state.split2.kltt8t + this.state.split2.kltttc} />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.L?????ng ch??nh ph???m (c??y)" span={3}>                                            
                                            <FormattedNumber value={this.state.split2.chinhpham}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.L?????ng th??? ph???m (kg)" span={3}>                                            
                                            <FormattedNumber value={this.state.split2.thupham}/>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="S.L?????ng ph??? ph???m (kg)" span={3}>                                            
                                            <FormattedNumber value={this.state.split2.phepham}/>
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

export default CanOng02Home;