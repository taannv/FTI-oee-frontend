import React from "react";
import {Table} from 'antd';
import moment from "moment";
class ScheduleList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {data} = this.props;
        console.log(data);
        return(
            <div>
                <Table dataSource={data} size={'small'} pagination={false}>
                    <Table.Column title="Tiêu đề" dataIndex="title" key="title" />
                    <Table.Column title="Nội dung công việc" dataIndex="content" key="content"/>
                    <Table.Column title="Thời gian Bắt Đầu" dataIndex="start" key="start"/>
                    <Table.Column title="Thời gian Kết Thúc" dataIndex="end" key="end" />
                    <Table.Column title="Trạng Thái" dataIndex="status" key="status" 
                        render={status=>(
                            <span>
                                {status===0?'Chưa thực hiện':'Đã hoàn thành'}
                            </span>
                        )}/>         
                </Table>
            </div>
        )
    }
}

export default ScheduleList;