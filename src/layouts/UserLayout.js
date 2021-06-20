import React from "react";
import {Layout} from "antd";
import {Route, Switch} from "react-router-dom";
import {
    PATH_MACHINE_ERROR_LIST,
    PATH_MACHINE_OUTPUT_LIST, PATH_MAINTAIN,
    PATH_PLANING,
    PATH_ROOT,
    PATH_USER_PROFILE,    
    PATH_MACHINE_SPLIT,
    PATH_SCHEDULER_CALENDAR
} from "../constants";
import Profile from "../components/users/Profile";
import MachineDetail from "../components/machines/MachineDetail";
import MachineHistoryErrorList from "../components/machines/history/MachineHistoryErrorList";
import MachineValueList from "../components/machines/value/MachineValueList";
import NotFound from "../components/errors/NotFound";
import UserSider from "./UserSider";
import PlanList from "../components/machines/plan/PlanList";
import MaintainList from "../components/machines/maintain/MaintainList";
import {managed} from '../services/MachineService';
import SplitHome from "../components/machinesplit/Home";
import SchedulerCalendar from "../components/maintenance/SchedulerCalendar";

class UserLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMachine: {
                id: null,
                name: null
            }
        }
    }

    componentDidMount() {
        managed().then(selectedMachine => {
            this.setState({selectedMachine})
        })
    }


    render() {
        return (
            <Layout>
                <UserSider currentUser={this.props.currentUser} selectedMachine={this.state.selectedMachine}/>
                <Layout>
                    <Layout.Content style={{ margin: '24px 16px', padding: 10, background: '#fff', minHeight: '100vh', }}>
                        <Switch>
                            <Route exact path={PATH_USER_PROFILE} component={Profile} />
                            {/* <Route exact path={PATH_ROOT} render={() => <MachineDetail selectedMachine={this.state.selectedMachine}/>} /> */}
                            <Route exact path={PATH_ROOT} component={SplitHome}/>
                            <Route exact path={PATH_MACHINE_ERROR_LIST} render={() => <MachineHistoryErrorList selectedMachine={this.state.selectedMachine}/>}/>
                            <Route exact path={PATH_MACHINE_OUTPUT_LIST} component={MachineValueList}/>
                            <Route exact path={PATH_PLANING} component={PlanList}/>
                            <Route exact path={PATH_MAINTAIN} component={MaintainList}/>
                            <Route exact path={PATH_MACHINE_SPLIT} component={SplitHome}/>
                            <Route exact path={PATH_SCHEDULER_CALENDAR} component={SchedulerCalendar}/>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}

export default UserLayout;