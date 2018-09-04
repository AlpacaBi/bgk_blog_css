import React from 'react'
import {Modal,Panel,Row,Col,PanelGroup,Carousel,Image,Button} from 'react-bootstrap'

import pic_touxiang          from '../../images/touxiang.png'
import pic_react             from '../../images/carousel/react.png'
import pic_react_redux       from '../../images/carousel/react-redux.png'
import pic_react_bootstrap   from '../../images/carousel/react-bootstrap.png'
import pic_react_router      from '../../images/carousel/react-router.png'
import pic_express           from '../../images/carousel/express.png'
import pic_braftediter       from '../../images/carousel/braftediter.png'

import pay from '../../images/pay.png'





export default class Home extends React.Component{


    constructor(){
        super();
        this.state=({
            data:[],
            showModal: false,
            moneyModal: false,
            textModal: false,
            a_data:[]
        })
    }
    componentDidMount(){
        this.getHomeListData()
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

    getArticles=(id)=>{
        this.textOpen()
        fetch('/apis/getArticles?id='+id,
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                a_data:eval(json)
            })
        })

    }



    close=()=>{this.setState({ showModal: false });}
    open=()=>{this.setState({ showModal: true });}

    textClose=()=>{this.setState({ textModal: false });}
    textOpen=()=>{this.setState({ textModal: true });}

    moneyClose=()=>{this.setState({ moneyModal: false });}
    moneyOpen=()=>{this.setState({ moneyModal: true });}

    render(){



        return(

            <div>

                <Row>
                    <Col smOffset={1} sm={10} >
                        <Carousel>
                            <Carousel.Item>
                                <a id={"creact"} href={'https://reactjs.org/'} target="_blank">
                                    <img width={2600} height={596} alt='react' src={pic_react } />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a id={"creactredux"} href={'https://www.npmjs.com/package/react-redux-self'} target="_blank">
                                    <img width={2600} height={596} alt='react-redux' src={pic_react_redux} />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a id={"creactbootstrap"} href={'https://react-bootstrap.github.io/'} target="_blank">
                                <img width={2600} height={596} alt='react-bootstrap' src={pic_react_bootstrap} />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a id={"creactrouter"} href={'https://www.npmjs.com/package/react-router'} target="_blank">
                                <img width={2600} height={596} alt='react-router' src={pic_react_router} />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a id={"cexpress"} href={'http://expressjs.com/'} target="_blank">
                                <img width={2600} height={596} alt='express' src={pic_express} />
                                </a>
                            </Carousel.Item>
                            <Carousel.Item>
                                <a id={"cbraft"} href={'https://www.npmjs.com/package/braft-editor'} target="_blank">
                                <img width={2600} height={596} alt='braft-editor' src={pic_braftediter } />
                                </a>
                            </Carousel.Item>
                        </Carousel>
                        <h4 style={{textAlign:'center'}}>↑本博客系统开发用到的框架和组件↑</h4>

                    </Col>
                </Row>

                <Row>

                    <Col smOffset={1} sm={2}>
                        <Image src={pic_touxiang} rounded responsive id={"touxiang"}/>
                        <h3>Alpaca Bi</h3>
                        <h5 style={{color:'grey'}}>talk and code is cheap，show me the money</h5>
                        <Button
                            id={"bgkmessage"}
                            bsStyle="primary"
                            onClick={this.open} block>
                            联系本人
                        </Button>
                        <Button
                            id={"money"}
                            bsStyle="success"
                            onClick={this.moneyOpen} block>
                            给我打钱
                        </Button>
                    </Col>
                    <Col  sm={6} >

                        <h1 id={"newArt"}>最新文章：</h1>







                        <PanelGroup accordion id="accordion-example" bsStyle="info">
                            {this.state.data.length>0?this.state.data.map((item,index)=>(
                            <Panel eventKey={index}>
                                <Panel.Heading>
                                    <Panel.Title toggle>{item.article_title}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    {item.article_summary}<hr/>
                                    发表于：{item.article_push_time}<br/>
                                    <a onClick={()=>this.getArticles(item.ID)}>阅读全文</a>

                                </Panel.Body>
                            </Panel>
                            )):<div><h2>没有数据，快去写博客吧</h2></div>}
                        </PanelGroup>
                    </Col>
                </Row>



                <Modal show={this.state.moneyModal}  onHide={this.moneyClose}>

                    <Modal.Header closeButton>
                        <Modal.Title><b>Would you like to give 0.01 dollar to help put a hamster through college?</b>（南方公园梗，怕有人看不懂）
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{textAlign:'center'}}>
                            <img src={pay} id={"pay"}/>
                        </div>




                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.moneyClose} id={"nonono"}>狠心拒绝</Button>
                    </Modal.Footer>

                </Modal>




                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>联系方式</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>联系微信：</h4>
                        <p><b id={"fui-weixin"}>workbiguokang</b></p>
                        <h4>联系邮箱：</h4>
                        <p><b id={"fui-mailbox"}>biguokang@outlook.com</b></p>
                        <h4>github地址</h4>
                        <p><a id={"fui-github"} href={"https://github.com/biguokang"} target="_blank"><b>https://github.com/biguokang</b></a></p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.close}>关闭</Button>
                    </Modal.Footer>
                </Modal>



                {this.state.a_data.length>0?this.state.a_data.map((item,index)=>(
                <Modal show={this.state.textModal} onHide={this.textClose} bsSize="large" aria-labelledby="contained-modal-title-lg">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{item.article_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{item.article_summary}</h4><br/>
                        <div dangerouslySetInnerHTML={{__html:item.article_context}}></div>
                        <br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <h5>发表于：{item.article_push_time}</h5><br/>
                        </Modal.Footer>

                </Modal>)):(<div></div>)}

            </div>

        )
    }

}