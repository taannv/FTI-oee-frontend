import React from "react";
import {Col, Row, Card, Typography} from "antd";
import MachineSummary from '../charts/MachineSummary';
import MachineVolume from "../charts/MachineVolume";
import "../../styles/MachineDetail.css"
import {getDataCanOng02} from '../../services/CanOng02Service';

const {Title, Text} = Typography;

class ReportOEEC2 extends React.Component{
    constructor(props){
        super(props);  
        this.state={
            data:{},
            oee:0,
            availability:0,
            quality:0,
            performance:0,
            dataColumn:[],
        }
    }
    componentDidMount(){
        this.getDataOEE();
        this.timer = setInterval(()=>{
            this.getDataOEE();
        },2000) 
    }
    getDataOEE = ()=>{
        getDataCanOng02().then(data=>{
            console.log(data);
            
            let dataColumn = [data.slkh, data.slsx];
            this.setState({
                data,
                availability:data.oeeA,
                quality:data.oeeQ,
                performance:data.oeeP,
                oee:data.oee,
                dataColumn:dataColumn
            })  
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
      
        return(
            <div>
                <Row gutter={8} >
                    <Col span={12}>
                        <Card bordered={false}>
                            <Title level={2}>Khối Lượng Sản Xuất</Title>
                        </Card>                      
                    </Col>                   
                    <Col span={12}>
                        <Card bordered={false}>
                        <MachineVolume data={this.state.dataColumn} categories={['Số lượng theo kế hoạch', 'Số lượng đã sản xuất']} height={250} width={300} />
                        </Card>
                    </Col>                                     
                    <Col span={24}>
                        <Row gutter={10}>
                            <Col span={6}>
                                <MachineSummary dataLabel={"OEE"} dataValue={this.state.oee} dataColor={'#095396'} summaryId="OEEGaugeChart" allowNull={true} />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"OEE Availability"} dataValue={this.state.availability} dataColor={'#09536'} summaryId="AvailabilityGaugeChart" allowNull={true} />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"OEE Quality"} dataValue={this.state.quality} dataColor={'#4F9C36'} summaryId="QualityGaugeChart" allowNull={true} />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"OEE Performance"} dataValue={this.state.performance} dataColor={'#97040B'} summaryId="PerformanceGaugeChart" allowNull={true} />
                            </Col>
                        </Row>                       
                    </Col>             
                </Row>              
            </div>
        )
    }
}

export default ReportOEEC2;