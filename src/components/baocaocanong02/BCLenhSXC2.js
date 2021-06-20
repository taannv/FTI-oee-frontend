
import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Icon,Pagination} from "antd";
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";
import {reportProductionOrdersC2,exportExcel} from '../../services/CanOng02Service';
import moment from "moment";
import NumberFormat from 'react-number-format';

const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
const InputGroup = Input.Group;
const data = [];

class BCLenhSXC2 extends React.Component{
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
    getReportProductionOrderC2=()=>{
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
        reportProductionOrdersC2(params).then(page=>{
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
        await reportProductionOrdersC2(params).then(data=>{              
                console.log(data);  
                data.content.map((item,i)=>{
                       let idata = {
                            'Lệnh SX':item.lenh_sx,
                            'Giờ':item.gio,
                            'Ngày':item.ngay,
                            'Vào dày':item.day_in,
                            'Vào rộng':item.rong_in,
                            'Ra dài':item.dai_out,
                            'Ra rộng':item.rong_out,
                            'Ra cao':item.cao_out,
                            'Số lượng kế hoạch':item.slkh,
                            'Số lượng thực tế':item.sltt
                       }
                       dataXlsx.push(idata);
                });                              
            });
            if(i==this.state.totalPages-1){
                this.setState({loadingbtnXslx:false});
                exportExcel(dataXlsx,'lenh_sx_C2');
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
                        <Button type="danger" loading={this.state.loadingViewReport} onClick={this.getReportProductionOrderC2} size={'small'}><Icon type="read" />Xem Báo Cáo</Button>
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
                            <Table.Column title="Lệnh SX" dataIndex="lenh_sx" key="lenh_sx" />
                            <Table.Column title="Giờ" dataIndex="gio" key="gio"/>
                            <Table.Column title="Ngày" dataIndex="ngay" key="ngay"/>
                            <Table.Column title="Vào dày" dataIndex="day_in" key="day_in"/>
                            <Table.Column title="Vào rộng" dataIndex="rong_in" key="rong_in" />
                            <Table.Column title="Ra dài" dataIndex="dai_out" key="dai_out" />        
                            <Table.Column title="Ra Rộng" dataIndex="rong_out" key="rong_out" />     
                            <Table.Column title="Ra Cao" dataIndex="cao_out" key="cao_out" />
                            <Table.Column title="Số lượng kế hoạch" dataIndex="slkh" key="slkh" />
                            <Table.Column title="Số lượng thực tế" dataIndex="sltt" key="sltt" />
                                                                          
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
export default BCLenhSXC2;
