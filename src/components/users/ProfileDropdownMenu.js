import React, {Component} from "react";
import {Dropdown, Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import {PATH_LOGIN} from "../../constants";

class ProfileDropdownMenu extends Component {

    constructor(props) {
        super(props);
    }

    getDropdownMenu() {
        return (
            <Menu className="profile-dropdown-menu">
                <Menu.Item key="user-info" className="dropdown-item" disabled>
                    <div className="user-full-name-info">
                        {this.props.currentUser.name}
                    </div>
                    <div className="username-info">
                        @{this.props.currentUser.username}
                    </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" className="dropdown-item">
                    <Link to={PATH_LOGIN}>Logout</Link>
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        const dropdownMenu = this.getDropdownMenu();
        return (
            <Dropdown
                overlay={dropdownMenu}
                trigger={['click']}
                getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
                <a className="ant-dropdown-link" href={"/"}>
                    <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
                </a>
            </Dropdown>
        );
    }
}

export default ProfileDropdownMenu;