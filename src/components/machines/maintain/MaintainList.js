import * as React from "react";
import {Badge, Calendar, Modal} from "antd";
import '../../../styles/Maintain.css'
import MaintainForm from "./MaintainForm";
import moment from "moment";

const locale = {
    "lang": {
        "month": "Tháng",
        "year": "Năm"
    }
}
class MaintainList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            totalItemInMonth: 0,
            modalVisible: false,
            eventTitle: "Sự kiện mới"
        }

        this.dateCellRender = this.dateCellRender.bind(this);
        this.getListData = this.getListData.bind(this);
    }

    setModalVisible = val => this.setState({modalVisible: val});

    getListData(value) {
        let listData = [];
        this.state.items.map(item => {
            if (item.date == value.date() && item.month == value.month()) {
                listData.push(item);
            }
        });
        return listData;
    }

    dateCellRender(value) {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    getMonthData = (value) => {
        if (value.month() === 8) {
            return this.state.totalItemInMonth;
        }
    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    onSelect = value => {
        this.setState({dateSelected: value})
        this.setModalVisible(true);
    }

    onAddEvent = () => {
        this.setModalVisible(false)
        const date = this.state.dateSelected.date();
        const month = this.state.dateSelected.month();
        this.state.items.push({ date, month, type: 'success', content:  this.state.eventTitle});
        this.setState({eventTitle: 'Sự kiện mới'})
    }

    onChangeEventTitle = (e) => {
        this.setState({eventTitle: e.target.value})
    }

    render() {
        return (
            <div>
                <Calendar
                    onSelect={this.onSelect} dateCellRender={this.dateCellRender}
                    monthCellRender={this.monthCellRender} locale={locale} />
                <Modal
                    title={"Thêm mới sự kiện Ngày: " + moment(this.state.dateSelected).format("DD/MM/YYYY")}
                    centered closable={false}
                    visible={this.state.modalVisible}
                    onOk={this.onAddEvent}
                    onCancel={() => this.setModalVisible(false)}
                >
                    <MaintainForm onAddEvent={this.onAddEvent} changeEventTitle={this.onChangeEventTitle} eventTitle={this.state.eventTitle} />
                </Modal>
            </div>
        )
    }
}

export default MaintainList;
