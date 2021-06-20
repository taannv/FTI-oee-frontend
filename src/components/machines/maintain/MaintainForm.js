import React from "react";
import {DatePicker, Input} from "antd";
import moment from "moment";

const { MonthPicker, RangePicker } = DatePicker;


class MaintainForm extends React.Component {

    constructor(props) {
        super(props);
    }

    disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    render() {
        return (
            <div>
                <Input value={this.props.eventTitle}
                       onPressEnter={this.props.onAddEvent}
                       onChange={this.props.changeEventTitle} allowClear/>
            </div>
        );
    }
}

export default MaintainForm;
