import React from "react";
import {Col, Row, Table, Card, DatePicker, Button} from "antd";
import MachineHistoryErrorForm from "./MachineHistoryErrorForm";
import {queryHistoryError} from '../../../services/MachineService'
import moment from "moment";
import {DEFAULT_PAGE} from "../../../constants";
import '../../../styles/MachineHistoryErrorList.css'

const {RangePicker} = DatePicker;

const DEFAULT_FROM = moment().format('x');
const DEFAULT_TO = moment().format('x');
class MachineHistoryErrorList extends React.Component {

  constructor(props) {
    super(props);
    const data = [];
    this.state = {
      data, btnQueryLoading: false
    }
    this.loadPage = this.loadPage.bind(this);
    this.selectQueryDate = this.selectQueryDate.bind(this);
  }

  componentDidMount() {
    this.loadPage(DEFAULT_PAGE);
  }

  loadPage(offset, from, to) {
    const machine = this.props.selectedMachine;
    if (machine.id == null) {
      return
    }
    this.setState({btnQueryLoading: true})
    const { id } = machine;

    offset = !!offset && isNaN(offset) ? offset : DEFAULT_PAGE;
    from = from || DEFAULT_FROM;
    to = to || DEFAULT_TO;
    queryHistoryError(id, offset, from, to).then(page => {
      const data = page.content;
      this.setState({data, btnQueryLoading: false});
    })
  }

  selectQueryDate(date, dateString) {
    if (date && date.length > 0) {
      let from = date[0].format('x');
      let to = date[1].format('x');
      this.loadPage(DEFAULT_PAGE, from, to);
    }
  }

  render() {
    return (
        <Card title="Lịch sử lỗi" bordered={false}>
          <Row>
            <Col span={10}>
              <MachineHistoryErrorForm reloadPage={this.loadPage} selectedMachine={this.props.selectedMachine}  />
            </Col>
            <Col span={14}>
              <div style={{marginBottom: 10}}>
                <RangePicker onChange={this.selectQueryDate} defaultValue={[moment(), moment()]}/>
              </div>
              <Table dataSource={this.state.data} rowKey='id' bordered pagination={onchange = this.loadPage}>
                <Table.Column title="Lý do lỗi" dataIndex="cause" key="cause"/>
                <Table.Column title="Thời gian bắt đầu" dataIndex="startedAt" key="startedAt"
                              render={(status, record) => (
                                  moment.unix(record.startedAt).format('YYYY-MM-DD HH:mm:ss')
                              )}
                />
                <Table.Column title="Thời gian kết thúc" dataIndex="endedAt" key="endedAt"
                              render={(status, record) => (
                                  moment.unix(record.endedAt).format('YYYY-MM-DD HH:mm:ss')
                              )}
                />
              </Table>
            </Col>
          </Row>
        </Card>
    );
  }
}

export default MachineHistoryErrorList;