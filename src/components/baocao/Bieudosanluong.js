import React from "react";
import {Col, Row, Table,Card,Button,DatePicker, Input, Icon,Typography} from "antd";
import ProductionChart from "../charts/ProductionChart";
import "../../styles/MachineDetail.css";
import {productionChart} from '../../services/MachineService';
import moment from "moment";
import {DEFAULT_PAGE,PAGE_SIZE} from "../../constants";


const {Title, Text} = Typography;
const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');

const getDaysInMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

function onChange(date, dateString) {
    console.log(date, dateString);
  }

class Bieudosanluong extends React.Component {
    constructor(props){
        super(props);  
        this.state={
            data:{},
            oee:0,
            availability:0,
            quality:0,
            performance:100,
            dataColumn:[],
            categories:[]
        }
    }
    componentDidMount(){
        this.getDataOEE();

    }
    getDataOEE = ()=>{
 
        let params = {
            page:DEFAULT_PAGE,
            fromDate:DEFAULT_FROM,
            toDate:DEFAULT_TO,
            size:PAGE_SIZE
        };
        productionChart(params).then(data=>{

            let categories = [];
            let data_column = [];

            var length = getDaysInMonth(new Date(2020, 0));
            var i;
            
            for (i = 0; i <= length; i++) {
                var d = "";
                var day = "";
                if (i < 10) {
                    day = "0" + i;
                }
                else{
                    day = i;
                }
                d = "01/" + day + "/2020";
                
                var value = 0;
                for(let j = 0 ; j < data.content.length; j++){  
                    let r = data.content[j];
                    if(r.day.trim() == d){
                        value = r.mass;
                        break;
                    }
                }
                data_column.push([d, value]);
            }
            
            console.log(data_column);
            this.setState({
                data,
                dataColumn:data_column,
                categories:categories
            })  
        })
    }
    componentWillUnmount() {
    }

    render(){
      
        return(
            <div>
                <Row gutter={24} >
                    <Col span={24}>
                        <Card bordered={false}>
                            <Title level={2}>Khối lượng sản xuất theo ngày</Title>
                        </Card><br/>                 
                    </Col>   
                    <Col span={5}>
                        <label>Chọn Tháng (*): </label><br/>
                        <DatePicker onChange={this.onChangeFrom} picker="month" size={'small'}/>
                    </Col>    
                    <Col span={24}>
                        <Card bordered={false}><br/>
                            <ProductionChart data={this.state.dataColumn} categories={this.state.categories} height={250} width={300} />
                        </Card>
                    </Col>     
                </Row>              
            </div>
        )
    }
}

export default Bieudosanluong;