import React from "react";
import {Button, Form, Input,Row, Col,Card,Radio} from "antd";
import {createUser} from "../../services/UserService";
import {ROLE} from '../../constants';


class CreateUser extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:{},
            loading: false,
            role:ROLE.ROLE_USE,
        }
    }

    componentDidMount(){
        try{
            const { user } = this.props.location.state;
            this.setState({user});
        }catch(e){}
    }
    // componentDidMount(){
    //     const user = this.props.user;
    //     if(Object.keys(user).length > 0)
    //         this.props.form.setFieldsValue({
    //             ['name']:user.name,
    //             ['email']:user.email,
    //             ['username']:user.username,
    //             ['password']:user.password,
    //         })
    //     else
    //         console.log("user null");
    // }
    handleSubmit = (event) => {
        this.setState({loading: true})
        // this.props.form.validateFields((err, fieldsValue) => {
        //     if (err) {
        //         this.setState({loading: false});
        //         return;
        //     }
        
        delete event.confirm
        const signUpRequest = Object.assign({}, event);
        console.log(signUpRequest);
        // createUser(signUpRequest).then((success) => {
        //     console.log(success);
        //     // this.props.handleLogin();
        //     // this.setState({loading: false})
        // }).finally(() => this.setState({loading: false}));
    };
    _handleUpdate=(e)=>{
        window.confirm('Are you sure to update this record?');
    }
    
    render(){       
      // const WrappedForm = Form.create()(Createusers);
       const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    
        return(
            <Card title="Thêm Tài Khoản" bordered={false}>
                <Form {...formItemLayout} onFinish={Object.keys(this.state.user).length===0?this.handleSubmit:this._handleUpdate}>
                 <Row gutter={10}>                   
                    <Col span={12}>   
                        <Form.Item
                        name="name"
                        label="Tên"
                        rules={[
                            {
                            required: true,
                            message:'Please input your Name!'
                            },
                        ]}><Input />
                    </Form.Item>
                    </Col>
                    <br/>
                    <br/>
                        <Radio.Group name="role" value={this.state.role} onChange={e=>this.setState({role:e.target.value})}>
                            <Radio value={ROLE.ROLE_ADMIN}>Admin</Radio>
                            <Radio value={ROLE.ROLE_USE}>User</Radio>
                        </Radio.Group>
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                    <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        >
                        <Input />
                    </Form.Item>

                    </Col>
                </Row>
                <Row gutter={10}>                   
                    <Col span={12}>   
                            <Form.Item
                                    name="username"
                                    label="Tên đăng nhập"
                                    rules={[
                                        {
                                        required: true,
                                        message:'Please input your User!'
                                        },
                                    ]}
                                >
                            <Input />
                            </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Nhập lại mật khẩu"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                   </Col>
                </Row> 
                <Form.Item>
                <Row gutter={10}>
                    <Col span={12}>
                        {Object.keys(this.state.user).length===0?
                        (<Button type="primary" htmlType="submit" loading={this.state.loading} >
                            Tạo tài khoản
                        </Button>):(<Button type="primary" htmlType="submit" loading={this.state.loading}  >
                            Cập nhật
                        </Button>)}
                    </Col>
                </Row>
                </Form.Item> 
            </Form>
            </Card>
        )
    }
}

export default CreateUser;