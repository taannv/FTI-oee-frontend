import React from "react";
import {Layout, Menu} from "antd";
import ProfileDropdownMenu from "../components/users/ProfileDropdownMenu";

import '../styles/AppHeader.css'

const {Header} = Layout;

const AppHeader = (props) => (
    <Header style={{ background: '#fff', padding: 0 }}>
        <Menu className="app-menu" mode="horizontal" selectedKeys={['/']} style={{ lineHeight: '64px' }} >
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu currentUser={props.currentUser}/>
            </Menu.Item>
        </Menu>
    </Header>
);

export default AppHeader;