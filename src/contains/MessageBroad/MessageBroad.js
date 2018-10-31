
import React from 'react'
import Modal from 'react-modal';
import forge from 'node-forge'
import '../../css/MessageBroad/MessageBroad.css'
import '../../css/MessageBroad/form.css'


import pic_touxiang from '../../images/touxiang.png'
import who from '../../images/who.jpg'
import alpaca1 from '../../images/avatar/alpaca1.png'
import alpaca2 from '../../images/avatar/alpaca2.png'
import alpaca3 from '../../images/avatar/alpaca3.png'
import alpaca4 from '../../images/avatar/alpaca4.png'
import alpaca5 from '../../images/avatar/alpaca5.png'
import alpaca6 from '../../images/avatar/alpaca6.png'
import vister from  '../../images/avatar/vister.png'

import loading from '../../images/loading.gif'


import {get,post} from '../../ajax/index'


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width:'500px'
    }
};

const customStyles2 = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width:'90%',
        height:'60%'
    }
};


Modal.setAppElement('#root')

export default class MessageBroad extends React.Component{

    constructor(){
        super();
        this.state=({
            loginFlag:false,
            value:'',
            avatar_select:alpaca1,
            user_data:[{ "avatar":"no" , "signature":"no" ,"username":"no"}],
            user_avatar:alpaca1,
            message_data:[],

            modalIsOpen: false,
            modalIsOpen2: false,
            modalIsOpen3: false,
            modalIsOpen4: false,
            modalIsOpen5: false

        });

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openModal2 = this.openModal2.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);

        this.openModal3 = this.openModal3.bind(this);
        this.closeModal3 = this.closeModal3.bind(this);

        this.openModal4 = this.openModal4.bind(this);
        this.closeModal4 = this.closeModal4.bind(this);

        this.openModal5 = this.openModal5.bind(this);
        this.closeModal5 = this.closeModal5.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openModal2() {
        this.setState({modalIsOpen2: true});
    }
    closeModal2() {
        this.setState({modalIsOpen2: false});
    }

    openModal3() {
        this.setState({modalIsOpen3: true});
    }
    closeModal3() {
        this.setState({modalIsOpen3: false});
    }

    openModal4() {
        this.setState({modalIsOpen4: true});
    }
    closeModal4() {
        this.setState({modalIsOpen4: false});
    }

    openModal5() {
        this.setState({modalIsOpen5: true});
    }
    closeModal5() {
        this.setState({modalIsOpen5: false});
    }


    componentDidMount(){
        this.getMessageList();
        this.getUserLoginState();
    }


    getMessageList=()=>{
        get('/getMessage').then((res)=>{
            this.setState({message_data:res})
        })
    }

    getUserLoginState=()=>{

        get('/getUserLogin').then((res)=>{
            if(res=='unLogin'){
                this.setState({ loginFlag:false})
            }
            else{
                this.setState({
                    user_data:res,
                    loginFlag:true
                })
            }
        }).then(()=>this.getMessageList())
    }








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
            case 'vister':avator=vister;break;
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
        let email=''
        message=encodeURIComponent(message)

        let url = "/pushMessage";//接口地址

        let data={
            userID:userID,
            username:username,
            avatar:avatar,
            message:message,
            email:email,
        }


        if(message.length>0){
            post(url,data).then(()=>{
                alert('发表成功！！')
            }).then(this.closeModal2).then(this.getMessageList)
        }else{
            alert('你漏了点东西没输入吧！！！')
        }

    }



    vsr_publishMessage=()=>{
        let username=this.vsr_username.value
        let email=this.vsr_email.value
        let message=this.vsr_message.value
        message=encodeURIComponent(message)

        let url = "/vsr_pushMessage";//接口地址

        let data={
            username:username,
            message:message,
            email:email
        }

        if(username.length>0&&email.length>0&&message.length>0){

            post(url,data).then(()=>{
                alert('发表成功！！')
            }).then(this.closeModal3).then(this.closeModal5).then(this.getMessageList)
        }else{
            alert('你漏了点东西没输入吧！！！')
        }
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



        let url = "/userReg";//接口地址

        let data={
            avatar:avatar,
            username:username,
            email:email,
            password:password,
            signature:signature
        }


        post(url,data).then(()=>{
            alert('注册成功！！')
        }).then(this.closeModal)


    }

/**************************用户登陆**************************************************************/
    login=()=>{
        let username=this.login_username.value
        let pass=this.login_password.value
        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+pass+'岂因祸福避趋之')
        let password=md.digest().toHex()


        let url = "/userLogin";//接口地址
        let data = {
            username:username,
            password:password
        }

        if(username.length>0&&pass.length>0){

            post(url,data).then((res)=>{
                alert(res.message)
            }).then(
                this.getUserLoginState
            )
        }else{
            alert('我提醒过你了，用户名或密码不能为空！！！')
        }
    }


/**************************用户注销**************************************************************/
    logout=()=>{

        get('/userLogOut').then(()=> {
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

        let url = "/updateUserInfo";//接口地址
        let data ={
            id:id,
            avatar:avatar,
            username:username,
            signature:signature
        }

        post(url,data).then(()=>{
            alert('更改成功！！')
        }).then(this.closeModal4).then(this.getUserLoginState)

    }






    render(){


        return(


            <div>
                <div className={'msgg'}>
                <div className={"msg_sidebar"}>
                    <div className={"msg_title"}>交流区</div>

                    <section className={"form-session"}>
                        {/**/}
                        {this.state.loginFlag?
                        <form id={"basic-form"}>
                            <img src={this.getAvator(this.state.user_data[0].avatar)} width={"80%"} style={{borderRadius: "100%"}}/>
                            <h2>{this.state.user_data[0].username}</h2>
                            <h4>{this.state.user_data[0].email}</h4>
                            <h5 style={{color:'grey'}}>{this.state.user_data[0].signature}</h5>
                            <button id={"basic-form-submit"} id={'wirtemessage'} type={"submit"} style={{marginTop: "10px"}} onClick={this.openModal2}>写留言</button>
                            <button id={"basic-form-submit"} id={'updateinfo'}type={"submit"} style={{marginTop: "5px"}} onClick={this.openModal4}>更改个人信息</button>
                            <button id={"basic-form-submit"} id={'logout'} type={"submit"} style={{marginTop: "5px"}} onClick={this.logout}>注销</button>
                        </form>:
                            <form id={"basic-form"}>
                                <img src={who} width={"80%"} style={{borderRadius: "100%"}}/>
                                <div className={"form-group"}>
                                    <input type={"text"} id={"basic-form-first-name"} placeholder={"请输入用户名"}
                                           ref={ref => {this.login_username=ref;}}/>
                                    <label htmlFor={"basic-form-first-name"}>用户名</label>
                                </div>
                                <div className={"form-group"}>
                                    <input type={"password"} id={"basic-form-last-name"} placeholder={"请输入密码"}
                                               ref={ref => {this.login_password=ref;}}/>
                                    <label htmlFor={"basic-form-last-name"}>密码</label>
                                </div>
                                <button id={"basic-form-submit"}
                                        type={"submit"}
                                        class={'loginss'}
                                        onClick={this.login}>登录</button>
                                <button id={"basic-form-submit"} id={'reg'} type={"submit"} style={{marginTop: "10px"}} onClick={this.openModal}>没有账号？点此注册</button>
                            </form>}

                    </section>

                    {this.state.loginFlag?<div></div>:
                        <div>
                            <button id={"basic-form-submit"}
                                    className={"btn-vister"}
                                    onClick={this.openModal3}>
                                游客免登录发言
                            </button>
                        </div>}

                    <button id={"basic-form-submit"} className={"btn-vister"} style={{visibility:'hidden',marginTop:'30px',marginBottom:'50px'}}>游客免登录发言</button>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>注册</div>
                        <form>
                            <img height={64} width={64} src={this.state.avatar_select}/>请选择头像：
                            <select
                                ref={ref => {this.avatar=ref;}}
                                onChange={this.selectChange}>
                                <option value ={"alpaca1"}>alpaca1</option>
                                <option value ={"alpaca2"}>alpaca2</option>
                                <option value ={"alpaca3"}>alpaca3</option>
                                <option value ={"alpaca4"}>alpaca4</option>
                                <option value ={"alpaca5"}>alpaca5</option>
                                <option value ={"alpaca6"}>alpaca6</option>
                            </select>

                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-first-name"} placeholder={"请输入用户名"}
                                       ref={ref => {this.user_username=ref;}}/>
                                <label htmlFor={"basic-form-first-name"}>用户名</label>
                            </div>
                            <div className={"form-group"}>
                                <input type={"password"} id={"basic-form-last-name"} placeholder={"请输入密码"}
                                       ref={ref => {this.user_password=ref;}}/>
                                <label htmlFor={"basic-form-last-name"}>密码</label>
                            </div>
                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-first-name"} placeholder={"请输入电子邮箱"}
                                       ref={ref => {this.user_email=ref;}}/>
                                <label htmlFor={"basic-form-first-name"}>电子邮箱</label>
                            </div>
                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-last-name"} placeholder={"请输入个性签名"}
                                       ref={ref => {this.user_signature=ref;}}/>
                                <label htmlFor={"basic-form-last-name"}>个性签名</label>
                            </div>

                            <button onClick={this.userReg}>注册</button>
                            <button onClick={this.closeModal}>取消</button>

                        </form>
                    </Modal>

                    <Modal
                        isOpen={this.state.modalIsOpen4}
                        onRequestClose={this.closeModal4}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>更改个人信息</div>
                        <form>
                            <img height={64} width={64} src={this.state.user_avatar}/>请选择更改的头像：
                            <select
                                value={this.state.user_data[0].avatar}
                                ref={ref => {this.userChange_avatar=ref;}}

                                onChange={(e) => {
                                    this.selectChangeccc()
                                    let datas=this.state.user_data;
                                    datas[0].avatar=e.target.value;
                                    this.setState({user_data:datas});
                                }}>
                                <option value ={"alpaca1"}>alpaca1</option>
                                <option value ={"alpaca2"}>alpaca2</option>
                                <option value ={"alpaca3"}>alpaca3</option>
                                <option value ={"alpaca4"}>alpaca4</option>
                                <option value ={"alpaca5"}>alpaca5</option>
                                <option value ={"alpaca6"}>alpaca6</option>
                            </select>

                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-first-name"} placeholder={"更改用户名"}
                                       ref={ref => {this.userChange_username=ref;}}
                                       value={this.state.user_data[0].username}
                                       onChange={(e) => {
                                           let datas=this.state.user_data;
                                           datas[0].username=e.target.value;
                                           this.setState({user_data:datas});
                                       }}/>
                                <label htmlFor={"basic-form-first-name"}>用户名</label>
                            </div>
                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-last-name"} placeholder={"更改个性签名"}
                                       ref={ref => {this.userChange_signature=ref;}}
                                       value={this.state.user_data[0].signature}
                                       onChange={(e) => {
                                           let datas=this.state.user_data;
                                           datas[0].signature=e.target.value;
                                           this.setState({user_data:datas});
                                       }}/>
                                <label htmlFor={"basic-form-last-name"}>个性签名</label>
                            </div>

                            <button onClick={this.updateUserInfo}>确认更改</button>
                            <button onClick={this.closeModal4}>取消</button>

                        </form>
                    </Modal>


                    <Modal
                        isOpen={this.state.modalIsOpen2}
                        onRequestClose={this.closeModal2}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>发言</div>
                        <form>

                            <div className={"form-group"}>
                                <input type={"textarea"}
                                       placeholder={"请输入想说的内容"}
                                       style={{width:'100%',height:'150px',marginTop:'20px',borderWidth:'1px'}}
                                       ref={ref => {this.message=ref;}}/>
                            </div>


                            <button onClick={()=>this.publishMessage()} id={'publish'}>发言</button>
                            <button onClick={this.closeModal2} style={{marginTop:'5px'}}>取消</button>

                        </form>
                    </Modal>


                    <Modal
                        isOpen={this.state.modalIsOpen3}
                        onRequestClose={this.closeModal3}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>游客发言</div>
                        <form>

                            <div className={"form-group"}>
                                <input type={"textarea"}
                                       placeholder={"请输入想说的内容"}
                                       style={{width:'100%',height:'150px',marginTop:'20px',borderWidth:'1px'}}
                                       ref={ref => {this.vsr_message=ref;}}/>
                            </div>

                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-first-name"} placeholder={"*请留下你的大名"}
                                       ref={ref => {this.vsr_username=ref;}}/>
                                <label htmlFor={"basic-form-first-name"}>用户名</label>
                            </div>

                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-first-name"} placeholder={"*请留下你的电子邮箱"}
                                       ref={ref => {this.vsr_email=ref;}}/>
                                <label htmlFor={"basic-form-first-name"}>电子邮箱</label>
                            </div>


                            <button onClick={()=>this.vsr_publishMessage()} id={'msgfayan'}>发言</button>
                            <button onClick={this.closeModal3} style={{marginTop:'5px'}} id={'nomsgfayan'}>取消</button>

                        </form>
                    </Modal>
                </div>


                <div className={"msg_main"}>
                    <div className={"msg_main_list"}>
                        {this.state.message_data.length>0?this.state.message_data.map((item,index)=>(
                            <div className={"item"}>
                                <img className={"msg_pic"} src={this.getAvator(item.user_avatar)}/>
                                <div className={"msg_right"}>
                                    <div className={"msg_name"}>{item.user_name}</div>
                                    <div className={"msg_time"}>发布于：{item.push_time}</div>
                                    <div className={"msg_context"}>
                                        {item.message}
                                    </div>
                                </div>
                            </div>)):(<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>)}
                    </div>
                </div>

                </div>


















                <div className={"mo-msg_main"}>

                    <div className={"mo-msg_title"}>交流区</div>
                    <div>
                        <button id={"basic-form-submit"}
                                className={"btn-vister"}
                                onClick={this.openModal5}>
                            游客免登录发言
                        </button>
                    </div>
                    <div className={"mo-msg_main_list"}>

                        {this.state.message_data.length>0?this.state.message_data.map((item,index)=>(

                        <div className={"item"}>
                            <img className={"mo-msg_pic"} src={this.getAvator(item.user_avatar)}/>
                            <div className={"mo-msg_right"}>
                                <div className={"mo-msg_name"}>{item.user_name}</div>
                                <div className={"mo-msg_time"}>发布于：{item.push_time}</div>
                                <div className={"mo-msg_context"}>
                                    {item.message}
                                    </div>
                            </div>
                        </div>)):(<div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>)}


                        <Modal
                            isOpen={this.state.modalIsOpen5}
                            onRequestClose={this.closeModal5}
                            style={customStyles2}
                            contentLabel="Example Modal"
                        >

                            <div style={{fontSize:'25px',fontWeight:'bold'}}>游客发言</div>
                            <form>

                                <div className={"form-group"}>
                                    <input type={"textarea"}
                                           placeholder={"请输入想说的内容"}
                                           style={{width:'100%',height:'70px',marginTop:'10px',borderWidth:'1px'}}
                                           ref={ref => {this.vsr_message=ref;}}/>
                                </div>

                                <div className={"form-group"}>
                                    <input type={"text"} id={"basic-form-first-name"} placeholder={"*请留下你的大名"}
                                           ref={ref => {this.vsr_username=ref;}}/>
                                    <label htmlFor={"basic-form-first-name"}>用户名</label>
                                </div>

                                <div className={"form-group"}>
                                    <input type={"text"} id={"basic-form-first-name"} placeholder={"*请留下你的电子邮箱"}
                                           ref={ref => {this.vsr_email=ref;}}/>
                                    <label htmlFor={"basic-form-first-name"}>电子邮箱</label>
                                </div>


                                <button onClick={()=>this.vsr_publishMessage()}>发言</button>
                                <button onClick={this.closeModal5} style={{marginTop:'5px'}}>取消</button>

                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }

}