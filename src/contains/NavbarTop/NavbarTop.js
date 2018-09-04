import React from 'react'
import {Nav,NavItem,Navbar,Button,FormGroup,FormControl} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'




export default class NavbarTop extends React.Component{

    alerr=()=>{
        alert("搜索功能开发中，敬请期待！");
    }

    render(){
        return(

            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"  style={{color:'white'}}>毕国康的个人博客_React版V1.0</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav bsStyle="pills">

                        <NavItem><NavLink to={'/'} id={'fui-home'}><p>首页</p></NavLink></NavItem>
                        <NavItem><NavLink to={'/article'} id={'fui-article'}><p>文章</p></NavLink></NavItem>
                        <NavItem><NavLink to={'/messagebroad'} id={'fui-messageborad'}><p>交流区</p></NavLink></NavItem>
                        <NavItem><NavLink to={'/backstage'} id={'fui-backstage'}><p>后台</p></NavLink></NavItem>

                    </Nav>
                    <Nav pullRight>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl id={'fui-search'} type="text" placeholder="请输入搜索关键字" />
                            </FormGroup>
                            <Button id={'fui-search-btn'} type="submit" bsStyle="primary" onClick={()=>this.alerr()}>搜索</Button>
                        </Navbar.Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }

}