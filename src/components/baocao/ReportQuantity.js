import React from "react";
import {Col, Row, Card, Typography, DatePicker} from "antd";
import MachineQuantity from '../charts/MachineQuantity';
import "../../styles/MachineDetail.css"
import {getDataQuantityProduction} from '../../services/MachineService';

const {Title, Text} = Typography;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function onChange(date, dateString) {
    console.log(date, dateString);
  }
  
// const getDaysInMonth = date =>
//   new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
// //alert(getDaysInMonth(new Date(2019, 1))); // 28 days in February 2019
//         var text ="";
//         var length = getDaysInMonth(new Date(2019, 1));
//         var i;
//     for (i = 1; i <= length; i++) {
// 	    var day = "";
// 	if (i < 10) {
//   	    day = "0" + i;
//         }
//     else{
//         day = i;
//         }
//   text += "2019-01-" + day + "<br>";
// }
// //document.getElementById("demo").innerHTML = text;

class ReportOEE extends React.Component{
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
        getDataQuantityProduction().then(data=>{
           
            let dataColumn = [];
            let categories = [];
            data.forEach(element => {
                console.log(element.day.trim());
                let item = [element.day.trim(),element.mass];
                
                dataColumn.push(item);
            });
            this.setState({
                data,
                oee:data.oee,
                dataColumn:dataColumn,
                categories:categories
            })  
        })
     }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
      
        return(
            <div>
                <Row gutter={24} >
                    <Col span={24}>
                        <Card bordered={false}>
                            <Title level={2}>Khối Lượng Sản Xuất</Title>
                            <DatePicker onChange={onChange} picker="month" />
                            <br /> 
                             
                        </Card>
                                               
                    </Col>                   
                    <Col span={24}>
                        <Card bordered={false}>
                        <MachineQuantity data={this.state.dataColumn} categories={this.state.categories} height={300} width={600} />
                        </Card>
                    </Col>                                               
                </Row>
                       
            </div>
        
        )
    }
}

export default ReportOEE;
