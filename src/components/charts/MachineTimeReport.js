import * as React from "react";
import Highcharts from "highcharts/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

class MachineTimeReport extends React.Component {

    constructor(props) {
        super(props);

        const options = {
            chart: {
                type: "bar",
                //height: 210,
                //width: 370
            },
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            xAxis: {
                categories: ['Máy 01', 'Máy 02', 'Máy 03',],
                //max: 10
            },
            yAxis: {
                lineWidth: 1,
                tickWidth: 1,
                title: {
                    align: 'high',
                    offset: 0,
                    text: 'Đơn vị',
                    rotation: 0,
                    y: -10
                }
            },
            series: [{
                name: 'Thời gian máy lỗi',
                data: [50, 30, 40,]
            },
            {
                name: 'Thời gian máy dừng',
                data: [50, 30, 40,]
            },
            {
                name: 'Thời gian máy chạy',
                data: [50, 30, 40,]
            },],
            //colors:['#4a64bd']
        }

        this.state = {options};
    }

    render() {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref="machineTimeReportChart"
            />
        )
    }
}

export default MachineTimeReport;
