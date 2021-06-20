import React from "react";
import visavailChart from 'visavail'
import 'visavail/visavail.min.css'


class MachineTimeStatus extends React.Component {

    constructor(props) {
        super(props);

        const dataset = [{
            legend: true,
            "categories": {
                "Up": { "color": "#4d9e26" },
                "Away": { "color": "#4589ec" },
                "Down": { "color": "#f75001" },
            },
            "data": [
                ["2019-09-10 08:00:00", "Up", "2019-09-10 08:30:00"],
                ["2019-09-10 08:30:00", "Away", "2019-09-10 09:00:00"],
                ["2019-09-10 09:00:00", "Up", "2019-09-10 09:40:00"],
                ["2019-09-10 09:40:00", "Up", "2019-09-10 10:00:00"],
                ["2019-09-10 10:00:00", "Up", "2019-09-10 11:00:00"],
                ["2019-09-10 11:00:00", "Down", "2019-09-10 12:00:00"],
                ["2019-09-10 12:00:00", "Up", "2019-09-10 13:00:00"],
                ["2019-09-10 13:00:00", "Away", "2019-09-10 14:00:00"],
                ["2019-09-10 14:00:00", "Up", "2019-09-10 15:00:00"],
                ["2019-09-10 15:00:00", "Up", "2019-09-10 16:00:00"],
                ["2019-09-10 16:00:00", "Up", "2019-09-10 17:00:00"],
                ["2019-09-10 17:00:00", "Away", "2019-09-10 17:05:00"],
                ["2019-09-10 17:05:00", "Up", "2019-09-10 17:20:00"],
                ["2019-09-10 17:20:00", "Up", "2019-09-10 17:30:00"],
                ["2019-09-10 17:30:00", "Down", "2019-09-10 18:00:00"]
            ],
        }];

        const options = {
            moment_locale: 'vi',
            id_div_container: "visavail_container",
            id_div_graph: "visavail_graph",
            icon: {
                class_has_data: 'fas fa-fw fa-check',
                class_has_no_data: 'fas fa-fw fa-exclamation-circle'
            },
            line_spacing: 1,
            custom_categories: true,
            date_in_utc: false,
            show_y_title: false,
            title: {
                enabled:false,
                text: 'Thời gian máy chạy'
            },
            sub_title:{
                enabled:false
            },
            graph:{
                height:15
            },
            responsive:{
                enabled:true,
            },
            padding:{
                bottom:0,
                top:0,
                left:0,
                right:0
            },
            margin:{
                top:30,
                bottom:20,
                left:0,
                right:10
            },
            legend:{
                line_space:0,
                offset:2,
                enabled: false
            },
            sub_title: {
                enabled: false
            },
            responsive: {
                enabled: true
            },
            zoom: {
                enabled: true
            }
        };

        this.state = {
            dataset, options
        }
    }

    componentDidMount() {
        visavailChart.generate(this.state.options, this.state.dataset);
    }

    render() {
        return (
            <div className="visavail" id="visavail_container">
                <p id="visavail_graph"></p>
            </div>
        )

    }
}

export default MachineTimeStatus;