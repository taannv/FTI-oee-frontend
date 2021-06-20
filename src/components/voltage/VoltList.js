import React, {Component} from "react";
import {Card, Col, Row, Typography} from "antd";
import VoltItem from './VoltItem'

let voltList = [
    {
      name:'Máy 1',
      data:[{
            title:'voltage 1-2',
            value:1240,
            uom:'V'
        },
        {
            title:'voltage 1-3',
            value:12402,
            uom:'V'
        },
        {
            title:'voltage 1-4',
            value:12406,
            uom:'V'
        },
        {
            title:'voltage 1-5',
            value:12406,
            uom:'W'
        }]
    },
    {  name:'Máy 2',
       data:[{
                title:'voltage 1-2',
                value:1240,
                uom:'V'
            },
            {
                title:'voltage 1-3',
                value:12402,
                uom:'V'
            },
            {
                title:'voltage 1-4',
                value:12406,
                uom:'V'
            },
            {
                title:'voltage 1-5',
                value:12406,
                uom:'W'
            }
        ]
    },
    {  name:'Máy 3',
       data:[{
                title:'voltage 1-2',
                value:1240,
                uom:'V'
            },
            {
                title:'voltage 1-3',
                value:12402,
                uom:'V'
            },
            {
                title:'voltage 1-4',
                value:12406,
                uom:'V'
            },
            {
                title:'voltage 1-5',
                value:12406,
                uom:'W'
            }
        ]
    }
]

class VoltList extends React.Component{
    constructor(prop){
        super(prop)
    }

    render(){
        return(
            <div>
                <Row gutter={6}>
                    {voltList.map(
                        itemVolte=> <Col span={12}>
                            <VoltItem name={itemVolte.name} voltageItems={itemVolte.data}/>
                        </Col>  
                    )}      
                </Row>
            </div>
        )
    }
}

export default VoltList;
