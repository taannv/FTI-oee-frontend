import React from "react";
import moment from 'moment';
import 'antd/dist/antd.css';
import { Row, Col, Button ,Radio} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export function CutomToolbar (toolbar){
    const goToBack = () => {
        let mDate = toolbar.date;
        let newDate;
        console.log(toolbar.view);
        if(toolbar.view==='week'){
          newDate = new Date(mDate.getFullYear(),mDate.getMonth(),mDate.getDate() - 7,1);
        }else if(toolbar.view==='month'){
          newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
        }else if(toolbar.view==='day'){
          newDate = new Date(mDate.getFullYear(),mDate.getMonth(),mDate.getDate() - 1,1);
        }        
        toolbar.onNavigate('prev',newDate);
      };
    
      const goToNext = () => {
        let mDate = toolbar.date;
        let newDate;
        console.log(toolbar.view);
        if(toolbar.view==='week'){
          newDate = new Date(mDate.getFullYear(),mDate.getMonth(),mDate.getDate() + 7,1);
        }else if(toolbar.view==='month'){
          newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
        }else if(toolbar.view==='day'){
          newDate = new Date(mDate.getFullYear(),mDate.getMonth(),mDate.getDate() + 1,1);
        }        
        toolbar.onNavigate('next',newDate);
      };
    
      const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
      };
    
      const label = () => {
        const date = moment(toolbar.date);
        return (
          <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
        );
      };
     const _onViewChange=(view)=>{ 
        toolbar.onView(view.target.value);        
      }
      return (
        <Row gutter={16} >
          <Col style={{padding:8}} span={8}>
            <Button style={{marginRight:8}}  onClick={goToBack}><LeftOutlined /></Button>
            <Button style={{marginRight:8}}  onClick={goToCurrent}>Hôm nay</Button>
            <Button  onClick={goToNext}><RightOutlined /></Button>
          </Col>
          <Col style={{display: "flex",justifyContent: "center",paddingTop:10,fontSize:18}} span={8}>
          <label>{label()}</label>
          </Col>
          <Col style={{padding:8,display: "flex"}} span={8}>
            <div style={{ marginLeft: "auto"}}>
                <Radio.Group value={toolbar.view} onChange={_onViewChange}>
                    {/* <Radio.Button value="month">Tháng</Radio.Button> */}
                    {/* <Radio.Button value="week">Tuần</Radio.Button> */}
                    {/* <Radio.Button value="day">Ngày</Radio.Button> */}
                    {/* <Radio.Button value="agenda">Danh sách</Radio.Button> */}
                </Radio.Group>
            </div>
          </Col>
        </Row>
      );
}