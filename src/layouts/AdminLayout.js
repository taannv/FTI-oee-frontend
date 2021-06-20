import React from "react";
import Profile from "../components/users/Profile";
import {
    PATH_MACHINE_DETAIL,
    PATH_MACHINE_ERROR_LIST,
    PATH_MACHINE_OUTPUT_LIST, PATH_MAINTAIN, PATH_PLANING,
    PATH_ROOT,
    PATH_USER_PROFILE,
    PATH_MAINTENANCE_LIST,
    PATH_MAINTENANCE_ADD,
    PATH_REPORTS,
    PATH_VOLTAGE,
    PATH_TGSX,
    PATH_LSX,
    PATH_LOI,
    PATH_MACHINE_SPLIT,
    PATH_OEE,
    PATH_SCHEDULER_CALENDAR,
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
    PATH_BCOEEC3,


} from "../constants";
import MachineDetail from "../components/machines/MachineDetail";
import NotFound from "../components/errors/NotFound";
import AdminSider from "./AdminSider";
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import MachineList from "../components/machines/MachineList";
import '../styles/AppLayout.css'
import MachineHistoryErrorList from "../components/machines/history/MachineHistoryErrorList";
import MachineValueList from "../components/machines/value/MachineValueList";
import Maintenance from "../components/maintenance/MaintenanceList";
import Addmaintenance from "../components/maintenance/AddMaintenance";
import PlanList from "../components/machines/plan/PlanList";
import MaintainList from "../components/machines/maintain/MaintainList";
import MachineReports from "../components/reports/MachineReports";
import VoltList from "../components/voltage/VoltList";
import Thoigiansx from "../components/baocao/Thoigiansx";
import Lenhsx from "../components/baocao/Lenhsx";
import Loidungmay from "../components/baocao/Loidungmay";
import SplitHome from "../components/machinesplit/Home";
import ReportOEE from "../components/baocao/ReportOEE";
import SchedulerCalendar from "../components/maintenance/SchedulerCalendar";
import Listusers from "../components/users/ListUsers";
import CreateUser from "../components/users/CreateUser";
import ReportQuantity from "../components/baocao/ReportQuantity";
import Bieudosanluong from "../components/baocao/Bieudosanluong";
import Baocaosanluong from "../components/baocao/Baocaosanluong";
import Danhsachlenhsanxuat from "../components/baocao/Danhsachlenhsanxuat";
import CanOng01Home from "../components/canong01/CanOng01";
import ThoiGianSXCO01 from "../components/baocaocanong01/ThoiGianSXCO01";
import LoiDungMayCO01 from "../components/baocaocanong01/LoiDungMayCO01";
import BCLenhSXCO01 from "../components/baocaocanong01/BCLenhSXCO01";
import BaoCaoOEE from "../components/baocaocanong01/BaoCaoOEE";
import CanOng02Home from "../components/canong02/CanOng02";
import ThoiGianSXC2 from "../components/baocaocanong02/ThoiGianSXC2";
import LoiDungMayC2 from "../components/baocaocanong02/LoiDungMayC2";
import BCLenhSXC2 from "../components/baocaocanong02/BCLenhSXC2";
import BaoCaoOEEC2 from "../components/baocaocanong02/BaoCaoOEEC2";
import CanOng03Home from "../components/canong03/CanOng03";
import ThoiGianSXC3 from "../components/baocaocanong03/ThoiGianSXC3";
import LoiDungMayC3 from "../components/baocaocanong03/LoiDungMayC3";
import BCLenhSXC3 from "../components/baocaocanong03/BCLenhSXC3";
import BaoCaoOEEC3 from "../components/baocaocanong03/BaoCaoOEEC3";


class AdminLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMachine: null
        }
    }

        changeMachine = (selectedMachine) => {
        this.setState({selectedMachine})
    }

    render() {
        return (
            <Layout>
                <AdminSider currentUser={this.props.currentUser} selectedMachine={this.state.selectedMachine}/>
                <Layout>
                    <Layout.Content style={{ margin: '24px 16px', padding: 10, background: '#fff', minHeight: '100vh', }}>
                        <Switch>
                            <Route exact path={PATH_USER_PROFILE} component={Profile} />
                            <Route exact path={PATH_ROOT} component={SplitHome}/> {/* render={() => <MachineList changeMachine={this.changeMachine}/>}/> */}
                            <Route exact path={PATH_MACHINE_DETAIL} render={() => <MachineDetail selectedMachine={this.state.selectedMachine}/>} />
                            <Route exact path={PATH_MACHINE_ERROR_LIST} render={() => <MachineHistoryErrorList selectedMachine={this.state.selectedMachine}/>}/>
                            <Route exact path={PATH_MACHINE_OUTPUT_LIST} component={MachineValueList}/>
                            <Route exact path={PATH_SCHEDULER_CALENDAR} component={SchedulerCalendar}/>
                            <Route exact path={PATH_MAINTENANCE_LIST} component={Maintenance}/>
                            <Route exact path={PATH_MAINTENANCE_ADD} component={Addmaintenance}/>
                            <Route exact path={PATH_PLANING} component={PlanList}/>
                            <Route exact path={PATH_REPORTS} component={MachineReports}/>
                            <Route exact path={PATH_MAINTAIN} component={MaintainList}/>
                            <Route exact path={PATH_MAINTENANCE_LIST} component={Maintenance}/>
                            <Route exact path={PATH_VOLTAGE} component={VoltList}/>   
                            <Route exact path={PATH_TGSX} component={Thoigiansx}/>
                            <Route exact path={PATH_LSX} component={Lenhsx}/>
                            <Route exact path={PATH_LOI} component={Loidungmay}/>          
                            <Route exact path={PATH_MACHINE_SPLIT} component={SplitHome}/>          
                            <Route exact path={PATH_OEE} component={ReportOEE}/>  
                            {/* <Route exact path={PATH_LIST_USERS} component={Listusers}/>  */}
                            {/* <Route exact path={PATH_CREATE_USER} component={CreateUser}/>  */}
                            <Route exact path={PATH_CHART_QUANTITY} component={ReportQuantity}/>
                            <Route exact path={PATH_BCSL} component={Baocaosanluong}/>  
                            <Route exact path={PATH_BDSL} component={Bieudosanluong}/>
                            <Route exact path={PATH_DSLSX} component={Danhsachlenhsanxuat}/>

                            <Route exact path={PATH_CANONG01} component={CanOng01Home}/>
                            <Route exact path={PATH_TGSXCO01} component={ThoiGianSXCO01}/>
                            <Route exact path={PATH_LDMCO01} component={LoiDungMayCO01}/>
                            <Route exact path={PATH_BCLSXCO01} component={BCLenhSXCO01}/>
                            <Route exact path={PATH_BCOEE} component={BaoCaoOEE}/>

                            <Route exact path={PATH_CANONG02} component={CanOng02Home}/>
                            <Route exact path={PATH_TGSXC2} component={ThoiGianSXC2}/>
                            <Route exact path={PATH_LDMC2} component={LoiDungMayC2}/>
                            <Route exact path={PATH_BCLSXC2} component={BCLenhSXC2}/>
                            <Route exact path={PATH_BCOEEC2} component={BaoCaoOEEC2}/>

                            <Route exact path={PATH_CANONG03} component={CanOng03Home}/>
                            <Route exact path={PATH_TGSXC3} component={ThoiGianSXC3}/>
                            <Route exact path={PATH_LDMC3} component={LoiDungMayC3}/>
                            <Route exact path={PATH_BCLSXC3} component={BCLenhSXC3}/>
                            <Route exact path={PATH_BCOEEC3} component={BaoCaoOEEC3}/>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}

export default AdminLayout;
