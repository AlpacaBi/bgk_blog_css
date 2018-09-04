import React from 'react'
import {Navbar} from 'react-bootstrap'
import upyun from '../../images/upyun.png'


export default class NavbarBottom extends React.Component{


    render(){
        return(

            <Navbar inverse fixedBottom>
                <h6 style={{textAlign:'center'}}>
                    <a style={{color:'white'}} href={"https://www.upyun.com"} target={"_blank"} id={"upyun"}>
                        本站cdn服务提供商：<img width={44} height={22} src={upyun}></img>
                    </a><br/>
                    <a style={{color:'white'}} id={"beian"} href={"http://www.miitbeian.gov.cn"} target={"_blank"}>
                        Copyright©1995-2018 biguokang All rights reserved.备案号：粤ICP备17017545号
                    </a>
                </h6>
            </Navbar>

        )
    }

}