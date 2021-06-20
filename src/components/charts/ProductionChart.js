import * as React from "react";
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js"
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);

class ProductionChart extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        const options = {
            chart: {
                type: "column"
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Sản lượng'
            },
            xAxis: {
                categories: this.props.categories,
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Đơn vị (kg)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                }
            },
            series: [{
                name: 'Sản lượng',
                data: this.props.data,
            }]
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
                ref="productionChart"
            />
        )
    }
}

export default ProductionChart;
