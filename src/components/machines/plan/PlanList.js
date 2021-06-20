import React from "react";
import {Col, Row, Table,Card,Typography,Modal,Button,Form} from "antd";
import PlanForm from "./PlanForm";
const {Title, Text} = Typography;
class PlanList extends React.Component {

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
            data, machineId,
            visible:false
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    handleCancel = ()=>{
        this.setState({visible:false})
    }
    handleOk=()=>{

    }
    handleSubmit=()=>{
        console.log('submit');
    }
    render() {
        return (
            <div>
                <Card title="Kế hoạch" bordered={false}>  
                   <Title>
                        <Button type="primary" onClick={this.showModal}>
                            Thêm mới
                        </Button>
                   </Title>
                    <Row>                       
                        <Col span={24}>
                            <Table dataSource={this.state.data} bordered>
                                <Table.Column title="Mã máy" dataIndex="machineCode" key="machineCode" />
                                <Table.Column title="Lệnh sản xuất" dataIndex="produceCommand" key="produceCommand"/>
                                <Table.Column title="Khối lượng đầu vào" dataIndex="inputVolume" key="inputVolume"/>
                                <Table.Column title="Khối lượng đầu ra" dataIndex="outputVolume" key="outputVolume"/>
                                <Table.Column title="Thời gian bắt đầu" dataIndex="fromTime" key="fromTime" />
                                <Table.Column title="Thời gian kết thúc" dataIndex="toTime" key="toTime" />
                            </Table>
                        </Col>
                    </Row>
                </Card>
                <Modal
                    title="Thêm kế hoạch"
                    visible={this.state.visible} 
                    width={630}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Thoát
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleSubmit}>
                          Lưu
                        </Button>
                      ]}>
                   <PlanForm onHandleSumbit={this.handleSubmit}  />
                </Modal>
            </div>
        );
    }
}
export default PlanList;
