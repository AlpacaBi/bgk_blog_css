import React from 'react'
import '../../css/Home/Home.css'
import Modal from 'react-modal';

import pic_touxiang          from '../../images/touxiang.png'
import cao from '../../images/caonima.gif'
import two from '../../images/two.jpg'
import pay from '../../images/pay.png'

import loading from '../../images/loading.gif'


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

export default class Home extends React.Component{


    constructor(){
        super();
        this.state=({
            data:[],
            modalIsOpen: false,
            modalIsOpen2: false,
            a_data:[]
        })
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openModal2 = this.openModal2.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
    }
    componentDidMount(){
        this.getHomeListData()
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



    getHomeListData=()=>{
        fetch('/apis/homeArticleList',
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
                <div className={"side-bar"}>
                        <div className={"header1"}>
                            <img id={'touxiang'} className={"avatar"} src={pic_touxiang} width={"80%"} height={"80%"}/>
                            <div id={'homename'} className={"logo_name"}>Alpaca Bi</div>
                            <div id={'homeinfo'} className={"intro"}>talk and code is cheap,show me the money</div>
                        </div>
                        <div className={"contant"}>
                            <div >工作微信：</div>
                            <span><b id={"fui-weixin"} onClick={this.openModal}>workbiguokang</b></span>

                            <div>工作邮箱：</div>
                            <span><b id={"fui-mailbox"}>biguokang@outlook.com</b></span>

                            <div>github：</div>
                            <span><a id={"fui-github"} href={"https://github.com/biguokang"}
                                     target={"_blank"}><b>https://github.com/biguokang</b></a></span>
                        </div>
                </div>

                    <div className={"caonima"} id={'pypy'} onClick={this.openModal2}>
                        <img src={cao} width="100%"/>
                        <div style={{textAlign:'center',color:'white'}}>求py交易，点击草泥马即可赞助我</div>
                    </div>

                <div className={'mains'}>
                    <div className={'article-list'}>
                        <div className={"home_alist"} id={'newArt'}>最新文章：</div>
                        <div>
                            {this.state.data.length>0?this.state.data.map((item,index)=>(
                                <div className={'item'} onClick={()=>this.getArticle(item.ID)}>
                                    <a  className={"title"} >{item.article_title}</a>
                                    <div className={"status"}>发布于：{item.article_push_time} | 分类：{this.typename(item.article_type)}</div>
                                    <div className={"content"}>
                                        {item.article_summary}
                                    </div>
                                </div>
                            )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}
                        </div>
                    </div>
                </div>


                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <img src={two} style={{width:'90%',margin:'5%'}}/>
                    </Modal>

                    <Modal
                        isOpen={this.state.modalIsOpen2}
                        onRequestClose={this.closeModal2}
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
                                    <div style={{fontSize:'12px'}}>biguokang@outlook.com</div>
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
                        {this.state.data.length>0?this.state.data.map((item,index)=>(
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