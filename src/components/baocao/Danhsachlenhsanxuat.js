
import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Icon,Pagination} from "antd";
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";
import {reportProductionOrders,exportExcel} from '../../services/MachineService';
import moment from "moment";
import NumberFormat from 'react-number-format';

const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
const InputGroup = Input.Group;
const data = [];

class Lenhsx extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {
            data,
            pageSize:PAGE_SIZE,
            current:DEFAULT_PAGE+1,
            total:0,
            totalPages:0
        }
    }
    
    render(){        
        return(
            <Card title="DANH SÁCH LỆNH SẢN XUẤT" bordered={false}>
                 <Row style={{marginBottom:20}}>                   
                    <Col  span={24}>
                        <Table dataSource={this.state.data}  pagination={false}>
                            <Table.Column title="Lệnh Sản Xuất" dataIndex="productionOrder" key="productionOrder" />
                            <Table.Column title="Tên Sản Phẩm" dataIndex="hour" key="hour"/>
                            <Table.Column title="Thời Gian Bắt Đầu" dataIndex="NgayStart" key="NgayStart"/>
                            <Table.Column title="Thời Gian Kết Thúc" dataIndex="NgayEnd" key="NgayEnd"/>
                            <Table.Column title="Sản Lượng Kế Hoạch (Cây)" dataIndex="width" key="width" />
                            <Table.Column title="Sản Lượng Sản Xuất (Cây)" dataIndex="mass" key="mass"
                                        render = {text => ( 
                                            <NumberFormat value={text} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}/>
                                        )

                                        } />                                                       
                                    
                            <Table.Column title="Hoàn Thành (%)" dataIndex="width" key="width" />
                            </Table>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right' }}> 
                        {(this.state.total > this.state.pageSize)?
                            <Pagination
                                onChange={this.onChangePage}
                                total={this.state.total}
                                current={this.state.current}
                                pageSize={this.state.pageSize}
                            />:''
                        }
                    </Col>
                </Row>
        </Card>
     )
    }
}
export default Lenhsx;
