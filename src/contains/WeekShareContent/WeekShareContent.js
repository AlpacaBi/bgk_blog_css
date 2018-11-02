import React from 'react'
import '../../css/WeekShareContent/WeekShareContent.css'
import loading from '../../images/loading.gif'


import {connect} from 'react-redux'
import {actions} from "../../reducers/WeekShareContentReducer";
import {bindActionCreators} from 'redux'
const {get_min_share_data} =actions




class WeekShareContent extends React.Component{

    componentDidMount(){
        this.props.get_min_share_data(this.props.match.params.id)
    }


    render(){
        return(
            <div>
                <div className="mo-WeekshareContent">

                    {this.props.min_share_data.length>0?this.props.min_share_data.map((item,index)=>(
                        <div className={"share_content_back"}>

                            <div className={"share_context"}>
                                <div className={"share_context_title"}>{item.share_title}</div>
                                <div className={"share_context_text"}
                                     dangerouslySetInnerHTML={{__html:item.share_context}}>
                                </div>
                            </div>

                        </div>
                    )):<div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>}
                </div>
            </div>

        )
    }

}

const mapStateToProps=(state)=> {
    return{
        min_share_data:state.weeksharecontent.min_share_data,
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        get_min_share_data:bindActionCreators(get_min_share_data,dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekShareContent);

