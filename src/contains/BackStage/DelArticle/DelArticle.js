import React from 'react'
import {Table,Button,Col} from 'react-bootstrap'



export default class DelArticle  extends React.Component{

    constructor(){
        super();
        this.state=({
            data:[],
        })
    }

    componentDidMount(){
        this.getDelListData()
    }

    delArticle=(delid)=>{


        let id = delid;
        let dataid = 'id=' + id;
        fetch('/apis/delArticle', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataid
        }).then( () =>{
            this.getDelListData()

        }).then((error)=>{
            console.log(error)
        });





    }

    getDelListData=()=>{
        fetch('/apis/delArticleList',
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
                <Col smOffset={1}>


                    <h1>删除文章:</h1>
                    <hr/>

                    <Table responsive>

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                        </thead>



                        <tbody>
                        {this.state.data.length>0?this.state.data.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td>{item.article_title}</td>
                                <td>
                                    <Button bsStyle="danger"
                                            onClick={()=>this.delArticle(item.ID)}>删除
                                    </Button>
                                </td>
                            </tr>
                        )):<div><h2>读取中</h2></div>}
                        </tbody>
                    </Table>
                </Col>


            </div>
        )
    }

}