import * as React from "react";
import Highcharts from "highcharts/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

class ProductionReport extends React.Component {

    constructor(props) {
        super(props);

        const options = {
            chart: {
                type: "column",
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
                    pointWidth: 25,
                    groupPadding: 0
                }
            },
            xAxis: {
                categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
                '23', '24', '25', '26', '27', '28', '29', '30', '31',
                ],
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
                name: 'Sản lượng',
                data: [50, 30, 40, 70, 20, 10, 66, 25, 90, 12, 50, 
                    50, 30, 40, 70, 20, 10, 66, 25, 90, 12, 50, 
                    50, 30, 40, 70, 20, 10, 66, 25, 90, 
                ]
            }],
            colors:['#4a64bd']
        }

        this.state = {options};
    }

    render() {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
                ref="productionReportChart"
            />
        )
    }
}

export default ProductionReport;
