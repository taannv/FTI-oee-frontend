import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Icon,Pagination} from "antd";
import {reportProduce,exportExcel} from '../../services/MachineService';
import moment from "moment";
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";
import NumberFormat from 'react-number-format';

const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';

const data = [];

class Thoigiansx extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {
            data,
            from:0,
            to:0,
            total:0,
            current:DEFAULT_PAGE+1,
            pageSize:PAGE_SIZE,
            disibaleBtnXslx:true,
            loadingbtnXslx:false,
            loadingViewReport:false,
            totalPages:0
        }       
    }
    onChangePage=(value)=>{
        console.log(value);
        this.loadPage(value-1,this.state.from,this.state.to);
    }

    getReportProduct=()=>{
        this.setState({loadingViewReport:true});
        this.loadPage(DEFAULT_PAGE,this.state.from,this.state.to);
    }
    loadPage=(offset,from,to)=>{
        //offset = !!offset && isNaN(offset) ? offset : DEFAULT_PAGE;
        from = from || DEFAULT_FROM;
        to = to || DEFAULT_TO;
      
        let params = {
            page:offset,
            fromDate:from,
            toDate:to,
            size:this.state.pageSize
        };
        reportProduce(params).then(page=>{
            this.setState({
                data:page.content,
                total:page.totalElements,
                current:page.number+1,
                disibaleBtnXslx:false,
                loadingViewReport:false,
                totalPages:page.totalPages
            })
            console.log(page);
        });
    }

     onChangeFrom=(date, dateString)=> {
        if(date!=null){
            let from = date.format('x');
            this.setState({from:from});
            console.log(from);
         }
      }
     onChangeTo=(date, dateString)=> {
        if(date!=null){
            let to = date.format('x');
            this.setState({to:to});
            console.log(to);
        }
      }
       exportXslx= async ()=>{
        this.setState({loadingbtnXslx:true});
        let dataXlsx =[];
        for(let i = 0 ; i < this.state.totalPages; i++){          
          let params = {
            page:i,
            fromDate:this.state.from,
            toDate:this.state.to,
            size:this.state.pageSize
          };
          await reportProduce(params).then(data=>{
              console.log(data);
            data.content.map((item,i)=>{
                let iData={
                    'Ngày':item.day,
                    'Giờ':item.hour,
                    'Thời Gian KH':item.timePlan,
                    'Thời Gian SX':item.timeProduce,
                    'Thời Gian On':item.timeOn,
                    'Thời Gian Off':item.timeOff,
                    'Khối Lượng KH':item.plan,
                    'Khối Lượng SX':item.produce,
                    'OEE':item.oee
                }
                dataXlsx.push(iData);               
            });                          
          });
          if(i==this.state.totalPages-1){
            this.setState({loadingbtnXslx:false});
            exportExcel(dataXlsx,'thoi_gian_sx');
          }   
        }
      }
    
    render(){        
        return(
            <Card title="BÁO CÁO THỜI GIAN SẢN XUẤT" bordered={false}>
               
                <Row gutter={8} style={{marginBottom:20,marginTop:20}}>
                    <Col span={5}>
                        <label>Từ Ngày (*): </label><br/>
                        <DatePicker format={dateFormatList} onChange={this.onChangeFrom} size={'small'}  />
                        {/* <DatePicker onChange={this.onChangeFrom} size={'small'}/> */}
                    </Col>
                    <Col span={5}>
                        <label>Đến Ngày (*): </label><br/>
                        <DatePicker format={dateFormatList} onChange={this.onChangeTo} size={'small'}  />
                        {/* <DatePicker onChange={this.onChangeTo} size={'small'}/> */}
                    </Col>
                    <Col span={4}>
                        <label> </label><br/>
                        <Button type="danger" loading={this.state.loadingViewReport} size={'small'} onClick={this.getReportProduct}><Icon type="read" />Xem Báo Cáo</Button>
                    </Col>
                    <Col span={4}>
                        <label> </label><br/>
                        <Button type="primary" onClick={this.exportXslx} loading={this.state.loadingbtnXslx} disabled={this.state.disibaleBtnXslx} size={'small'}><Icon type="file-excel" />Xuất File Excel</Button>
                    </Col>
                </Row>
                 <Row style={{marginBottom:20 }}>                   
                    <Col  span={24}>
                        <Table dataSource={this.state.data} size={'small'} pagination={false}>
                            <Table.Column title="Ngày" dataIndex="day" key="day"
                                render={(text) => (
                                    
                                    <span size="middle">
                                        {moment(text).format('DD/MM/YYYY')}
                                    </span>
                                )}
                            />
                            <Table.Column title="Giờ" dataIndex="hour" key="hour" />
                            <Table.Column title="Thời gian kế hoạch (phút)" dataIndex="timePlan" key="timePlan"/>
                            <Table.Column title="Thời gian sản xuất (phút)" dataIndex="timeProduce" key="timeProduce" />
                            <Table.Column title="Thời gian On" dataIndex="timeOn" key="timeOn" /> 
                            <Table.Column title="Thời gian Off" dataIndex="timeOff" key="timeOff" /> 
                            <Table.Column title="Khối lượng kế hoạch (Kg)" dataIndex="plan" key="plan"
                            render = {text => ( 
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}/>
                            )

                            } /> 
                            <Table.Column title="Khối lượng sản xuất (Kg)" dataIndex="produce" key="produce"
                            render = {text => ( 
                                <NumberFormat value={text} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}/>
                            )

                            } /> 
                            <Table.Column title="OEE" dataIndex="oee" key="oee" />                            
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

export default Thoigiansx;