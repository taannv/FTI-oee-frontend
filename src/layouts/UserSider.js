import * as React from "react";
import {Avatar, Icon, Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {
    PATH_LOGIN,
    PATH_MACHINE_ERROR_LIST,
    PATH_MACHINE_OUTPUT_LIST,
    PATH_MAINTAIN,
    PATH_PLANING,
    PATH_ROOT,
    PATH_MACHINE_SPLIT,
    PATH_SCHEDULER_CALENDAR
} from "../constants";

import {ScheduleOutlined,SettingOutlined} from '@ant-design/icons'

class UserSider extends React.Component {

    onCollapse = collapsed => this.setState({ collapsed });

    render() {
        let machine = this.props.selectedMachine;
        return (
            <Layout.Sider theme={'light'}>
                <div className="profile">
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size={64}>
                                {this.props.currentUser.name}
                            </Avatar>
                        </div>
                        <div className="profile-usertitle">
                            <div className="profile-usertitle-job">
                                Nhân viên | <Link to={PATH_LOGIN}>Thoát</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu theme="light" selectedKeys={[window.location.pathname]} mode="inline">
                   
                     {/* <Menu.Item key={PATH_MACHINE_SPLIT}>
                        <Link to={PATH_MACHINE_SPLIT}>
                            <Icon type="apartment" />
                            <span>Máy xả băng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={PATH_MAINTAIN}>
                        <Link to={PATH_MAINTAIN}>
                            <Icon type="tool" />
                            <span>Bảo trì</span>
                        </Link>
                    </Menu.Item> */}

                    <Menu.Item key={PATH_SCHEDULER_CALENDAR}>
                        <Link to={PATH_SCHEDULER_CALENDAR}>   
                            <ScheduleOutlined style={{fontSize:18}} />
                            <span>Lịch bảo trì</span>
                        </Link>
                    </Menu.Item>
                     <Menu.Item key={PATH_MACHINE_SPLIT}>
                        <Link to={PATH_MACHINE_SPLIT}>
                            <SettingOutlined style={{fontSize:18}} />
                            <span>Máy xả băng</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        );
    }
}

export default UserSider;