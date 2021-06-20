import React, {Component} from "react";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

class MachineSummary extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        const dataLabel = this.props.dataLabel;
        const options = {
            chart: {
                type: "solidgauge",
                width: 200,
                height: 200
            },
            credits: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            title: {
                text: undefined
            },
            pane: {
                startAngle: -150,
                endAngle: 90,
                background: {
                    backgroundColor: '#ECECEC',
                    innerRadius: '64%',
                    outerRadius: '96%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                minorTickInterval: null,
                tickAmount: 0,
                lineWidth: 0,
                labels: {
                    y: 20,
                    x: 8
                },
                plotBands: [
                    { from: 0, to: 70, color: '#97040B', innerRadius: '105%', outerRadius: '110%' },
                    { from: 70, to: 85, color: '#4F9C36',  innerRadius: '105%', outerRadius: '110%' },
                    { from: 85, to: 100, color: '#095396',  innerRadius: '105%', outerRadius: '110%' }
                ]
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        borderWidth: 0
                    }
                },
            },
            series: [{
                dataLabels: {
                    format: '<div style="text-align:center;">' +
                        '<span style="font-size:20px;color:black' + '">{y}</span><br/>' +
                        '<span style="font-size:8px;color:silver">' + dataLabel + '</span>' +
                        '</div>'
                },
                data: [{
                    y: this.props.dataValue,
                    color: this.props.dataColor
                }]
            }]
        }

        this.state = {options};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataValue == prevProps.dataValue) {
            return false;
        }

        this.setState({
            options: {
                series: [{
                    data: [{
                        y: this.props.dataValue * 1
                    }]
                }]
            }
        })
    }

    render() {
        
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref={this.props.summaryId}
            />
        )
    }
}

export default MachineSummary;
