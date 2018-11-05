import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import '../../css/WeekShare/WeekShare.css'
import loading from '../../images/loading.gif'
import {withRouter} from "react-router-dom";


import {actions} from "../../reducers/WeekShareReudcer";




const {
    get_share_data,
    get_share_list_data,
  } =actions




class WeekShare extends React.Component{



    componentDidMount(){
        this.props.get_share_list_data()
        console.log(this.props.share_data)
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
                        {this.props.shareList_data.length>0?this.props.shareList_data.map((item,index)=>(
                            <div className={"share_list_item"}
                                 id={"shareid"}
                                 onClick={()=>this.props.get_share_data(item.ID)}>
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
                    {this.props.share_data.length>0?this.props.share_data.map((item,index)=>(
                    <div className={"share_content_back"}>
                            <div className={"share_context"}>
                                <div className={"share_context_title"}>{item.share_title}</div>
                                <div className={"share_context_text"}
                                     dangerouslySetInnerHTML={{__html:item.share_context}}>
                                </div>
                            </div>
                    </div>
                    )):

                        <div className={"share_content_back"}>
                            <div className={"share_context"}>
                                <div style={{textAlign:'center',margin:'20px',color:'black',padding:'30px',fontSize:'20px'}}>
                                    写这个东西，是因为当今是个快节奏的世界，很多东西稍瞬即逝，也许你今天学的东西，几年后就是过时的技术。为了不被这个世界落下，我们必须接受新事物和新思想，同时也要了解过去，所以通过写每周分享，来总结我这周以来，究竟了解到了什么资讯、世界动态和思想。
                                    <br/><br/>

                                    <div style={{fontSize:'40px'}}><b>Keep Learning，Keep Knowing，Keep Walking</b></div>
                                </div>
                            </div>
                        </div>
                        }
                </div>
            </div>

                <div className={'mo-week'}>
                    <div className={"share_text"}>
                        这里记录过去一周，我看到的值得分享的东西，每周日发布
                    </div>

                    <div className={"share_list"}>
                        {this.props.shareList_data.length>0?this.props.shareList_data.map((item,index)=>(
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

const mapStateToProps=(state)=> {
    return{
        share_data:state.weekshare.share_data,
        shareList_data:state.weekshare.shareList_data,
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        get_share_data:bindActionCreators(get_share_data,dispatch),
        get_share_list_data:bindActionCreators(get_share_list_data,dispatch),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekShare);