import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Icon,Pagination} from "antd";
import {reportCO01,exportExcel} from '../../services/CanOng01Service';
import moment from "moment";
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";
import NumberFormat from 'react-number-format';

const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';


const data = [];

class ThoiGianSXCO01 extends React.Component{
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

    getReportProductCO01=()=>{
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
        reportCO01(params).then(page=>{
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
          await reportCO01(params).then(data=>{
              console.log(data);
            data.content.map((item,i)=>{
                let iData={
                    'Ng??y':item.ngay,
                    'Gi???':item.gio,
                    '?????nh m???c 8 ti???ng(c??y)':item.slkh8t,
                    '?????nh m???c 8 ti???ng(kg)':item.klkh8t,
                    'Th???c hi???n 8 ti???ng(c??y)':item.sltt8t,
                    'Th???c hi???n 8 ti???ng(kg)':item.kltt8t,
                    'Th???i gian On':item.timeOn,
                    'Th???i gian Off':item.timeOff,
                    'OEE':item.oee
                }
                dataXlsx.push(iData);               
            });                          
          });
          if(i==this.state.totalPages-1){
            this.setState({loadingbtnXslx:false});
            exportExcel(dataXlsx,'thoi_gian_sx_C1');
          }   
        }
      }
    
    render(){        
        return(
            <Card title="B??O C??O TH???I GIAN S???N XU???T" bordered={false}>
               
                <Row gutter={8} style={{marginBottom:20,marginTop:20}}>
                    <Col span={5}>
                        <label>T??? Ng??y (*): </label><br/>
                        <DatePicker format={dateFormatList} onChange={this.onChangeFrom} size={'small'}  />
                    </Col>
                    <Col span={5}>
                        <label>?????n Ng??y (*): </label><br/>
                        <DatePicker format={dateFormatList} onChange={this.onChangeTo} size={'small'}  />
                    </Col>
                    <Col span={4}>
                        <label> </label><br/>
                        <Button type="danger" loading={this.state.loadingViewReport} size={'small'} onClick={this.getReportProductCO01}><Icon type="read" />Xem B??o C??o</Button>
                    </Col>
                    <Col span={4}>
                        <label> </label><br/>
                        <Button type="primary" onClick={this.exportXslx} loading={this.state.loadingbtnXslx} disabled={this.state.disibaleBtnXslx} size={'small'}><Icon type="file-excel" />Xu???t File Excel</Button>
                    </Col>
                </Row>
                 <Row style={{marginBottom:20 }}>                   
                    <Col  span={24}>
                    <Table dataSource={this.state.data} size={'small'} pagination={false}>
                            <Table.Column title="Ng??y" dataIndex="ngay" key="ngay"
                                render={(text) => (
                                    
                                    <span size="middle">
                                        {moment(text).format('DD/MM/YYYY')}
                                    </span>
                                )}
                            />
                            <Table.Column title="Gi???" dataIndex="gio" key="gio" />
                            <Table.Column title="?????nh m???c 8 ti???ng(c??y)" dataIndex="slkh8t" key="slkh8t"/>
                            <Table.Column title="?????nh m???c 8 ti???ng(kg)" dataIndex="klkh8t" key="klkh8t" />
                            <Table.Column title="Th???c hi???n 8 ti???ng(c??y)" dataIndex="sltt8t" key="sltt8t" />  
                            <Table.Column title="Th???c hi???n 8 ti???ng(kg)" dataIndex="kltt8t" key="kltt8t" />  
                            <Table.Column title="Th???i gian On" dataIndex="timeOn" key="timeOn" /> 
                            <Table.Column title="Th???i gian Off" dataIndex="timeOff" key="timeOff" />                             
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

export default ThoiGianSXCO01;