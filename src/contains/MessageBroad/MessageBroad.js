
import React from 'react'
import {Row,Col,Media,Image,Button,FormGroup,Form,FormControl,Modal,ControlLabel} from 'react-bootstrap'
import forge from 'node-forge'


import pic_touxiang from '../../images/touxiang.png'
import pic_who from '../../images/who.jpg'
import alpaca1 from '../../images/avatar/alpaca1.png'
import alpaca2 from '../../images/avatar/alpaca2.png'
import alpaca3 from '../../images/avatar/alpaca3.png'
import alpaca4 from '../../images/avatar/alpaca4.png'
import alpaca5 from '../../images/avatar/alpaca5.png'
import alpaca6 from '../../images/avatar/alpaca6.png'





export default class MessageBroad extends React.Component{

    constructor(){
        super();
        this.state=({
            loginFlag:false,
            regShow: false,
            messageShow:false,
            infoShow:false,
            value:'',
            avatar_select:alpaca1,
            user_data:[],
            user_avatar:alpaca1,
            message_data:[],

        })
    }

    componentDidMount(){

        this.getMessageList();
        this.getUserLoginState();

    }





    getMessageList=()=>{
        fetch('/apis/getMessage',
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{

            this.setState({
                message_data:eval(json)
            })

            })

    }

    getUserLoginState=()=>{
        fetch('/apis/getUserLogin',
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{

            if(json=='unLogin'){

                this.setState({ loginFlag:false })
            }

            else{
                this.setState({
                    user_data:eval(json),
                    loginFlag:true
                })

            }

        }).then(()=>this.getMessageList())


    }





    reqClose=()=>{this.setState({ regShow: false });}
    reqOpen=()=>{this.setState({ regShow: true });}

    messageClose=()=>{this.setState({ messageShow: false });}
    messageOpen=()=>{this.setState({ messageShow: true });}

    infoClose=()=>{
        this.getUserLoginState()
        this.setState({ infoShow: false });
    }
    infoOpen=()=>{this.setState({ infoShow: true });}






    getValidationState=()=> {
        const length = this.state.value.length;
        if (length >= 0&&length<=100) return 'success';
        else return 'error';
    }

    handleChange=(e)=> {
        this.setState({ value: e.target.value });
    }


    getAvator=(avatorString)=>{
        let avator
        switch(avatorString){
            case 'alpaca1':avator=alpaca1;break;
            case 'alpaca2':avator=alpaca2;break;
            case 'alpaca3':avator=alpaca3;break;
            case 'alpaca4':avator=alpaca4;break;
            case 'alpaca5':avator=alpaca5;break;
            case 'alpaca6':avator=alpaca6;break;
            case 'pic_touxiang':avator=pic_touxiang;break;
        }


        return avator
    }

    selectChange=()=>{

        let avatar=this.avatar.value

        switch(avatar){
            case 'alpaca1':this.setState({ avatar_select:alpaca1});break;
            case 'alpaca2':this.setState({ avatar_select:alpaca2});break;
            case 'alpaca3':this.setState({ avatar_select:alpaca3});break;
            case 'alpaca4':this.setState({ avatar_select:alpaca4});break;
            case 'alpaca5':this.setState({ avatar_select:alpaca5});break;
            case 'alpaca6':this.setState({ avatar_select:alpaca6});break;
        }



    }

    selectChangeccc=()=>{

        let avatar=this.userChange_avatar.value

        switch(avatar){
            case 'alpaca1':this.setState({ user_avatar:alpaca1});break;
            case 'alpaca2':this.setState({ user_avatar:alpaca2});break;
            case 'alpaca3':this.setState({ user_avatar:alpaca3});break;
            case 'alpaca4':this.setState({ user_avatar:alpaca4});break;
            case 'alpaca5':this.setState({ user_avatar:alpaca5});break;
            case 'alpaca6':this.setState({ user_avatar:alpaca6});break;
        }

        //this.setState({ avatar_select: eval(avatar) });

    }


/**************************发表新留言**************************************************************/
    publishMessage=()=>{
        let userID=this.state.user_data[0].ID
        let username=this.state.user_data[0].username
        let avatar=this.state.user_data[0].avatar
        let message=this.message.value
        message=encodeURIComponent(message)

        let url = "/apis/pushMessage";//接口地址
        let data = 'userID=' + userID + '&username=' + username+'&avatar=' + avatar+'&message=' + message;



        fetch(url, {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(()=>{
            alert('发表成功！！')
        }).then(this.messageClose).then(this.getMessageList)
    }


/**************************用户注册**************************************************************/
    userReg=()=>{

        let avatar=this.avatar.value
        let signature=this.user_signature.value
        let username=this.user_username.value
        let email=this.user_email.value

        //前端表单数据发送前给用户密码加md5处理
        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+this.user_password.value+'岂因祸福避趋之')
        let password=md.digest().toHex()



        let url = "/apis/userReg";//接口地址
        let data = 'avatar=' + avatar + '&username=' + username+'&email=' + email+'&password=' + password+'&signature=' + signature;
        fetch(url, {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(()=>{
            alert('注册成功！！')
        }).then(this.reqClose)

    }

/**************************用户登陆**************************************************************/
    login=()=>{


        let username=this.login_username.value



        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+this.login_password.value+'岂因祸福避趋之')
        let password=md.digest().toHex()


        let url = "/apis/userLogin";//接口地址
        let data = 'username=' + username+'&password=' + password;
        fetch(url, {
            method: "POST",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(()=>{
            alert('登陆成功！！')
        }).then(
            this.getUserLoginState
        )
    }


/**************************用户注销**************************************************************/
    logout=()=>{

        fetch('/apis/userLogOut',
            {
                method: "GET",
                credentials: 'include',
            }).then(()=> {
                alert('您已注销')
            }
        ).then(
            this.getUserLoginState
        )

    }


/**************************更改用户信息**************************************************************/
    updateUserInfo=()=>{
        let id=this.state.user_data[0].ID
        let avatar=this.userChange_avatar.value
        let signature=this.userChange_signature.value
        let username=this.userChange_username.value



        let url = "/apis/updateUserInfo";//接口地址
        let data = '&id=' + id +'&avatar=' + avatar + '&username=' + username +'&signature=' + signature;


        fetch(url, {
            method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(()=>{
            alert('更改成功！！')
        }).then(this.infoClose).then(this.getUserLoginState)

    }






    render(){


        return(

            <div>
                <Row>
                    <Col smOffset={1}> <h1>个人动态&&交流区：</h1></Col>
                </Row>

                <hr/>


                <Row>

                    <Col smOffset={1} sm={2}>

                        {this.state.loginFlag?
                            <div>
                                <Image src={this.getAvator(this.state.user_data[0].avatar)} circle responsive />
                                <h2>{this.state.user_data[0].username}</h2>
                                <h4>{this.state.user_data[0].email}</h4>
                                <h5 style={{color:'grey'}}>{this.state.user_data[0].signature}</h5>
                                <Button id={'wirtemessage'} bsStyle="primary" block onClick={this.messageOpen}>
                                    写留言
                                </Button>
                                <Button bsStyle="info" block onClick={this.infoOpen}>
                                    更改个人信息
                                </Button>
                                <Button id={'logout'} bsStyle="danger" block onClick={this.logout}>
                                    注销
                                </Button>
                            </div>:
                            <div>
                                <Image src={pic_who} rounded responsive />

                                <br/>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalEmail">

                                        <FormControl type="text"
                                                     placeholder="请输入用户名"
                                                     inputRef={ref => {this.login_username=ref;}}
                                        />

                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalPassword">

                                        <FormControl type="password"
                                                     placeholder="请输入密码"
                                                     inputRef={ref => {this.login_password=ref;}}
                                        />

                                    </FormGroup>
                                    <FormGroup>
                                        <Button bsStyle="primary" block onClick={this.login}>
                                            登陆
                                        </Button>
                                    </FormGroup>
                                </Form>
                                <br/>
                                <a id={"reg"} onClick={this.reqOpen}>没有账号？点此注册</a>
                            </div>}

                    </Col>




                    <Col smOffset={1} sm={7}>
                        <div>

                            {this.state.message_data.length>0?this.state.message_data.map((item,index)=>(
                            <Media>
                                <Media.Left>
                                    <Image width={64} height={64} src={this.getAvator(item.user_avatar)} rounded />
                                </Media.Left>
                                <Media.Body>
                                    <Media.Heading>{item.user_name}：</Media.Heading>
                                    <p>{item.message}</p>
                                    <small style={{color:'grey'}}>发表于：{item.push_time}</small><hr/>
                                </Media.Body>
                            </Media>)):(<div>加载中</div>)}



                        </div>



                    </Col>


                </Row>





                <Modal show={this.state.regShow} onHide={this.reqClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>注册：</Modal.Title>
                    </Modal.Header>
                    <Row>
                    <Modal.Body>
                        <Col smOffset={2} sm={8}>
                        <form>
                            <Form horizontal>

                                <Image width={64} height={64} src={this.state.avatar_select} rounded />
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>请选择头像</ControlLabel>
                                    <FormControl componentClass="select"
                                                 placeholder="select"
                                                 inputRef={ref => {this.avatar=ref;}}
                                                 onChange={this.selectChange}
                                    >
                                        <option value="alpaca1">alpaca1 </option>
                                        <option value="alpaca2">alpaca2</option>
                                        <option value="alpaca3">alpaca3</option>
                                        <option value="alpaca4">alpaca4</option>
                                        <option value="alpaca5">alpaca5</option>
                                        <option value="alpaca6">alpaca6</option>
                                    </FormControl>
                                </FormGroup>


                                <FormGroup controlId="formHorizontalText">
                                        请输入用户名：
                                    <FormControl type="text"
                                                 inputRef={ref => {this.user_username=ref;}}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                        请输入密码：
                                    <FormControl type="password"
                                                 inputRef={ref => {this.user_password=ref;}}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formHorizontalEmail">
                                        请输入您的邮件：（注意：以后邮件不可修改）
                                    <FormControl type="email"
                                                 inputRef={ref => {this.user_email=ref;}}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formHorizontalText">
                                        个性签名：<FormControl type="text"
                                                inputRef={ref => {this.user_signature=ref;}}
                                    />
                                </FormGroup>



                                <FormGroup>
                                        <Button bsStyle="primary"  block onClick={this.userReg}>
                                            注册
                                        </Button>
                                </FormGroup>

                            </Form>
                        </form>
                        </Col>
                    </Modal.Body>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={this.reqClose}>取消</Button>
                    </Modal.Footer>
                </Modal>



                <Modal show={this.state.messageShow} onHide={this.messageClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>留言</Modal.Title>
                    </Modal.Header>
                    <Row>
                        <Modal.Body>
                            <Col smOffset={2} sm={8}>
                                <form>
                                    <Form horizontal>

                                        <FormGroup controlId="formControlsTextarea" validationState={this.getValidationState()}>
                                            <ControlLabel>正文</ControlLabel>
                                            <FormControl style={{height:200}}
                                                         componentClass="textarea"
                                                         placeholder="150字以内"
                                                         value={this.state.value}
                                                         onChange={this.handleChange}
                                                         inputRef={ref => {this.message=ref;}}
                                                         id={"textarea"}
                                            />
                                        </FormGroup>


                                        <FormGroup>
                                            <Button id={"publish"} bsStyle="primary" onClick={()=>this.publishMessage()} block>
                                                发布
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </form>
                            </Col>
                        </Modal.Body>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={this.messageClose}>取消</Button>
                    </Modal.Footer>
                </Modal>


                   {this.state.user_data.length>0?
                   (<Modal show={this.state.infoShow} onHide={this.infoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>更改信息：</Modal.Title>
                    </Modal.Header>
                    <Row>
                        <Modal.Body>
                            <Col smOffset={2} sm={8}>
                                <form>
                                    <Form horizontal>

                                        <Image width={64} height={64} src={this.state.user_avatar} rounded />
                                        <FormGroup controlId="formControlsSelect">
                                            <ControlLabel>请更改头像</ControlLabel>
                                            <FormControl componentClass="select"
                                                         placeholder="select"
                                                         value={this.state.user_data[0].avatar}
                                                         inputRef={ref => {this.userChange_avatar=ref;}}

                                                         onChange={(e) => {
                                                             this.selectChangeccc()
                                                             let datas=this.state.user_data;
                                                             datas[0].avatar=e.target.value;
                                                             this.setState({user_data:datas});
                                                         }}
                                            >
                                                <option value="alpaca1">alpaca1 </option>
                                                <option value="alpaca2">alpaca2</option>
                                                <option value="alpaca3">alpaca3</option>
                                                <option value="alpaca4">alpaca4</option>
                                                <option value="alpaca5">alpaca5</option>
                                                <option value="alpaca6">alpaca6</option>
                                            </FormControl>
                                        </FormGroup>


                                        <FormGroup controlId="formHorizontalText">
                                            更改用户名：
                                            <FormControl type="text"
                                                         inputRef={ref => {this.userChange_username=ref;}}
                                                         value={this.state.user_data[0].username}
                                                         onChange={(e) => {
                                                             let datas=this.state.user_data;
                                                             datas[0].username=e.target.value;
                                                             this.setState({user_data:datas});
                                                         }}
                                            />
                                        </FormGroup>


                                        <FormGroup controlId="formHorizontalText">
                                            更改个性签名：<FormControl type="text"
                                                              inputRef={ref => {this.userChange_signature=ref;}}
                                                                value={this.state.user_data[0].signature}
                                                                onChange={(e) => {
                                                                    let datas=this.state.user_data;
                                                                    datas[0].signature=e.target.value;
                                                                    this.setState({user_data:datas});
                                                                }}
                                        />
                                        </FormGroup>




                                        <FormGroup>
                                            <Button bsStyle="primary"  block onClick={this.updateUserInfo}>
                                                确认更改
                                            </Button>
                                        </FormGroup>

                                    </Form>
                                </form>
                            </Col>
                        </Modal.Body>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={this.infoClose}>取消</Button>
                    </Modal.Footer>
                   </Modal>):(<div></div>)}


            </div>

        )
    }

}