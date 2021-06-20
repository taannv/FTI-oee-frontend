import * as React from "react";
import Highcharts from "highcharts/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

class MachineVolume extends React.Component {

    constructor(props) {
        super(props);

        const options = {
            chart: {
                type: "column",
                // height: this.props.height,
                // width: this.props.width
            },
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            plotOptions: {
                series: {
                    pointWidth: 50,
                    groupPadding: 0
                }
            },
            xAxis: {
                type: 'category',
               // categories: this.props.categories
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
                name: 'Sản lượng theo tháng (KG)',
                data: this.props.data,
                colorByPoint: true
            }],
            colors:['#ffa39e','#91d5ff']
            
           
        }

        this.state = {options};
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data == prevProps.data) {
            return false;
        }

        this.setState({
            options: {
                series: [{
                    data: this.props.data
                }]
            }
        })
    }

    render() {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref="machineVolumeChart"
            />
        )
    }
}

export default MachineVolume;
