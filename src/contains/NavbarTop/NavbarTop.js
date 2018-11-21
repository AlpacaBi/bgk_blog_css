import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../css/NavbarTop/NavbarTop.css'




export default class NavbarTop extends React.Component{
    render(){
        return(
            <div>
                <div className={'header'}>
                    <div className={'logo'}>Alpaca Bi的个人网站</div>
                    <ul className={'navbar'}>
                        <li><NavLink to={'/'} id={'fui-home'}><div>首页</div></NavLink></li>
                        <li><NavLink to={'/article'} id={'fui-article'}><div>博客文章</div></NavLink></li>
                        <li><NavLink to={'/messagebroad'} id={'fui-messageborad'}><div>交流区</div></NavLink></li>
                        <li><NavLink to={'/weekshare'} id={'fui-weekshare'}><div>每周分享</div></NavLink></li>
                        <li><NavLink to={'/lab'} id={'fui-lab'}><div>实验室</div></NavLink></li>
                        <li  id={'fui-gayhub'}><a href={"http://gayhub.fun"} target={"_blank"}>GayHub</a></li>
                        <li  id={'fui-gaymail'}><a href={"http://gaymail.fun"} target={"_blank"}>GayMail</a></li>
                        <li  id={'fui-gaycloud'}><a href={"http://gaycloud.fun"} target={"_blank"}>GayCloud</a></li>
                    </ul>
                </div>

                <div className={"mo-header"}>
                    <div className={'mo-logo'}>Alpaca Bi的个人网站</div>
                </div>
            </div>

        )
    }
}