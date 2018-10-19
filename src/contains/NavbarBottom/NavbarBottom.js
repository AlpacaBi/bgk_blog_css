import React from 'react'
import '../../css/NavbarBottom/NavbarBottom.css'
import {NavLink} from 'react-router-dom'

import icon_home1 from '../../images/icon/home1.png'
import icon_article1 from '../../images/icon/article1.png'
import icon_msg1 from '../../images/icon/msg1.png'
import icon_share1 from '../../images/icon/share1.png'


export default class NavbarBottom extends React.Component{

    render(){
        return(
            <div>
                <div className={"footer"}>
                    <div className={"footmsg"}>
                        <div id={"beian"}>
                            <a href={"http://www.miitbeian.gov.cn"} target={'_blank'}
                               style={{textDecoration:'none',color:'white'}}>备案号：粤ICP备17017545号</a>
                        </div>
                        <div>
                            Copyright©1995-2018 biguokang All rights reserved.
                        </div>
                    </div>
                </div>

                <div className={"mo-footer"}>
                    <ul className={'navbar'}>
                        <li>
                            <div className={"icon-text"}>
                                <NavLink to={'/'} id={'fui-home'}>
                                <img src={icon_home1}/><br/>
                                </NavLink>
                            </div>
                        </li>

                        <li>
                            <div className={"icon-text"}>
                                <NavLink to={'/article'} id={'fui-article'}>
                                <img src={icon_article1}/><br/>
                                </NavLink>

                            </div>

                        </li>

                        <li>
                            <div className={"icon-text"}>
                                <NavLink to={'/messagebroad'} id={'fui-messageborad'}>
                                <img src={icon_msg1}/><br/>
                                </NavLink>
                            </div>
                        </li>

                        <li>
                            <div className={"icon-text"}>
                                <NavLink to={'/weekshare'} id={'fui-weekshare'}>
                                <img src={icon_share1}/><br/>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </div>









            </div>

        )
    }

}