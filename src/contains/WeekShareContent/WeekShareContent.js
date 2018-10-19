import React from 'react'
import '../../css/WeekShareContent/WeekShareContent.css'
import loading from '../../images/loading.gif'






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

