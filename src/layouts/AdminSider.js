import {Avatar, Icon, Layout, Menu} from "antd";
import React from "react";
import '../styles/AppSider.css';
import {Link} from "react-router-dom";
import {
    PATH_LOGIN,
    PATH_MACHINE_DETAIL,
    PATH_MACHINE_ERROR_LIST,
    PATH_MACHINE_LIST,
    PATH_MACHINE_OUTPUT_LIST, PATH_ROOT,
    PATH_MAINTENANCE_CALENDAR,
    PATH_MAINTENANCE_LIST,
    PATH_MAINTENANCE_ADD,
    PATH_MAINTAIN, 
    PATH_PLANING,
    PATH_REPORTS,
    PATH_SCHEDULER_CALENDAR,
    PATH_MACHINE_SPLIT,
    PATH_TGSX,
    PATH_LSX,
    PATH_LOI,
    PATH_OEE,
    PATH_LIST_USERS,
    PATH_CREATE_USER,
    PATH_CHART_QUANTITY,
    PATH_BCSL,
    PATH_BDSL,
    PATH_DSLSX,

    PATH_CANONG01,
    PATH_TGSXCO01,
    PATH_LDMCO01,
    PATH_BCLSXCO01,
    PATH_BCOEE,

    PATH_CANONG02,
    PATH_TGSXC2,
    PATH_LDMC2,
    PATH_BCLSXC2,
    PATH_BCOEEC2,
    
    PATH_CANONG03,
    PATH_TGSXC3,
    PATH_LDMC3,
    PATH_BCLSXC3,
    PATH_BCOEEC3
    
} from "../constants";
import {PieChartOutlined,ScheduleOutlined,SettingOutlined,FileExcelOutlined, FireOutlined, BarChartOutlined,
    WarningOutlined,CarryOutOutlined, FieldTimeOutlined, OrderedListOutlined, SlackOutlined} from '@ant-design/icons'

const { Sider } = Layout;
const { SubMenu } = Menu;

class AdminSider  extends React.Component {

    getSubMenu() {
        let machine = this.props.selectedMachine;
        if (!machine) {
            return null;
        }
        return (
            <SubMenu title={<span><Icon type="hdd" /><span>{machine.name}</span></span>}>
                <Menu.Item key={PATH_MACHINE_DETAIL}>
                    <Link to={PATH_MACHINE_DETAIL}>
                        <Icon type="profile" />
                        <span>Chi tiết</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={PATH_MACHINE_ERROR_LIST}>
                    <Link to={PATH_MACHINE_ERROR_LIST}>
                        <Icon type="exclamation-circle" />
                        <span>Lịch sử lỗi</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={PATH_MACHINE_OUTPUT_LIST}>
                    <Link to={PATH_MACHINE_OUTPUT_LIST}>
                        <Icon type="rise" />
                        <span>Sản lượng</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    }

    render() {
        let subMenu = this.getSubMenu();
        return (
            <Sider theme={'light'}>
                <div className="profile">
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size={64}>
                                {this.props.currentUser.name}
                            </Avatar>
                        </div>
                        <div className="profile-usertitle">
                            <div className="profile-usertitle-job">
                                Giám Đốc | <Link to={PATH_LOGIN}>Thoát</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu theme="light" selectedKeys={[window.location.pathname]} mode="inline">
                   
                    <Menu.Item key={PATH_SCHEDULER_CALENDAR}>
                        <Link to={PATH_SCHEDULER_CALENDAR}>   
                            <ScheduleOutlined style={{fontSize:18}} />
                            <span>Lịch bảo trì</span>
                        </Link>
                    </Menu.Item>
                     <Menu.Item key={PATH_MACHINE_SPLIT}>
                        <Link to={PATH_MACHINE_SPLIT}>
                            <SettingOutlined style={{fontSize:18}} />
                            <span>MÁY XẢ BĂNG 01</span>
                        </Link>
                    </Menu.Item>
                   
                    <SubMenu  title={<span><FileExcelOutlined style={{fontSize:18}} /><span>Báo Cáo</span></span>}>
                        <Menu.Item key={PATH_OEE}>
                            <Link to={PATH_OEE}>
                                <PieChartOutlined style={{fontSize:18,color:'#00abff'}} />
                                <span>Biểu đồ OEE</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_BCSL}>
                            <Link to={PATH_BCSL}>
                                <FileExcelOutlined style={{fontSize:18,}}/>
                                <span>Báo cáo sản lượng</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_BDSL}>
                            <Link to={PATH_BDSL}>
                                <PieChartOutlined style={{fontSize:18}}/>
                                <span>Biểu đồ sản lượng</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_TGSX}>
                            <Link to={PATH_TGSX}>   
                                <FieldTimeOutlined style={{fontSize:18}}/>
                                <span>Thời Gian Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_LSX}>
                            <Link to={PATH_LSX}>
                                <CarryOutOutlined style={{fontSize:18}}/>
                                <span>Lệnh Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_LOI}>
                            <Link to={PATH_LOI}>
                                <WarningOutlined style={{fontSize:18,color:'red'}}/>
                                <span>Lỗi Dừng Máy</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    {/* <SubMenu  title={<span><FireOutlined style={{fontSize:18}} /><span>Quản lý Tài Khoản</span></span>}>
                    <Menu.Item key={PATH_LIST_USERS}>
                            <Link to={PATH_LIST_USERS}>   
                            <OrderedListOutlined />
                                <span>Danh sách Tài Khoản</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_CREATE_USER}>
                            <Link to={PATH_CREATE_USER}>
                            <SlackOutlined />
                                <span>Thêm Tài Khoản</span>
                            </Link>
                        </Menu.Item>

                        </SubMenu>
                        <Menu.Item key={PATH_DSLSX}>
                            <Link to={PATH_DSLSX}>   
                            <OrderedListOutlined />
                                <span>Danh sách lệnh sản xuất</span>
                            </Link>
                        </Menu.Item> */}

                        <Menu.Item key={PATH_CANONG01}>
                        <Link to={PATH_CANONG01}>
                            <SettingOutlined style={{fontSize:18}} />
                            <span>MÁY ONYZG32</span>
                        </Link>
                        </Menu.Item>

                        <SubMenu  title={<span><FileExcelOutlined style={{fontSize:18}} /><span>Báo Cáo</span></span>}>
                        <Menu.Item key={PATH_BCOEE}>
                            <Link to={PATH_BCOEE}>
                                <PieChartOutlined style={{fontSize:18,color:'#00abff'}} />
                                <span>Biểu đồ OEE</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_TGSXCO01}>
                            <Link to={PATH_TGSXCO01}>   
                                <FieldTimeOutlined style={{fontSize:18}}/>
                                <span>Thời Gian Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_LDMCO01}>
                            <Link to={PATH_LDMCO01}>   
                                <WarningOutlined  style={{fontSize:18,color:'red'}}/>
                                <span>Lỗi Dừng Máy</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_BCLSXCO01}>
                            <Link to={PATH_BCLSXCO01}>
                                <CarryOutOutlined style={{fontSize:18}}/>
                                <span>Lệnh Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        </SubMenu>

                        <Menu.Item key={PATH_CANONG02}>
                        <Link to={PATH_CANONG02}>
                            <SettingOutlined style={{fontSize:18}} />
                            <span>MÁY ONYZG50</span>
                        </Link>
                        </Menu.Item>

                        <SubMenu  title={<span><FileExcelOutlined style={{fontSize:18}} /><span>Báo Cáo</span></span>}>
                        <Menu.Item key={PATH_BCOEEC2}>
                            <Link to={PATH_BCOEEC2}>
                                <PieChartOutlined style={{fontSize:18,color:'#00abff'}} />
                                <span>Biểu đồ OEE</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_TGSXC2}>
                            <Link to={PATH_TGSXC2}>   
                                <FieldTimeOutlined style={{fontSize:18}}/>
                                <span>Thời Gian Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_LDMC2}>
                            <Link to={PATH_LDMC2}>   
                                <WarningOutlined  style={{fontSize:18,color:'red'}}/>
                                <span>Lỗi Dừng Máy</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_BCLSXC2}>
                            <Link to={PATH_BCLSXC2}>
                                <CarryOutOutlined style={{fontSize:18}}/>
                                <span>Lệnh Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        </SubMenu>

                        <Menu.Item key={PATH_CANONG03}>
                        <Link to={PATH_CANONG03}>
                            <SettingOutlined style={{fontSize:18}} />
                            <span>MÁY OHKZG76</span>
                        </Link>
                        </Menu.Item>
                        <SubMenu  title={<span><FileExcelOutlined style={{fontSize:18}} /><span>Báo Cáo</span></span>}>
                        <Menu.Item key={PATH_BCOEEC3}>
                            <Link to={PATH_BCOEEC3}>
                                <PieChartOutlined style={{fontSize:18,color:'#00abff'}} />
                                <span>Biểu đồ OEE</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_TGSXC3}>
                            <Link to={PATH_TGSXC3}>   
                                <FieldTimeOutlined style={{fontSize:18}}/>
                                <span>Thời Gian Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_LDMC3}>
                            <Link to={PATH_LDMC3}>   
                                <WarningOutlined  style={{fontSize:18,color:'red'}}/>
                                <span>Lỗi Dừng Máy</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={PATH_BCLSXC3}>
                            <Link to={PATH_BCLSXC3}>
                                <CarryOutOutlined style={{fontSize:18}}/>
                                <span>Lệnh Sản Xuất</span>
                            </Link>
                        </Menu.Item>
                        </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default AdminSider;
