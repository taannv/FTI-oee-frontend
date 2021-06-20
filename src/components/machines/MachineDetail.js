import React, {Component} from "react";
import {Card, Col, Row, Typography} from "antd";
import MachineTimeStatus from "../charts/MachineTimeStatus";
import MachineSummary from "../charts/MachineSummary";
import MachineVolume from "../charts/MachineVolume";
import "../../styles/MachineDetail.css";
import {} from '../../services/MachineService';

const {Title, Text} = Typography;

class MachineDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let machine = this.props.selectedMachine;
        console.log(machine)
        return (
            <div>
                <Row gutter={8} >
                    <Col span={6}>
                        <Card bordered={false}>
                            <Title level={2}>{machine.name}</Title>
                            <Text type="secondary">{machine.description}</Text>
                        </Card>                      
                    </Col>
                    <Col span={3}>
                        <Card bordered={true} style={{textAlign: "center", marginTop: 10}}>
                            <Typography.Title type="danger">100</Typography.Title>
                            <Text type="secondary">Kế hoạch</Text>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card bordered={true} style={{textAlign: "center", marginTop: 10}}>
                            <Typography.Title type="warning">90</Typography.Title>
                            <Text type="secondary">Thực tế</Text>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <MachineVolume />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Thời gian máy chạy" bordered={false} style={{ fontWeight: 600}}>
                            <MachineTimeStatus/>
                        </Card>
                    </Col>                   
                    <Col span={24} style={{"paddingLeft":"20px","paddingRight":"20px"}}>
                        <Row>
                            <Col span={6} style={{fontSize:15,fontWeight:'bold'}}>
                                <Text>Hiệu suất máy</Text>
                            </Col>
                        </Row>                  
                        <Row gutter={10}>
                            <Col span={6}>
                                <MachineSummary dataLabel={"OEE %"} dataValue={50.2} dataColor={'#095396'} summaryId="OEEGaugeChart" />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"Khả dụng %"} dataValue={76.3} dataColor={'#095396'} summaryId="AvailabilityGaugeChart" />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"Hiệu suất %"} dataValue={73.8} dataColor={'#4F9C36'} summaryId="PerformanceGaugeChart" />
                            </Col>
                            <Col span={6}>
                                <MachineSummary dataLabel={"Chất lượng %"} dataValue={89.2} dataColor={'#97040B'} summaryId="QualityGaugeChart" />
                            </Col>
                        </Row>                       
                    </Col>             
                </Row>              
            </div>
        )
    }
}

export default MachineDetail;