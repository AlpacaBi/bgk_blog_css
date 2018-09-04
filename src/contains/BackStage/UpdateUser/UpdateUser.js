import React from 'react'
import {Button,Col,Table,Modal,Form,FormGroup,FormControl,Row} from 'react-bootstrap'
import forge from "node-forge";

export default class UpdateUser extends React.Component{

    constructor(){
        super();
        this.state=({
            data:[],
            smShow: false,
            id:0
        })
    }

    componentDidMount(){
        this.getUserListData()
    }


    smClose = () => this.setState({ smShow: false });

    smOpen = (id) => {

        this.setState({ smShow: true ,id:id});

    }

    updatePassword=()=>{

        let id=this.state.id;

        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+this.password.value+'岂因祸福避趋之')
        let password=md.digest().toHex()

        let url = "/apis/updatePassword";//接口地址

        let data = 'id=' + id + '&password=' + password;
        fetch(url, {method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(
            ()=>{alert('重置成功！！')}
        ).then(this.smClose)

    }



    delUser=(delid)=>{

        let id = delid;
        let dataid = 'id=' + id;
        fetch('/apis/delUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataid
        }).then(()=> {
            this.getUserListData()
        }, function (error) {
            console.log(error)
        });

        this.getUserListData()
    }


    getUserListData=()=>{
        fetch('/apis/getUserList',
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                data:eval(json)
            })
        })

    }


    render(){
        return(
            <div>
                <Col smOffset={1}>


                    <h1>管理用户:</h1>
                    <hr/>

                    <Table responsive>

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>用户名</th>
                            <th>用户邮箱</th>
                            <th>操作</th>
                        </tr>
                        </thead>



                        <tbody>
                        {this.state.data.length>0?this.state.data.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button bsStyle="info"
                                            onClick={()=>this.smOpen(item.ID)}>重置密码
                                    </Button>

                                    <Button bsStyle="danger"
                                            onClick={()=>this.delUser(item.ID)}>删除
                                    </Button>
                                </td>
                            </tr>
                        )):<div><h2>读取中</h2></div>}
                        </tbody>
                    </Table>
                </Col>



                <Modal  show={this.state.smShow} onHide={this.smClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>重置密码</Modal.Title>
                    </Modal.Header>
                    <Row>
                    <Modal.Body>
                        <Col smOffset={2} sm={8}>
                        <form>
                            <Form horizontal>

                                <FormGroup controlId="formHorizontalPassword">
                                    请输入要重置的密码：
                                    <FormControl type="password"
                                                 inputRef={ref => {this.password=ref;}}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Button bsStyle="primary"  block onClick={this.updatePassword}>
                                        重置
                                    </Button>
                                </FormGroup>

                            </Form>
                        </form>
                        </Col>


                    </Modal.Body>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={this.smClose}>取消</Button>
                    </Modal.Footer>
                </Modal>




            </div>
        )
    }

}