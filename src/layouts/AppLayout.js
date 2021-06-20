import React from "react";
import Profile from "../components/users/Profile";
import {
    PATH_MACHINE_DETAIL,
    PATH_MACHINE_ERROR_LIST,
    PATH_MACHINE_LIST,
    PATH_MACHINE_OUTPUT_LIST,
    PATH_USER_PROFILE
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
import LoadingIndicator from "../components/LoadingIndicator";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

const { Content } = Layout;

class AppLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadCurrentUser();
    }

    render() {
        if (this.props.loading) {
            return <LoadingIndicator/>
        }
        console.log(this.props.currentUser.roles);
        if (this.props.currentUser.roles.includes("ROLE_ADMIN")) {
            return <AdminLayout currentUser={this.props.currentUser} />
        }
        return <UserLayout currentUser={this.props.currentUser} />

    }
}

export default AppLayout;
