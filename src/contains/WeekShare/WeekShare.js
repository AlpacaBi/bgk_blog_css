import React from 'react'
import '../../css/WeekShare/WeekShare.css'
import loading from '../../images/loading.gif'
import Article from "../Article/Article";
import {withRouter} from "react-router-dom";
export default class WeekShare extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            share_data:[],
            shareList_data:[]
        })
    }

    componentDidMount(){
        this.getShareListData()
    }

    getShareListData=()=>{
        fetch('/apis/getShareList',
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                shareList_data:eval(json)
            })
        })
    }


    getShares=(id)=>{
        fetch('/apis/getShares?id='+id,
            {
                method: "GET",
                credentials: 'include',
            })
            .then((res)=>{
                return res.json()
            }).then((json)=>{
            this.setState({
                share_data:eval(json)

            })
        })
    }



    getShareContent=(id)=>{
        this.props.history.push('/weekshare/'+id)
    }



    render(){
        return(

            <div>
                <div className={'week'}>
                <div className={"share_sidebar"}>
                    <div className={"share_sidebar_type_name"}>每周分享</div>
                    <div className={"share_list"}>
                        {this.state.shareList_data.length>0?this.state.shareList_data.map((item,index)=>(
                            <div className={"share_list_item"}
                                 id={"shareid"}
                                 onClick={()=>this.getShares(item.ID)}>
                                {item.share_title}
                                </div>
                        )):<div><h2>加载中。。。</h2></div>}

                        <div className={"share_list_item"} style={{visibility:"hidden"}}>...</div>
                    </div>
                </div>


                <div className={"share_main"}>
                    <div className={"share_text"}>
                        这里记录过去一周，我看到的值得分享的东西，每周日发布
                    </div>
                    {this.state.share_data.length>0?this.state.share_data.map((item,index)=>(
                    <div className={"share_content_back"}>

                            <div className={"share_context"}>
                                <div className={"share_context_title"}>{item.share_title}</div>
                                <div className={"share_context_text"}
                                     dangerouslySetInnerHTML={{__html:item.share_context}}>
                                </div>

                            </div>


                    </div>
                    )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}

                </div>
            </div>


                <div className={'mo-week'}>

                    <div className={"share_text"}>
                        这里记录过去一周，我看到的值得分享的东西，每周日发布
                    </div>

                    <div className={"share_list"}>
                        {this.state.shareList_data.length>0?this.state.shareList_data.map((item,index)=>(
                            <div className={"share_list_item"}
                                 onClick={()=>this.getShareContent(item.ID)}>
                                {item.share_title}
                            </div>
                        )):<div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>}

                        <div className={"share_list_item"} style={{visibility:"hidden"}}>...</div>
                    </div>
                </div>

            </div>

        )
    }

}

withRouter(WeekShare)