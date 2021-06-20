import {Table, Tag,Card} from "antd";
import {Link, Redirect} from "react-router-dom";
import {PATH_MACHINE_DETAIL} from "../../constants";
import {getAll} from '../../services/MachineService';
import moment from "moment";

import React from "react";

class MachineList extends React.Component {
    constructor(props) {
        super(props);

        const data = [];

        this.state = {
            data, redirect: false
        }

        this.onDetail = this.onDetail.bind(this);
    }

    onDetail(machine) {
        this.props.changeMachine(machine);
        this.setState({redirect: true})

    }


    componentDidMount() {
        getAll().then(data => this.setState({data: data}));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={PATH_MACHINE_DETAIL} />
        }
        return (
            <Card title="Danh sách máy" bordered={false}>
                <Table dataSource={this.state.data} bordered rowKey="id">
                    <Table.Column title="Tên máy" dataIndex="name" key="name" />
                    <Table.Column title="Mô tả" dataIndex="description" key="description" />
                    <Table.Column title="Tình trạng" dataIndex="status" key="status"
                                  render={(status, record) => (
                                      <Tag color={record.statusColor} key={status}>{record.statusText}</Tag>
                                  )}
                    />
                    <Table.Column title="Thời gian" dataIndex="time" key="time"
                                  render={(status, record) => (
                                          moment.unix(record.statusedAt).format('YYYY-MM-DD HH:mm:ss')
                                      )}

                    />
                    <Table.Column title="Thao tác" key="action"
                                  render={(text, record) => (
                                      <Link onClick={() => this.onDetail(record)} to={"#"}>
                                          Chi tiết
                                      </Link>
                                  )}
                    />
                </Table>
            </Card>
        );
    }
}

export default MachineList;