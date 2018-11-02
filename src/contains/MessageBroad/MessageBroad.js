
import React from 'react'
import {connect} from 'react-redux'
import {actions} from "../../reducers/MessageBroadReducer";
import {bindActionCreators} from 'redux'


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




const {
    open_reg_modal,
    close_reg_modal,
    open_push_modal,
    close_push_modal,
    open_vsrdeskpush_modal,
    close_vsrdeskpush_modal,
    open_update_modal,
    close_update_modal,
    open_vsrpush_modal,
    close_vsrpush_modal,
    change_avatar_select,
    change_user_avatar,
    check_login_state,
    logins,
    logouts,
    vsr_push_message,
    push_message,
    reg,change_user_data,update_user_data
} =actions


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

class MessageBroad extends React.Component{




    componentDidMount(){
        this.props.check_login_state()
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
        this.props.change_avatar_select(this.avatar.value)
    }

    selectChangeccc=()=>{
        this.props.change_user_avatar(this.userChange_avatar.value)
    }


/**************************发表新留言**************************************************************/
    publishMessage=()=>{
        let userID=this.props.user_data[0].ID
        let username=this.props.user_data[0].username
        let avatar=this.props.user_data[0].avatar
        let message=this.message.value
        let email=''



        let data={
            userID:userID,
            username:username,
            avatar:avatar,
            message:message,
            email:email,
        }

        if(message.length>0){
            this.props.push_message(data)
        }else{
            alert('你漏了点东西没输入吧！！！')
        }
    }


    vsr_publishMessage=()=>{
        let username=this.vsr_username.value
        let email=this.vsr_email.value
        let message=this.vsr_message.value

        let data={
            username:username,
            message:message,
            email:email
        }


        if(username.length>0&&email.length>0&&message.length>0){
            this.props.vsr_push_message(data)
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


        let data={
            avatar:avatar,
            username:username,
            email:email,
            password:password,
            signature:signature
        }


        this.props.reg(data)




    }

/**************************用户登陆**************************************************************/
    login=()=>{
        let username=this.login_username.value
        let pass=this.login_password.value
        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+pass+'岂因祸福避趋之')
        let password=md.digest().toHex()

        let data = {
            username:username,
            password:password
        }

        if(username.length>0&&pass.length>0){
            this.props.logins(data)
        }else{
            alert('我提醒过你了，用户名或密码不能为空！！！')
        }
    }


/**************************用户注销**************************************************************/
    logout=()=>{
        this.props.logouts()
    }


/**************************更改用户信息**************************************************************/
    updateUserInfo=()=>{
        let id=this.props.user_data[0].ID
        let avatar=this.userChange_avatar.value
        let signature=this.userChange_signature.value
        let username=this.userChange_username.value


        let data ={
            id:id,
            avatar:avatar,
            username:username,
            signature:signature
        }

        this.props.update_user_data(data)

    }





    render(){


        return(


            <div>
                <div className={'msgg'}>
                <div className={"msg_sidebar"}>
                    <div className={"msg_title"}>交流区</div>

                    <section className={"form-session"}>
                        {/**/}
                        {this.props.loginFlag?
                        <form id={"basic-form"}>
                            <img src={this.getAvator(this.props.user_data[0].avatar)} width={"80%"} style={{borderRadius: "100%"}}/>
                            <h2>{this.props.user_data[0].username}</h2>
                            <h4>{this.props.user_data[0].email}</h4>
                            <h5 style={{color:'grey'}}>{this.props.user_data[0].signature}</h5>
                            <button id={"basic-form-submit"} id={'wirtemessage'} type={"submit"} style={{marginTop: "10px"}} onClick={this.props.open_push_modal}>写留言</button>
                            <button id={"basic-form-submit"} id={'updateinfo'}type={"submit"} style={{marginTop: "5px"}} onClick={this.props.open_update_modal}>更改个人信息</button>
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
                                <button id={"basic-form-submit"} id={'reg'} type={"submit"} style={{marginTop: "10px"}} onClick={this.props.open_reg_modal}>没有账号？点此注册</button>
                            </form>}

                    </section>

                    {this.props.loginFlag?<div></div>:
                        <div>
                            <button id={"basic-form-submit"}
                                    className={"btn-vister"}
                                    onClick={this.props.open_vsrdeskpush_modal}>
                                游客免登录发言
                            </button>
                        </div>}

                    <button id={"basic-form-submit"} className={"btn-vister"} style={{visibility:'hidden',marginTop:'30px',marginBottom:'50px'}}>游客免登录发言</button>

                    <Modal
                        isOpen={this.props.regModal}
                        onRequestClose={this.props.close_reg_modal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>注册</div>
                        <form>
                            <img height={64} width={64} src={this.getAvator(this.props.avatar_select)}/>请选择头像：
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
                            <button onClick={this.props.close_reg_modal}>取消</button>

                        </form>
                    </Modal>

                    <Modal
                        isOpen={this.props.updateModal}
                        onRequestClose={this.props.close_update_modal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>更改个人信息</div>
                        <form>
                            <img height={64} width={64} src={this.getAvator(this.props.user_avatar)}/>请选择更改的头像：
                            <select
                                value={this.props.user_data[0].avatar}
                                ref={ref => {this.userChange_avatar=ref;}}

                                onChange={(e) => {
                                    this.selectChangeccc()
                                    let datas=this.props.user_data.slice(0);
                                    datas[0].avatar=e.target.value;
                                    this.props.change_user_data(datas)
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
                                       value={this.props.user_data[0].username}
                                       onChange={(e) => {
                                           let datas=this.props.user_data.slice(0);
                                           datas[0].username=e.target.value;
                                           this.props.change_user_data(datas)
                                       }}/>
                                <label htmlFor={"basic-form-first-name"}>用户名</label>
                            </div>
                            <div className={"form-group"}>
                                <input type={"text"} id={"basic-form-last-name"} placeholder={"更改个性签名"}
                                       ref={ref => {this.userChange_signature=ref;}}
                                       value={this.props.user_data[0].signature}
                                       onChange={(e) => {
                                           let datas=this.props.user_data.slice(0);
                                           datas[0].signature=e.target.value;
                                           this.props.change_user_data(datas)
                                       }}/>
                                <label htmlFor={"basic-form-last-name"}>个性签名</label>
                            </div>

                            <button onClick={this.updateUserInfo}>确认更改</button>
                            <button onClick={this.props.close_update_modal}>取消</button>

                        </form>
                    </Modal>


                    <Modal
                        isOpen={this.props.pushModal}
                        onRequestClose={this.props.close_push_modal}
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
                            <button onClick={this.props.close_push_modal} style={{marginTop:'5px'}}>取消</button>

                        </form>
                    </Modal>


                    <Modal
                        isOpen={this.props.vsrDeskPushModal}
                        onRequestClose={this.props.close_vsrdeskpush_modal}
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
                            <button onClick={this.props.close_vsrdeskpush_modal} style={{marginTop:'5px'}} id={'nomsgfayan'}>取消</button>

                        </form>
                    </Modal>
                </div>


                <div className={"msg_main"}>
                    <div className={"msg_main_list"}>
                        {this.props.message_data.length>0?this.props.message_data.map((item,index)=>(
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
                                onClick={this.props.open_vsrpush_modal}>
                            游客免登录发言
                        </button>
                    </div>
                    <div className={"mo-msg_main_list"}>

                        {this.props.message_data.length>0?this.props.message_data.map((item,index)=>(

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
                            isOpen={this.props.vsrPushModal}
                            onRequestClose={this.props.close_vsrpush_modal}
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
                                <button onClick={this.props.close_vsrpush_modal} style={{marginTop:'5px'}}>取消</button>

                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=> {
    return{
        regModal:state.messagebroad.regModal,
        pushModal:state.messagebroad.pushModal,
        vsrDeskPushModal:state.messagebroad.vsrDeskPushModal,
        updateModal:state.messagebroad.updateModal,
        vsrPushModal:state.messagebroad.vsrPushModal,


        avatar_select:state.messagebroad.avatar_select,
        user_avatar:state.messagebroad.user_avatar,

        loginFlag:state.messagebroad.loginFlag,

        user_data:state.messagebroad.user_data,

        message_data:state.messagebroad.message_data,
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        open_reg_modal:bindActionCreators(open_reg_modal,dispatch),
        close_reg_modal:bindActionCreators(close_reg_modal,dispatch),
        open_push_modal:bindActionCreators(open_push_modal,dispatch),
        close_push_modal:bindActionCreators(close_push_modal,dispatch),
        open_vsrdeskpush_modal:bindActionCreators(open_vsrdeskpush_modal,dispatch),
        close_vsrdeskpush_modal:bindActionCreators(close_vsrdeskpush_modal,dispatch),
        open_update_modal:bindActionCreators(open_update_modal,dispatch),
        close_update_modal:bindActionCreators(close_update_modal,dispatch),
        open_vsrpush_modal:bindActionCreators(open_vsrpush_modal,dispatch),
        close_vsrpush_modal:bindActionCreators(close_vsrpush_modal,dispatch),

        change_avatar_select:bindActionCreators(change_avatar_select,dispatch),
        change_user_avatar:bindActionCreators(change_user_avatar,dispatch),

        check_login_state:bindActionCreators(check_login_state,dispatch),
        logins:bindActionCreators(logins,dispatch),
        logouts:bindActionCreators(logouts,dispatch),

        vsr_push_message:bindActionCreators(vsr_push_message,dispatch),

        push_message:bindActionCreators(push_message,dispatch),

        reg:bindActionCreators(reg,dispatch),


        change_user_data:bindActionCreators(change_user_data,dispatch),


        update_user_data:bindActionCreators(update_user_data,dispatch)

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBroad);