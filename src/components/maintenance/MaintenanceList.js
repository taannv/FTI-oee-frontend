import React from "react";
import {Col, Row, Table,Card} from "antd";

const data = [
    {
        key: '1',
        fromTime: '2019-09-01 08:00',
        toTime: '2019-09-01 09:00',
        machineCode: 'Máy 002',
        subject: 'Bảo trì',
        localtion: '',
        produceCommand: 'Lệnh sản xuất 001'
    },
    {
        key: '2',
        fromTime: '2019-09-01 08:00',
        toTime: '2019-09-01 09:00',
        machineCode: 'Máy 001',
        subject: 'Bảo trì',
        localtion: '',
        produceCommand: 'Lệnh sản xuất 002'
    },
    {
        key: '3',
        fromTime: '2019-09-01 08:00',
        toTime: '2019-09-01 09:00',
        machineCode: 'Máy 001',
        subject: 'Bảo trì',
        localtion: '',
        produceCommand: 'Lệnh sản xuất 003'
    },
];

class Maintenance extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {
            data
        }
    }
    render(){
        return(
            <Card title="Danh sách" bordered={false}>
                 <Row>                   
                    <Col >
                        <Table dataSource={this.state.data} bordered>
                            <Table.Column title="Mã máy" dataIndex="machineCode" key="machineCode" />
                            <Table.Column title="Mô tả" dataIndex="subject" key="subject"/>
                            <Table.Column title="Vị trí" dataIndex="location" key="location"/>
                            <Table.Column title="Thời gian bắt đầu" dataIndex="fromTime" key="fromTime" />
                            <Table.Column title="Thời gian kết thúc" dataIndex="toTime" key="toTime" />                            
                        </Table>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Maintenance;