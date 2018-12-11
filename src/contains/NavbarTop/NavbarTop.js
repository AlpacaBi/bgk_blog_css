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
                        <div className="dropdown">
                            <div className={"dropbtn"}>Gay Inc.</div>
                            <div className="dropdown-content">
                                <a href={"http://gayhub.fun" } target={"_blank"} id={'fui-gayhub'}>GayHub♂</a>
                                <a href={"http://gaymail.fun"} target={"_blank"} id={'fui-gaymail'}>GayMail♂</a>
                                <a href={"http://gayeditor.fun"} target={"_blank"} id={'fui-gayeditor'}>GayEditor♂</a>
                                <a href={"http://gaycloud.fun"} target={"_blank"} id={'fui-gaycloud'}>GayCloud♂</a>
                            </div>
                        </div>



                    </ul>
                </div>

                <div className={"mo-header"}>
                    <div className={'mo-logo'}>Alpaca Bi的个人网站</div>
                </div>
            </div>

        )
    }
}