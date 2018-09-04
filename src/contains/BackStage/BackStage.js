import React from 'react'
import {NavItem,Nav,Col} from 'react-bootstrap'
import {NavLink,HashRouter as Router,Route,Switch} from 'react-router-dom'



import AddArticle from './AddArticle/AddArticle'
import DelArticle from './DelArticle/DelArticle'
import UpdateArticle  from './UpdateArticle/UpdateArticle'
import UpdateMessage from './UpdateMessage/UpdateMessage'
import UpdateUser from './UpdateUser/UpdateUser'
import Logout from './Logout/Logout'




import AdminLogin from "./AdminLogin";


export default class BackStage extends React.Component{

    constructor(){
        super();
        this.state=({
            loginFlag:false
        })
    }

    componentDidMount(){
        this.getAdminLoginState()
    }

    getAdminLoginState=()=>{
        fetch('/apis/getAdminLogin',
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            if(json=='success'){
                this.setState({loginFlag:true})
            }
            else{
                this.setState({loginFlag:false})
            }
        })
    }



    render(){


        if(this.state.loginFlag){
            return (
                <div>
                    <Col sm={1}>

                            <Nav bsStyle="pills" stacked fixedTop>
                                <NavItem><NavLink to={'/backstage'}>写新文章</NavLink></NavItem>
                                <NavItem><NavLink to={'/backstage/updatearticle'}>修改文章</NavLink></NavItem>
                                <NavItem><NavLink to={'/backstage/delarticle'}>删除文章</NavLink></NavItem>
                                <NavItem><NavLink to={'/backstage/undateuser'}>管理用户</NavLink></NavItem>
                                <NavItem><NavLink to={'/backstage/undatemessage'}>管理留言</NavLink></NavItem>
                                <NavItem><NavLink to={'/backstage/logout'}>注销</NavLink></NavItem>
                            </Nav>

                    </Col>
                    <Col sm={9}>
                        <Router>
                            <Switch>
                                <Route exact path="/backstage" component={AddArticle}/>
                                <Route path="/backstage/updatearticle" component={UpdateArticle}/>
                                <Route path="/backstage/delarticle" component={DelArticle}/>
                                <Route path="/backstage/undateuser" component={UpdateUser}/>
                                <Route path="/backstage/undatemessage" component={UpdateMessage}/>
                                <Route path="/backstage/logout" component={Logout}/>
                            </Switch>
                        </Router>
                    </Col>
                </div>
            )}

            else{
            return (
                <AdminLogin getAdminLoginState={this.getAdminLoginState}/>
            );
            }




    }

}















