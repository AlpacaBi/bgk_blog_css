import React from 'react'
import '../../css/Home/Home.css'

import Modal from 'react-modal';

import pic_touxiang from '../../images/touxiang.png'
import cao from '../../images/caonima.gif'
import two from '../../images/two.jpg'
import pay from '../../images/pay.png'
import loading from '../../images/loading.gif'

import wechatIcon from './wechat.png'
import mailIcon from './mail.png'
import loactIcon from './locat.png'
import githubIcon from './github.png'
import gitIcon from './git.png'


import {connect} from 'react-redux'
import {actions} from "../../reducers/HomeReducer";
import {bindActionCreators} from 'redux'
const {home_article_data,open_info_model,close_info_model,open_pay_model,close_pay_model} =actions



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


Modal.setAppElement('#root')

class Home extends React.Component{

    componentDidMount(){
        this.props.home_article_data()
    }

    getArticle=(id)=>{
        this.props.history.push('/article/'+id)
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



    render(){
        return(
            <div>

                <div width={"100%"} height={"100%"} className={"deskhome"}>
                <div className="side-bar">
                        <div className={"header1"}>
                            <img id={'touxiang'} className={"avatar"} src={pic_touxiang} width={"80%"} height={"80%"}/>
                            <div id={'homename'} className={"logo_name"}>Alpaca Bi</div>
                            <div id={'homeinfo'} className={"intro"}>talk and code is cheap,show me the money</div>
                        </div>
                        <div className={"contant"}>

                            <div className={'information'}><img src={loactIcon} width={18}/>
                                <span><b id={"fui-locat"} onClick={this.props.home_article_data}>     <span href="mailto:bi@guokang.tech">Guangzhou,China</span>
                            </b></span></div>

                            <div className={'information'}><img src={wechatIcon} width={18}/>
                            <span><b id={"fui-weixin"} onClick={this.props.open_info_model}>     workbiguokang</b></span></div>

                            <div className={'information'}><img src={mailIcon} width={18}/>
                            <span><b id={"fui-mailbox"} onClick={this.props.home_article_data}>     <a href="mailto:bi@guokang.tech">bi@guokang.email</a>
                            </b></span></div>


                            <div className={'information'}><img src={githubIcon} width={18}/>
                            <span>  <a id={"fui-github"} href={"https://github.com/biguokang"}
                                     target={"_blank"}><b>github.com/biguokang</b></a></span></div>

                            <div className={'information'}><img src={gitIcon} width={18}/>
                            <span>   <a id={"fui-gayhubbb"} href={"http://gayhub.fun/biguokang"}
                                     target={"_blank"}><b>gayhub.fun/biguokang</b></a></span></div>
                        </div>
                </div>

                    <div className={"caonima"} id={'pypy'} onClick={this.props.open_pay_model}>
                        <img src={cao} width="100%"/>
                        <div style={{textAlign:'center',color:'white'}}>求py交易，点击草泥马即可赞助我</div>
                    </div>

                <div className={'mains'}>
                    <div className={'article-list'}>
                        <div className={"home_alist"} id={'newArt'}>最新文章：</div>
                        <div>
                            {this.props.articleData.length>0?this.props.articleData.map((item,index)=>(
                                <div className={'item'} onClick={()=>this.getArticle(item.ID)}>
                                    <a  className={"title"} >{item.article_title}</a>
                                    <div className={"status"}>发布于：{item.article_push_time} | 分类：{this.typename(item.article_type)}</div>
                                    <div className={"content"}>
                                        {item.article_summary}
                                    </div>
                                </div>
                            )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}
                        </div>

                        <div className={"home_footer"}>
                            <div className={"home_footmsg"}>
                                <div id={"beian"}>
                                    <a href={"http://www.miitbeian.gov.cn"} target={'_blank'}
                                       style={{textDecoration:'none',color:'white'}}>网站备案号：粤ICP备17017545号</a>
                                </div>
                                <div>
                                    Created by Alpaca Bi
                                </div>
                                <div>
                                    Powered by React
                                </div>
                                <div>
                                    Copyright©1995-2018 by biguokang All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                    <Modal
                        isOpen={this.props.infoModal}
                        onRequestClose={this.props.close_info_model}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <img src={two} style={{width:'90%',margin:'5%'}}/>
                    </Modal>

                    <Modal
                        isOpen={this.props.payModal}
                        onRequestClose={this.props.close_pay_model}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <img src={pay} style={{width:'95%',margin:'2.5%'}} id={'pay'}/>
                    </Modal>
            </div>


                <div className={"mo-home"}>


                    <div className={"bgkinfo"}>
                        <div className={"item"}>
                            <img className={"comment_pic"} src={pic_touxiang}/>
                            <div className={"comment_right"}>
                                <div className={"comment_name"}>Alpaca Bi</div>
                                <div className={"comment_time"}>talk and code is cheap,show me the money</div>
                                <div className={"comment_context"}>
                                    <div>工作微信：</div>
                                    <div style={{fontSize:'12px'}}>workbiguokang</div>
                                    <div>工作邮箱：</div>
                                    <div style={{fontSize:'12px'}}>bi@guokang.mail</div>
                                    <div>github：</div>
                                    <div style={{fontSize:'12px',color:'white'}}><a href={"https://github.com/biguokang"}
                                            target={"_blank"}>
                                        https://github.com/biguokang
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={"article-list"}>
                        <div className={"home_alist"}>最新文章：</div>
                        {this.props.articleData.length>0?this.props.articleData.map((item,index)=>(
                        <div className={"item"} onClick={()=>this.getArticle(item.ID)}>
                            <a className={"title"}>{item.article_title}</a>
                            <div style={{lineHeight:1.1}}>
                            <div className={"status"}>发布于：{item.article_push_time} | 分类：{this.typename(item.article_type)}</div>
                            </div>
                            <div className={"content"}>
                                {item.article_summary}
                            </div>
                        </div>



                        )):<div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>}

                        <div className={"item"} style={{visibility:'hidden'}}>
                            <a className={"title"}>hahahahahaha</a>
                            <div style={{lineHeight:1.1}}>
                                <div className={"status"}>hahahahahahaname</div>
                            </div>
                            <div className={"content"}>
                                hahahahahahaname
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}



const mapStateToProps=(state)=> {
    return{
        articleData:state.home.homeArticleData,
        infoModal:state.home.infoModal,
        payModal:state.home.payModal
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        home_article_data:bindActionCreators(home_article_data,dispatch),
        open_info_model:bindActionCreators(open_info_model,dispatch),
        close_info_model:bindActionCreators(close_info_model,dispatch),
        open_pay_model:bindActionCreators(open_pay_model,dispatch),
        close_pay_model:bindActionCreators(close_pay_model,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);