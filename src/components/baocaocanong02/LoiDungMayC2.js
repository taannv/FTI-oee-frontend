import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Pagination, Icon} from "antd";
import moment from "moment";
import {reportErrorC2,exportExcel} from '../../services/CanOng02Service';
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";


const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
const InputGroup = Input.Group;
const data = [];
const options = [
    {
      value: 'Thiếu chỗ để sản phẩm',
      label: 'Thiếu chỗ để sản phẩm',
    },
    {
        value: 'Thiếu người',
        label: 'Thiếu người',
    },
    {
        value: 'Hư hỏng, sửa chữa ngoài kế hoạch',
        label: 'Hư hỏng, sửa chữa ngoài kế hoạch',
    },
    {
        value: 'Bảo trì, bảo dưỡng',
        label: 'Bảo trì, bảo dưỡng',
    },
    {
        value: 'Nguyên nhân khác',
        label: 'Nguyên nhân khác',
    },
];

class LoiDungMayC2 extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {
            data,
            fromDate:0,
            todate:0,
            total:0,
            loadingbtn1:false,
            loadingbtn2:false,
            current:DEFAULT_PAGE+1,
            pageSize:PAGE_SIZE,
            enableExportBtn:true,
            totalPages:0
        }
       
    }
    onChangeFrom=(date, dateString)=> {
        if(date!=null){
            this.setState({fromDate:date.format('x')})
            console.log(date.format('x'));
        }
      }
    onChangeTo=(date, dateString)=> {
        if(date!=null){
            console.log(date.format('x'));
            this.setState({todate:date.format('x')})
        }
    }
    getReportErrorC2=()=>{
        this.setState({loadingbtn1:true});
        this.loadPage(DEFAULT_PAGE,this.state.fromDate,this.state.todate);
    }
    loadPage=(offset,from,to)=>{
        from = from || DEFAULT_FROM;
        to = to || DEFAULT_TO;
        let params = {
            page:offset,
            fromDate:from,
            toDate:to,
            size:this.state.pageSize
        }
        reportErrorC2(params).then(page=>{
            this.setState({
                loadingbtn1:false,
                data:page.content,
                total:page.totalElements,
                current:page.number+1,
                enableExportBtn:false,
                totalPages:page.totalPages
            });            
        })
    }
    onChangePage=(value)=>{
        this.loadPage(value-1,this.state.fromDate,this.state.toDate);
    }
    onExportExcel= async()=>{
        this.setState({loadingbtn2:true});
        let dataXlsx = [];
        for(let i = 0; i<this.state.totalPages;i++){            
            let params = {
                page:i,
                fromDate:this.state.fromDate,
                toDate:this.state.todate,
                size:this.state.pageSize
            }
            await reportErrorC2(params).then(data=>{        
                console.log(data);    
                data.content.map((item,i)=>{
                    let iData = {
                        'Giờ bắt đầu':item.hourStart,
                        'Ngày bắt đầu':item.dayStart,
                        'Giờ kết thúc':item.hourEnd,
                        'Ngày kêt thúc':item.dayEnd,
                        'Nguyên Nhân':item.note,
                        'Thời gian dừng':item.tgdung,
                    }
                    dataXlsx.push(iData);
                });               
            });
            if(i==this.state.totalPages-1){
                exportExcel(dataXlsx,'log_error_C2');
                this.setState({loadingbtn2:false});
            }
        }
    }
    render(){        
        return(
            <Card title="LỖI DỪNG MÁY" bordered={false}>
                
                <Row gutter={8} style={{marginBottom:20,marginTop:20}}>
                    <Col span={4}>
                        <label>Từ Ngày (*):</label>
                        <DatePicker onChange={this.onChangeFrom} size={'small'}/>
                    </Col>
                    <Col span={4}>
                        <label>Đến Ngày (*):</label>
                        <DatePicker onChange={this.onChangeTo} size={'small'} />
                    </Col>
                    <Col span={3}>
                        <br/>
                        <Button type="danger" loading={this.state.loadingbtn1} size={'small'} onClick={this.getReportErrorC2}><Icon type="read" />Xem Báo Cáo</Button>
                    </Col>
                    
                    <Col span={3}>
                        <br/>
                        <Button type="primary" loading={this.state.loadingbtn2} disabled={this.state.enableExportBtn} onClick={this.onExportExcel} style={{marginRight:10}} size={'small'}>Xuất file Excel</Button>
                    </Col>
                </Row>
                <Row style={{marginBottom:20}}>                   
                    <Col  span={24}>
                        <Table dataSource={this.state.data} size={'small'} pagination={false}>
                            <Table.Column title="Giờ Bắt Đầu" dataIndex="hourStart" key="hourStart" />
                            <Table.Column title="Ngày Bắt Đầu" dataIndex="dayStart" key="dayStart"/>
                            <Table.Column title="Giờ Kết Thúc" dataIndex="hourEnd" key="hourEnd"/>
                            <Table.Column title="Ngày Kết Thúc" dataIndex="dayEnd" key="dayEnd"/>
                            <Table.Column title="Nguyên Nhân" dataIndex="note" key="note" />   
                            <Table.Column title="Thời gian dừng" dataIndex="tgdung" key="tgdung" />                                                    
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
 export default LoiDungMayC2;