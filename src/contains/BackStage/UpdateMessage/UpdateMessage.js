import React from 'react'
import {Button,Col,Table} from 'react-bootstrap'



export default class UpdateMessage extends React.Component{

    constructor(){
        super();
        this.state=({
            data:[],
        })
    }

    componentDidMount(){
        this.getMessageListData()
    }


    delMessage=(delid)=>{
        let id = delid;
        let dataid = 'id=' + id;
        fetch('/apis/delMessage', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataid
        }).then(()=> {
            this.getMessageListData()
        }, function (error) {
            console.log(error)
        });
    }

    getMessageListData=()=>{
        fetch('/apis/getMessageList',
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


                    <h1>管理留言板:</h1>
                    <hr/>

                    <Table responsive>

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>用户</th>
                            <th>留言</th>
                            <th>操作</th>
                        </tr>
                        </thead>



                        <tbody>
                        {this.state.data.length>0?this.state.data.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.ID}</td>
                                <td>{item.user_name}</td>
                                <td>{item.message}</td>
                                <td>


                                    <Button bsStyle="danger"
                                            onClick={()=>this.delMessage(item.ID)}>删除
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