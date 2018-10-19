import React from 'react'
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

export default class ArticleContent extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            article_data:[],
            loginFlag:false,
            modalIsOpen: false,
            modalIsOpen2: false,
            modalIsOpen3: false,
            comment_data:[]
        })

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openModal2 = this.openModal2.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);

        this.openModal3 = this.openModal3.bind(this);
        this.closeModal3 = this.closeModal3.bind(this);
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



    componentDidMount(){
        this.getArticles(this.props.match.params.id)
        this.getUserLoginState()
    }

    getCommentList=()=>{
        fetch('/apis/getComment?id='+this.props.match.params.id,
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                comment_data:eval(json)
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

                this.setState({ loginFlag:false})
            }

            else{
                this.setState({
                    user_data:eval(json),
                    loginFlag:true
                })
            }
        }).then(this.getCommentList)
    }


    getArticles=(id)=>{
        fetch('/apis/getArticles?id='+id,
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                article_data:eval(json)
            })
        })
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


        let url = "/apis/userLogin";//接口地址
        let data = 'username=' + username+'&password=' + password;



        if(username.length>0&&pass.length>0){
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
        }else{
            alert('用户名或密码不能为空哦')
        }
    }

    publishComment=()=>{
        let aID=this.props.match.params.id
        let userID=this.state.user_data[0].ID
        let username=this.state.user_data[0].username
        let avatar=this.state.user_data[0].avatar
        let comment=this.comment.value
        comment=encodeURIComponent(comment)

        let url = "/apis/pushComment";//接口地址
        let data = 'aID=' + aID + '&userID=' + userID + '&username=' + username+'&avatar=' + avatar+'&comment=' + comment;


        if(comment.length>0){
            fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data}).then(()=>{
                alert('发表成功！！')
            }).then(()=>{this.comment.value=''}).then(this.getCommentList)
        }else{
            alert('你貌似什么都没写吧？？？')
        }
    }


    vsr_publishComment=()=>{
        let aID=this.props.match.params.id
        let username=this.vsr_username.value
        let email=this.vsr_email.value
        let message=this.vsr_message.value
        message=encodeURIComponent(message)

        let url = "/apis/vsr_pushComment";//接口地址
        let data ='&aID=' + aID+'&username=' + username+'&message=' + message+'&email=' + email;

        if(username.length>0&&email.length>0&&message.length>0){
            fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data}).then(()=>{
                alert('评论成功！！')
            }).then(this.closeModal2).then(this.closeModal3).then(this.getCommentList)
        }else{
            alert('你漏了点东西没输入吧！！！')
        }
    }






    render(){
        return(
            <div>
            <div className={'articleContents'}>
            <div>
                    {this.state.article_data.length>0?this.state.article_data.map((item,index)=>(
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
                            </div>
                        </div>
                    )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}}

                    <div className={'comment_content_back'}>
                        <div className={'comment_content'}>
                            <div style={{textAlign: "center",fontSize: "50px",fontWeight:" bold"}}>评论区</div>


                            {this.state.loginFlag?<div style={{width:"100%",marginTop: "50px"}}>
                                <div style={{marginLeft: "10%",fontSize: "30px"}}>欢迎你,{this.state.user_data[0].username}</div>
                                <form>
                                    <textarea style={{width:"80%",marginLeft: "10%",height: "150px"}}
                                              placeholder="请给本文发评论吧"
                                              ref={ref => {this.comment=ref;}}>
                                    </textarea>
                                    <button style={{width:"80%",marginLeft: "10%"}}
                                    onClick={()=>this.publishComment()}>提交</button>
                                </form>

                            </div>:<div style={{width:"80%",marginTop: "50px",marginLeft:'10%'}}>
                                <button onClick={this.openModal}
                                        id={'logincom'}>登陆即可发评论</button></div>}



                            <div>
                                <button id={"basic-form-submit"}
                                        id={'vlogincom'}
                                        style={{width:"80%",marginLeft:'10%',marginTop:5}}
                                        onClick={this.openModal2}>
                                    游客免登录评论
                                </button>
                            </div>





                            <div className={"comment_main_list"}>
                                {this.state.comment_data.length>0?this.state.comment_data.map((item,index)=>(
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
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
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
                                    onClick={this.closeModal}>取消</button>
                        </form>
                    </Modal>


                <Modal
                    isOpen={this.state.modalIsOpen2}
                    onRequestClose={this.closeModal2}
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
                        <button onClick={this.closeModal2} style={{marginTop:'5px'}}>取消</button>

                    </form>
                </Modal>














                    </div>


            </div>
                <div className="mo-articleContent">
                    {this.state.article_data.length>0?this.state.article_data.map((item,index)=>(
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
                                        onClick={this.openModal3}>
                                    游客免登录发言
                                </button>
                            </div>

                            <div className={"comment_main_list"}>
                                {this.state.comment_data.length>0?this.state.comment_data.map((item,index)=>(
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
                                isOpen={this.state.modalIsOpen3}
                                onRequestClose={this.closeModal3}
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
                                    <button onClick={this.closeModal3} style={{marginTop:'5px'}}>取消</button>

                                </form>
                            </Modal>
                        </div>
                    </div>

                </div>


            </div>


        )
    }

}