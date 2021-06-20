import React from "react";
import {Col, Row, Table,Card} from "antd";
import MachineValueForm from "./MachineValueForm";

class MachineValueList extends React.Component {

    constructor(props) {
        super(props);
        const { machineId } = this.props.match.params;
        const data = [
            {
                key: '1',
                fromTime: '2019-09-01 08:00',
                toTime: '2019-09-01 09:00',
                machineCode: 'Máy 001',
                inputVolume: 10,
                outputVolume: 20,
                produceCommand: 'Lệnh sản xuất 001'
            },
            {
                key: '2',
                fromTime: '2019-09-01 08:00',
                toTime: '2019-09-01 09:00',
                machineCode: 'Máy 001',
                inputVolume: 6,
                outputVolume: 11,
                produceCommand: 'Lệnh sản xuất 002'
            },
            {
                key: '3',
                fromTime: '2019-09-01 08:00',
                toTime: '2019-09-01 09:00',
                machineCode: 'Máy 001',
                inputVolume: 5,
                outputVolume: 10,
                produceCommand: 'Lệnh sản xuất 003'
            },
        ];

        this.state = {
            data, machineId
        }
    }

    render() {
        return (
            <Card title="Sản lượng" bordered={false}>
                <Row>
                    <Col span={10}>
                        <MachineValueForm />
                    </Col>
                    <Col span={14}>
                        <Table dataSource={this.state.data} bordered>
                            <Table.Column title="Lệnh sản xuất" dataIndex="produceCommand" key="produceCommand"/>
                            <Table.Column title="Khối lượng đầu vào" dataIndex="inputVolume" key="inputVolume"/>
                            <Table.Column title="Khối lượng đầu ra" dataIndex="outputVolume" key="outputVolume"/>
                            <Table.Column title="Thời gian bắt đầu" dataIndex="fromTime" key="fromTime" />
                            <Table.Column title="Thời gian kết thúc" dataIndex="toTime" key="toTime" />
                        </Table>
                    </Col>
                </Row>
            </Card>
        );
    }
}
export default MachineValueList;
