import React from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from "../../reducers/MessageBroadReducer";
import {actions2} from "../../reducers/ArticleContentReudcer";

import Modal from 'react-modal';
import '../../css/ArticleContent/ArticleContent.css'
import '../../css/MessageBroad/form.css'
import loading from '../../images/loading.gif'


import pic_touxiang from '../../images/touxiang.png'
import alpaca1 from '../../images/avatar/alpaca1.png'
import alpaca2 from '../../images/avatar/alpaca2.png'
import alpaca3 from '../../images/avatar/alpaca3.png'
import alpaca4 from '../../images/avatar/alpaca4.png'
import alpaca5 from '../../images/avatar/alpaca5.png'
import alpaca6 from '../../images/avatar/alpaca6.png'
import vister from  '../../images/avatar/vister.png'
import forge from "node-forge";
import {get,post} from '../../ajax/index'




const {
    logins
} =actions

const {
    open_login_modal,
    close_login_modal,
    open_vsr_modal,
    close_vsr_modal,
    open_movsr_modal,
    close_movsr_modal,
    get_article,
    get_comment,
    publish_comment,
    vsr_publish_comment
} =actions2


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

class ArticleContent extends React.Component{







    componentDidMount(){
        this.props.get_article(this.props.match.params.id)
        this.props.get_comment(this.props.match.params.id)
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

    typename=(key) =>{
        let typen;
        switch (key){
            case 'javascript':
                typen='JavaScript和ES6'; break;
            case 'java':
                typen='Java和Java框架'; break;
            case 'htmlcss':
                typen='HTML&CSS'; break;
            case 'react':
                typen='React'; break;
            case 'vue':
                typen='Vue'; break;
            case 'angular':
                typen='Angular'; break;
            case 'cpp':
                typen='C和C++'; break;
            case 'data':
                typen='数据结构和算法'; break;
            case 'other':
                typen='其他杂碎'; break;
        }
        return typen
    }

    login=()=>{
        let username=this.login_username.value
        let pass=this.login_password.value


        let md=forge.md.md5.create();
        md.update('苟利国家生死以'+pass+'岂因祸福避趋之')
        let password=md.digest().toHex()


        let data={
            username:username,
            password:password
        }

        if(username.length>0&&pass.length>0){
            this.props.logins(data)
        }else{
            alert('用户名或密码不能为空哦')
        }
    }

    publishComment=()=>{
        let aID=this.props.match.params.id
        let userID=this.props.user_data[0].ID
        let username=this.props.user_data[0].username
        let avatar=this.props.user_data[0].avatar
        let comment=this.comment.value

        let data={
            aID:aID,
            userID:userID,
            username:username,
            avatar:avatar,
            comment:comment
        }

        if(comment.length>0){
            this.props.publish_comment(data)

        }else{
            alert('你貌似什么都没写吧？？？')
        }
    }




    vsr_publishComment=()=>{
        let aID=this.props.match.params.id
        let username=this.vsr_username.value
        let email=this.vsr_email.value
        let message=this.vsr_message.value

        let data={
            aID:aID,
            username:username,
            message:message,
            email:email
        }




        if(username.length>0&&email.length>0&&message.length>0){

            this.props.vsr_publish_comment(data)

        }else{
            alert('你漏了点东西没输入吧！！！')
        }
    }




    render(){
        return(
            <div>
            <div className={'articleContents'}>
            <div>
                    {this.props.article_data.length>0?this.props.article_data.map((item,index)=>(
                        <div className={'article_content_back'}>
                            <div className={'article_content'} key={index}>
                                <h1 >{item.article_title}</h1>
                                <div className={"ainfo"}>
                                    <div>发表于：{item.article_push_time}</div>
                                    <div>分类：{this.typename(item.article_type)}</div>
                                </div>
                                <h3>{item.article_summary}</h3>
                                <div dangerouslySetInnerHTML={{__html:item.article_context}}
                                     className={"context"}>
                                </div>
                                <div className="bdsharebuttonbox">
                                    <a href="#" className="bds_more" data-cmd="more"></a>
                                    <a href="#" className="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                                    <a href="#" className="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                    <a href="#" className="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                                    <a href="#" className="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                                    <a href="#" className="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                                </div>

                            </div>
                        </div>
                    )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}}

                    <div className={'comment_content_back'}>
                        <div className={'comment_content'}>
                            <div style={{textAlign: "center",fontSize: "50px",fontWeight:" bold"}}>评论区</div>


                            {this.props.loginFlag?<div style={{width:"100%",marginTop: "50px"}}>
                                <div style={{marginLeft: "10%",fontSize: "30px"}}>欢迎你,{this.props.user_data[0].username}</div>
                                <form>
                                    <textarea style={{width:"80%",marginLeft: "10%",height: "150px"}}
                                              placeholder="请给本文发评论吧"
                                              ref={ref => {this.comment=ref;}}>
                                    </textarea>
                                    <button style={{width:"80%",marginLeft: "10%"}}
                                    onClick={()=>this.publishComment()}>提交</button>
                                </form>

                            </div>:<div style={{width:"80%",marginTop: "50px",marginLeft:'10%'}}>
                                <button onClick={this.props.open_login_modal}
                                        id={'logincom'}>登陆即可发评论</button></div>}



                            {this.props.loginFlag?<div> </div>:<div>
                                <button id={"basic-form-submit"}
                                        id={'vlogincom'}
                                        style={{width:"80%",marginLeft:'10%',marginTop:5}}
                                        onClick={this.props.open_vsr_modal}>
                                    游客免登录评论
                                </button>
                            </div>}









                            <div className={"comment_main_list"}>
                                {this.props.comment_data.length>0?this.props.comment_data.map((item,index)=>(
                                    <div className={"item"}>
                                        <img className={"comment_pic"} src={this.getAvator(item.user_avatar)}/>
                                        <div className={"comment_right"}>
                                            <div className={"comment_name"}>{item.user_name}</div>
                                            <div className={"comment_time"}>发布于：{item.push_time}</div>
                                            <div className={"comment_context"}>
                                                {item.comment}
                                            </div>
                                        </div>
                                    </div>)):(<div>暂无评论</div>)}
                            </div>
                        </div>
                    </div>



                    <Modal
                        isOpen={this.props.loginModal}
                        onRequestClose={this.props.close_login_modal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <div style={{fontSize:'40px',fontWeight:'bold'}}>登陆</div>
                        <form id={"basic-form"}>
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
                                    onClick={this.login}>登录</button>
                            <button id={"basic-form-submit"}
                                    type={"submit"} style={{marginTop: "10px"}}
                                    onClick={this.props.close_login_modal}>取消</button>
                        </form>
                    </Modal>


                <Modal
                    isOpen={this.props.vsrModal}
                    onRequestClose={this.props.close_vsr_modal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div style={{fontSize:'40px',fontWeight:'bold'}}>游客评论</div>
                    <form>

                        <div className={"form-group"}>
                            <input type={"textarea"}
                                   placeholder={"请给本文发评论吧"}
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


                        <button onClick={()=>this.vsr_publishComment()} id={'avcom'}>确认发送</button>
                        <button onClick={this.props.close_vsr_modal} style={{marginTop:'5px'}}>取消</button>

                    </form>
                </Modal>














                    </div>


            </div>
                <div className="mo-articleContent">
                    {this.props.article_data.length>0?this.props.article_data.map((item,index)=>(
                    <div className={'article_content_back'}>
                        <div className={'article_content'} key={index}>
                            <h1 style={{fontSize:28}}>{item.article_title}</h1>
                            <div className={"ainfo"}>
                                <div>发表于：{item.article_push_time}</div>
                                <div>分类：JavaScript</div>
                            </div>
                            <h3 style={{fontSize:16}}>{item.article_summary}</h3>
                            <div className={"context"} dangerouslySetInnerHTML={{__html:item.article_context}}></div>
                        </div>
                    </div>
                    )):<div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>}


                    <div className={'comment_content_back'}>
                        <div className={'comment_content'}>
                            <div style={{textAlign: "center",fontSize: "25px",fontWeight:" bold",paddingTop:'5px'}}>评论区</div>
                            <div>
                                <button id={"basic-form-submit"}
                                        className={"btn-vister"}
                                        onClick={this.props.open_movsr_modal}>
                                    游客免登录发言
                                </button>
                            </div>

                            <div className={"comment_main_list"}>
                                {this.props.comment_data.length>0?this.props.comment_data.map((item,index)=>(
                                <div className={"item"}>
                                    <img className={"comment_pic"} src={this.getAvator(item.user_avatar)}/>
                                    <div className={"comment_right"}>
                                        <div className={"comment_name"}>{item.user_name}</div>
                                        <div className={"comment_time"}>发布于：{item.push_time}</div>
                                        <div className={"comment_context"}>
                                            {item.comment}
                                        </div>
                                    </div>
                                </div>)):(<div>暂无评论</div>)}
                            </div>

                            <Modal
                                isOpen={this.props.moVsrModal}
                                onRequestClose={this.props.close_movsr_modal}
                                style={customStyles2}
                                contentLabel="Example Modal"
                            >

                                <div style={{fontSize:'25px',fontWeight:'bold'}}>游客评论</div>
                                <form>

                                    <div className={"form-group"}>
                                        <input type={"textarea"}
                                               placeholder={"请给本文发评论吧"}
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


                                    <button onClick={()=>this.vsr_publishComment()}>确认发布</button>
                                    <button onClick={this.props.close_movsr_modal} style={{marginTop:'5px'}}>取消</button>

                                </form>
                            </Modal>
                        </div>
                    </div>

                </div>


            </div>


        )
    }

}



const mapStateToProps=(state)=> {
    return{
        loginFlag:state.messagebroad.loginFlag,
        user_data:state.messagebroad.user_data,

        loginModal:state.articlecontent.loginModal,
        vsrModal:state.articlecontent.vsrModal,
        moVsrModal:state.articlecontent.moVsrModal,

        article_data:state.articlecontent.article_data,
        comment_data:state.articlecontent.comment_data,
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        logins:bindActionCreators(logins,dispatch),

        open_login_modal:bindActionCreators(open_login_modal,dispatch),
        close_login_modal:bindActionCreators(close_login_modal,dispatch),
        open_vsr_modal:bindActionCreators(open_vsr_modal,dispatch),
        close_vsr_modal:bindActionCreators(close_vsr_modal,dispatch),
        open_movsr_modal:bindActionCreators(open_movsr_modal,dispatch),
        close_movsr_modal:bindActionCreators(close_movsr_modal,dispatch),
        get_article:bindActionCreators(get_article,dispatch),
        get_comment:bindActionCreators(get_comment,dispatch),
        publish_comment:bindActionCreators(publish_comment,dispatch),
        vsr_publish_comment:bindActionCreators(vsr_publish_comment,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleContent);