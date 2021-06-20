import React, {Component} from "react";
import {Button, Form, Input, Spin} from "antd";
import {ACCESS_TOKEN} from "../../constants";
import '../../styles/Login.css'
import {login} from "../../services/UserService";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false}
        this.handleLogin = this.props.loadCurrentUser.bind(this);
    }

    componentDidMount() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.props.resetAuth();
    }
    
    handleSubmit=(event) =>{
        this.setState({loading: true})       
        const loginRequest = Object.assign({}, event);
        console.log(loginRequest)
        login(loginRequest)
            .then(() => {
                this.handleLogin();
                this.setState({loading: false})
            }).finally(() => this.setState({loading: false}));
    }

    render() {      
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 20,
            },
        };
        console.log()
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <Form {...layout}  onFinish={this.handleSubmit} className="login-form">
                    <Form.Item
                        name="usernameOrEmail"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your username or email!'
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or email" />
                  
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Password!'
                            },
                        ]}
                    >
                   
                         <Input
                                prefix={<LockOutlined />}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Password"  />
                    </Form.Item>
                    <Form.Item>
                        <Spin spinning={this.state.loading}>
                            <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                        </Spin>

                    </Form.Item>
                </Form>
                </div>
            </div>
        );
    }
}

// class LoginForm extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {loading: false}
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(event) {
//         this.setState({loading: true})
//         event.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (err) {
//                 this.setState({loading: false})
//                 return
//             }
//             const loginRequest = Object.assign({}, values);
//             login(loginRequest)
//                 .then(() => {
//                     this.props.handleLogin();
//                     this.setState({loading: false})
//                 }).finally(() => this.setState({loading: false}));
//         });
//     }

//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form onSubmit={this.handleSubmit} className="login-form">
//                 <FormItem>
//                     {getFieldDecorator('usernameOrEmail', {
//                         rules: [{ required: true, message: 'Please input your username or email!' }],
//                     })(
//                         <Input
//                             prefix={<Icon type="user" />}
//                             size="large"
//                             name="usernameOrEmail"
//                             placeholder="Username or email" />
//                     )}
//                 </FormItem>
//                 <FormItem>
//                     {getFieldDecorator('password', {
//                         rules: [{ required: true, message: 'Please input your Password!' }],
//                     })(
//                         <Input
//                             prefix={<Icon type="lock" />}
//                             size="large"
//                             name="password"
//                             type="password"
//                             placeholder="Password"  />
//                     )}
//                 </FormItem>
//                 <FormItem>
//                     <Spin spinning={this.state.loading}>
//                         <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
//                     </Spin>

//                 </FormItem>
//             </Form>
//         );
//     }
// }

export default Login;