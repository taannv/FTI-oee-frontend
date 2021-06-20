import React from "react";
import {Col, Row, Table,Card,Button} from "antd";
import {Link} from "react-router-dom";
import {DEFAULT_PAGE} from "../../constants";
import {getListUser,deleteHandler} from "../../services/MachineService";
const data = [
   
];

class Listusers extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {
            data:[],
            name:'',           
        }
    }
    onChangePage=(value)=>{
        console.log(value);
        this.loadPage(value-1);
    }
    componentDidMount(){
        console.log('componentDidMount');
        this.getListUser();
    }

        getListUser=()=>{
            this.setState({loadingViewReport:true});
            this.loadPage(DEFAULT_PAGE);
        }
        loadPage=(page)=>{
            getListUser(page).then(page=>{

                this.setState({
                    data:page
                })
                console.log(page);
            });
        
        }
               
        deleteHandler(item,i) {
            console.log("ok" +i);   
            const param = Object.assign({},{
                id:item.id,
                userName:item.username
            });
            console.log(item);
            deleteHandler(param).then(res=>{                
                this.setState({data: this.state.data.filter(function(person) { 
                    return person !== item
                })});
            })
        };
            
    render(){
        console.log('render');
        return(
            <Card title="DANH SÁCH TÀI KHOẢN" bordered={false}>
                <Row style={{marginTop:10,marginBottom:10}}>
                    <Col>
                        {/* <Link to="/user/create">
                            <Button type="primary" loading={this.state.loading} size={'small'}>Thêm tài khoản mới</Button>
                        </Link> */}
                    </Col>
                </Row>
                 <Row>                   
                    <Col span={24}>
                        <Table dataSource={this.state.data} size={'small'} bordered rowKey="id">
                            <Table.Column title="Name" dataIndex="name" key="name" />
                            <Table.Column title="Username" dataIndex="username" key="username"/>
                            <Table.Column title="Email" dataIndex="email" key="email"/>
                            <Table.Column title="Action" key="action"
                                render={(item, record) => (
                                    <div>
                                        {/* <span>
                                        <Link to={{
                                                pathname:"/user/create",
                                                state:{user:item}
                                            }}>Edit</Link>
                                        </span> */}
                                        <span style={{marginLeft:20}}> <Link to="#" onClick={() => {if(window.confirm('Are you sure to delete this record?')){ this.deleteHandler(item,record)};}}>
                                            Delete 
                                        </Link></span>
                                    </div>
                                  )}
                            />           
                        </Table>
                    </Col>
                </Row>
            
            </Card>
        )
    }
}

export default Listusers;