import React from 'react'
import {Col,ListGroupItem,ListGroup,Button,Row,ControlLabel,FormGroup,FormControl,HelpBlock,Modal} from "react-bootstrap"




import BraftEditor from 'braft-editor'

import 'braft-editor/dist/braft.css'




const myUploadFn1 = (param) => {
    const serverURL = '/apis/blogImage'
    const xhr = new XMLHttpRequest
    const fd = new FormData()


    const successFn = (response) => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
            url: eval(xhr.responseText)

        })

        console.log(xhr.responseText)
    }

    const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
            msg: 'unable to upload.'
        })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)

}


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class UpdateArticle extends React.Component{
    constructor(){
        super();
        this.state=({
            data:[],
            a_data:[],
            showModal: false
        })
    }

    close=()=>{this.setState({ showModal: false });}
    open=()=>{this.setState({ showModal: true });}


    ArticleUpdate=()=> {

        let id = this.state.a_data[0].ID;
        let title = this.title.value;
        let summary = this.summary.value;
        let banner = this.banner.value;
        let context = this.contexts.getHTMLContent();


        let url = "/apis/updateArticle";//接口地址

        let data = 'id=' + id + '&title=' + title + '&summary=' + summary+'&type=' + banner+'&context=' + context;
        fetch(url, {method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}).then(

            this.getUpdateListData

        )

        this.close();
        this.setState({a_data:[]})

    }


    componentDidMount(){
        this.getUpdateListData()
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

    getUpdateListData=()=>{
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




    render(){
        return(

            <div>
                <Row>

                    <Col sm={3}>
                        <h3 style={{textAlign:'center'}}>选择修改文章：</h3><hr/>
                        <ListGroup style={{textAlign:'center'}}>
                            {this.state.data.length>0?this.state.data.map((item,index)=>(
                                <ListGroupItem onClick={()=>this.getArticles(item.ID)}
                                               key={index}>{index+1}.
                                    <div style={{textAlign:'center'}}>
                                        {item.article_title}</div>
                                </ListGroupItem>
                            )):<div><h2>读取中</h2></div>}
                        </ListGroup>
                    </Col>

                    <Col sm={9}>



                        {this.state.a_data.length>0?<div>
                        <h1>修改博客:</h1>
                        <hr/>

                        <form>
                            <h3>文章ID：{this.state.a_data[0].ID}</h3>


                            <FieldGroup
                                id="formControlsTitle"
                                type="text"
                                label="标题"
                                value={this.state.a_data[0].article_title}
                                onChange={(e) => {
                                    let datas=this.state.a_data;
                                    datas[0].article_title=e.target.value;
                                    this.setState({a_data:datas});
                                }
                                }
                                inputRef={ref => {this.title=ref;}}

                            />
                            <FieldGroup
                                id="formControlsSummary"
                                type="text"
                                label="文章简介"
                                value={this.state.a_data[0].article_summary}
                                onChange={(e) => {
                                    let datas=this.state.a_data;
                                    datas[0].article_summary=e.target.value;
                                    this.setState({a_data:datas});
                                }
                                }
                                inputRef={ref => {this.summary=ref;}}
                            />


                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>文章分类</ControlLabel>
                                <FormControl componentClass="select"
                                             placeholder="select"
                                             value={this.state.a_data[0].article_type}
                                             onChange={(e) => {
                                                 let datas=this.state.a_data;
                                                 datas[0].article_type=e.target.value;
                                                 this.setState({a_data:datas});
                                             }
                                             }
                                             inputRef={ref => {this.banner=ref;}}>
                                    <option value="javascript">javascript和es6</option>
                                    <option value="java">java和java框架</option>
                                    <option value="htmlcss">html&css</option>
                                    <option value="react">react</option>
                                    <option value="vue">vue</option>
                                    <option value="angular">angular</option>
                                    <option value="cpp">C和C++</option>
                                    <option value="hardware">硬件</option>
                                    <option value="other">其它杂碎</option>
                                </FormControl>
                            </FormGroup>


                            <FormGroup controlId="formControlsTextarea" >
                                <ControlLabel>正文</ControlLabel>

                                <BraftEditor
                                    ref={ref => this.contexts=ref}
                                    height={500}
                                    contentFormat={'html'}
                                    contentId={this.state.a_data[0].ID}
                                    initialContent={this.state.a_data[0].article_context}
                                    style={{border:3,color:"black"}}
                                    media={{uploadFn: myUploadFn1}}
                                />

                            </FormGroup>


                            <Button type="submit" bsStyle="success" onClick={this.open}>
                                确认修改
                            </Button>

                        </form>
                        </div>:<div>haha</div>}



                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>确定要修改吗吗？？？</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>真的要改？不检查下吗？</h4>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.ArticleUpdate} bsStyle="success">确认</Button>
                                <Button onClick={this.close}>取消</Button>
                            </Modal.Footer>
                        </Modal>


                    </Col>


                </Row>

            </div>

        )
    }

}