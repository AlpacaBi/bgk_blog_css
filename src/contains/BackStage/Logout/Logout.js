import React from 'react'
import {Button,Col,Row} from 'react-bootstrap'
import pic_logout from '../../../images/logout.jpg'



export default class Logout extends React.Component{

    adminLogOut=()=>{
        fetch('/apis/adminLogOut',
            {
                method: "GET",
                credentials: 'include',
            }).then(
            this.props.history.push('/adminlogin')
        )
    }

    render(){
        return(

            <div>

                <Row>
                <Col smOffset={4} sm={2} >
                    <img src={pic_logout}/>
                </Col>
                </Row>

                <Row>
                <Col smOffset={6} sm={2} >
                    <Button bsStyle="danger" block onClick={this.adminLogOut}>溜了溜了</Button>
                </Col>
                </Row>

            </div>

        )
    }

}