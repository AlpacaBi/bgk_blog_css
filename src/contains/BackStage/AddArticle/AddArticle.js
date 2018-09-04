import React from 'react'

import {Button,FormGroup,ControlLabel,FormControl,HelpBlock,Modal,Col} from 'react-bootstrap'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'




function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const myUploadFn = (param) => {
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


export default class AddArticle extends React.Component{

    constructor(){
        super();
        this.state=({
            showModal: false
        })
    }

    close=()=>{this.setState({ showModal: false });}
    open=()=>{this.setState({ showModal: true });}




    ArticlePush=()=> {

        let title = this.title.value;
        let summary = this.summary.value;
        let banner = this.banner.value;
        let context = this.contexts.getHTMLContent();


        let url = "/apis/addArticle";//接口地址

        let data = 'title=' + title + '&summary=' + summary+'&type=' + banner+'&context=' + context;
        fetch(url, {method: "POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data}
        ).then((response)=> {
            alert('添加成功');
        }).then((err)=>{
            alert('添加失败，请稍后重试');
        })

        this.close();
        this.title.value='';
        this.summary.value='';
        this.banner.value='javascript';
        this.contexts.clear();
    }





    render(){
        return(

            <div>
                <Col smOffset={1}>

                <h1>写新博客:</h1>
                <hr/>

                <form>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="标题"
                        placeholder="请输入标题"
                        inputRef={ref => {this.title=ref;}}

                    />
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="文章简介"
                        placeholder="请输入简介（50字以内）"
                        inputRef={ref => {this.summary=ref;}}
                    />


                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>文章分类</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" inputRef={ref => {this.banner=ref;}}>
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

                        <div style={{borderStyle: 'solid', borderWidth: 1,color:'grey'}}>

                        <BraftEditor
                            ref={ref => this.contexts=ref}
                            height={500}
                            contentFormat={'html'}
                            initialContent={'开始写博客吧'}
                            media={{uploadFn: myUploadFn}}
                        />

                        </div>





                    </FormGroup>


                    <Col smOffset={5} sm={2}>


                        <Button type="submit" bsStyle="success"
                                onClick={this.open}  block>
                            提交
                        </Button>
                    </Col>
                    <hr/><br/><br/><br/>

                </form>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>确定要发布吗？？？</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>小伙子别急，最好再检查一遍把</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.ArticlePush} bsStyle="success">发布</Button>
                        <Button onClick={this.close}>取消</Button>
                    </Modal.Footer>
                </Modal>

                </Col>





            </div>

        )
    }

}