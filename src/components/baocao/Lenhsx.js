
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
            wFrom:0,
            wTo:1000,
            hFrom:0,
            hTo:100,
            pageSize:PAGE_SIZE,
            current:DEFAULT_PAGE+1,
            total:0,
            from:0,
            to:0,
            disibaleBtnXslx:true,
            loadingbtnXslx:false,
            loadingViewReport:false,
            totalPages:0
        }
    }
    onChangeFrom=(date, dateString)=> {
        if(date!=null){
            let from = date.format('x');
            this.setState({from:from});
            //console.log(from);
        }
      }
     onChangeTo=(date, dateString)=> {
        if(date!=null){
            let to = date.format('x');
            this.setState({to:to});
            //console.log(to);
        }
      }
    onChangePage=(value)=>{
        this.loadingPage(value-1,this.state.from,this.state.to);
    }
    getReportProductionOrder=()=>{
        this.setState({loadingViewReport:true})
        this.loadingPage(DEFAULT_PAGE,this.state.from,this.state.to);
    }
   
    loadingPage=(offset,from,to)=>{
        from = from || DEFAULT_FROM;
        to = to || DEFAULT_TO;      
        let params = {
            page:offset,
            fromDate:from,
            toDate:to,
            wFrom:this.state.wFrom,
            wTo:this.state.wTo,
            hFrom:this.state.hFrom,
            hTo:this.state.hTo,
            size:this.state.pageSize
        };
        reportProductionOrders(params).then(page=>{
            this.setState({
                data:page.content,
                total:page.totalElements,
                current:page.number+1,
                loadingViewReport:false,
                disibaleBtnXslx:false,
                totalPages:page.totalPages
            })
            console.log(page);
        });
    }
    exportXslx= async()=>{
        this.setState({loadingbtnXslx:true});
        let dataXlsx = [];
        for(let i = 0;i < this.state.totalPages;i++){
            let params = {
                page:i,
                fromDate:this.state.from,
                toDate:this.state.to,
                wFrom:this.state.wFrom,
                wTo:this.state.wTo,
                hFrom:this.state.hFrom,
                hTo:this.state.hTo,
                size:this.state.pageSize
            };
        await reportProductionOrders(params).then(data=>{              
                console.log(data);  
                data.content.map((item,i)=>{
                       let idata = {
                            'Lệnh SX':item.productionOrder,
                            'Giờ':item.hour,
                            'Ngày':item.day,
                            'Độ dày':item.height,
                            'Chiều Rộng':item.width,
                            'Khối Lượng':item.mass
                       }
                       dataXlsx.push(idata);
                });                              
            });
            if(i==this.state.totalPages-1){
                this.setState({loadingbtnXslx:false});
                exportExcel(dataXlsx,'lenh_sx');
            } 
        }
    }
    render(){        
        return(
            <Card title="BÁO CÁO LỆNH SẢN XUẤT" bordered={false}>
                
                <Row gutter={8} style={{marginBottom:20,marginTop:20}}>
                    <Col span={4}>
                        <label>Từ Ngày (*):</label>
                        <DatePicker onChange={this.onChangeFrom} size={'small'}/>
                    </Col>
                    <Col span={4}>
                        <label>Đến Ngày (*):</label>
                        <DatePicker onChange={this.onChangeTo} size={'small'}/>
                    </Col>
                   
                <br/>
                    <Col span={3}>
                    <label> </label><br/>
                        <Button type="danger" loading={this.state.loadingViewReport} onClick={this.getReportProductionOrder} size={'small'}><Icon type="read" />Xem Báo Cáo</Button>
                    </Col>
                    <Col span={3}>
                    <label> </label><br/>
                        <Button type="primary" onClick={this.exportXslx} loading={this.state.loadingbtnXslx} disabled={this.state.disibaleBtnXslx} size={'small'}><Icon type="file-excel" />Xuất File Excel</Button>
                    </Col>
               </Row>
               <br/>
                 <Row style={{marginBottom:20}}>                   
                    <Col  span={24}>
                        <Table dataSource={this.state.data}  pagination={false}>
                            <Table.Column title="Lệnh SX" dataIndex="productionOrder" key="productionOrder" />
                            <Table.Column title="Giờ" dataIndex="hour" key="hour"/>
                            <Table.Column title="Ngày" dataIndex="day" key="day"/>
                            <Table.Column title="Độ dày" dataIndex="height" key="height"/>
                            <Table.Column title="Chiều rộng" dataIndex="width" key="width" />
                            <Table.Column title="Khối lượng" dataIndex="mass" key="mass"
                            render = {text => ( 
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}/>
                            )

                            } />                                                       
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
