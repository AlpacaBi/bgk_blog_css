import React from 'react'

import {Nav, NavItem,ListGroup,ListGroupItem,Col,Row,Panel} from 'react-bootstrap'






export default class Article extends React.Component{

    constructor(){
        super();
        this.state=({
            data:[],
            a_data:[],
            tab:''
        })
    }

    componentDidMount(){
        this.getArticleListData('all');
        this.setState({tab:'所有文章：'});
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
                a_data:eval(json)
            })
        })

    }



    handleSelect=(selectedKey) =>{
        switch (selectedKey){
            case 'all':
                this.setState({tab:'所有文章：'}); break;
            case 'javascript':
                this.setState({tab:'javascript和es6：'}); break;
            case 'java':
                this.setState({tab:'java和java框架：'}); break;
            case 'htmlcss':
                this.setState({tab:'html&css：'}); break;
            case 'react':
                this.setState({tab:'react：'}); break;
            case 'vue':
                this.setState({tab:'vue：'}); break;
            case 'angular':
                this.setState({tab:'angular：'}); break;
            case 'cpp':
                this.setState({tab:'C和C++：'}); break;
            case 'hardware':
                this.setState({tab:'硬件：'}); break;
            case 'other':
                this.setState({tab:'其他杂碎：'}); break;

        }
        this.getArticleListData(selectedKey);

    }

    getArticleListData=(tabid)=>{
        fetch('/apis/getArticleList?tabid='+tabid,
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
            if(this.state.data.length>0){
                this.getArticles(this.state.data[0].ID)
            }else{
                this.setState({
                    a_data:[]
                })
            }
        })
    }



    render(){
        return(

            <div>
                <Nav bsStyle="pills" bsStyle="primary" justified onSelect={this.handleSelect} >
                    <NavItem eventKey="all" href="" id={"aall"}><b>所有文章</b></NavItem>
                    <NavItem eventKey="javascript" href="" id={"ajavascript"}>javascript和es6</NavItem>
                    <NavItem eventKey="java" href="" id={"ajava"}>java和java框架</NavItem>
                    <NavItem eventKey="htmlcss" href="" id={"ahtmlcss"}>html&css</NavItem>
                    <NavItem eventKey="react" href="" id={"areact"}>react</NavItem>
                    <NavItem eventKey="vue" href="" id={"avue"}>vue</NavItem>
                    <NavItem eventKey="angular" href="" id={"aangular"}>angular</NavItem>
                    <NavItem eventKey="cpp" href="" id={"acpp"}>C和C++</NavItem>
                    <NavItem eventKey="hardware" href="" id={"ahardware"}>硬件</NavItem>
                    <NavItem eventKey="other" href="" id={"aother"}>其它杂碎</NavItem>
                </Nav>




                <Row>
                    <Col smOffset={1} sm={2} >

                        <h3 style={{textAlign:'center'}}>{this.state.tab}</h3><hr/>

                        <Panel collapsible defaultExpanded header="Panel heading">
                <ListGroup style={{textAlign:'center'}}>
                    {this.state.data.length>0?this.state.data.map((item,index)=>(
                        <ListGroupItem onClick={()=>this.getArticles(item.ID)} key={index}>{index+1}.<div className={"artt"} style={{textAlign:'center'}}>{item.article_title}</div></ListGroupItem>
                    )):<div><h2>加载中。。。</h2></div>}
                </ListGroup>
                        </Panel>
                    </Col>



                    <Col sm={6} >
                        <h3 style={{textAlign:'center'}}>博客正文：</h3><hr/>
                        {this.state.a_data.length>0?this.state.a_data.map((item,index)=>(
                            <div key={index} >
                                <h1>{item.article_title}</h1><br/>
                                <h5>发表于：{item.article_push_time}</h5><br/>
                                <h4>{item.article_summary}</h4><br/>
                                <div dangerouslySetInnerHTML={{__html:item.article_context}}></div>
                                <br/>


                            </div>
                            )):<div><h2>加载中。。。</h2></div>}
                    </Col>

                </Row>
            </div>

        )
    }

}