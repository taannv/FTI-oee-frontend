import React, {Component} from "react";
import {Card, Col, Row, Typography,Form,Input} from "antd";
const {Title, Text} = Typography;

class VoltItem  extends React.Component{
    constructor(props) {
        super(props);  
    }

    render(){
        let voltages = this.props.voltageItems;
        let name = this.props.name;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            }
        };
     
        return(
            <div>
                <Card style={{'marginTop':8}}>
                    <Title level={2}>{name}</Title>
                    <Form {...formItemLayout}>
                        <Row gutter={10}>
                           {voltages.map(
                               item=><CustomItem title={item.title} value={item.value} uom={item.uom}/>
                           )}
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default VoltItem;

const CustomItem = ({title,value,uom})=>(
    <Col span={12}>
        <Form.Item label={title}>
            <Input  value = {value + ' ' +uom}/>
        </Form.Item>
    </Col>
)