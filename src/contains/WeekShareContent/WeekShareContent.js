import React from 'react'
import '../../css/WeekShareContent/WeekShareContent.css'
import loading from '../../images/loading.gif'
import {get} from '../../ajax/index'






export default class WeekShareContent extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            share_data:[],
        })


    }

    componentDidMount(){
        this.getShares(this.props.match.params.id)
    }





    getShares=(id)=>{

        get('/getShares?id='+id).then((res)=>{
            this.setState({
                share_data:res
            })
        })

    }


    render(){
        return(
            <div>
                <div className="mo-WeekshareContent">

                    {this.state.share_data.length>0?this.state.share_data.map((item,index)=>(
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

