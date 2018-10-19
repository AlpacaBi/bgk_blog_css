import React from 'react'
import lab from '../../images/lab.jpg'

export default class Lab extends React.Component{

    render(){
        return(
                <div style={{textAlign:"center",color:'white'}}>
                    <div style={{marginTop:"50px",fontSize:'25px'}}>这里主要把我的个人项目在线部署在这里，目前正在把图片识别项目和智能ai聊天项目部署过来</div>
                    <img src={lab} height={"60%"}  id={'working'} />
                    <div style={{fontSize:'25px'}}>忙碌施工中。</div>
                </div>
        )
    }

}