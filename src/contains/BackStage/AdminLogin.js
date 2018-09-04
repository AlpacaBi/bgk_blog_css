import React from 'react'


import {Button,FormGroup,FormControl,Col,Form,Row } from 'react-bootstrap'
import pic_admin from '../../images/admin.jpg'
import forge from "node-forge";




export default class AdminLogin extends React.Component{



    login=()=>{
        let admin_username = this.admin_username.value;

        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+this.admin_password.value+'岂因祸福避趋之')
        let admin_password=md.digest().toHex()


        let url = "/apis/adminlogin";//接口地址
        let data = 'username=' + admin_username + '&password=' +admin_password;
        fetch(url, {method: "POST",
            credentials: 'include',
            headers:{'Content-Type': 'application/x-www-form-urlencoded',},
            body: data})
            .then(
                this.props.getAdminLoginState
            )
    }



    render(){


        return(
            <div>
                <br/><br/>

                <Row>
                    <Col smOffset={4} sm={2} >
                        <img height={300} width={450} alt='admin_pic' src={pic_admin}/>
                    </Col>
                </Row>

                <Row>
                    <Col smOffset={2} sm={8} >
                <form>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">

                            <Col sm={4} smOffset={4}>
                                用户名：<FormControl type="text"
                                                 placeholder="请输入管理员账号"
                                                 inputRef={ref => {this.admin_username=ref;}}
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">

                            <Col sm={4} smOffset={4}>
                                密码：<FormControl type="password"
                                                placeholder="请输入密码"
                                                inputRef={ref => {this.admin_password=ref;}}
                            />
                            </Col>
                        </FormGroup>


                        <FormGroup>
                            <Col smOffset={5} sm={2}>
                                <Button bsStyle="primary" onClick={()=>this.login()} block>
                                    登录
                                </Button>
                            </Col>

                        </FormGroup>
                    </Form>
                </form>
                    </Col>
                </Row>
            </div>
        )




    }

}