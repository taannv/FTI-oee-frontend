import React from "react";
import {Card, Col, Row, Typography} from "antd";
import ProductionReport from "../charts/ProductionReport";
import MachineTimeReport from "../charts/MachineTimeReport";

const {Title, Text} = Typography;
class MachineReports extends React.Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div>
                <Card title="Báo cáo sản lượng trong tháng" bordered={false}>  
                   <ProductionReport />
                </Card>
                <Card title="Báo cáo thời gian máy chạy trong tháng" bordered={false}>  
                   <MachineTimeReport />
                </Card>
            </div>
        );
    }
}
export default MachineReports;
