import React from 'react'
import '../../css/Article/Article.css'
import {withRouter} from 'react-router-dom'
import Select from 'react-select'


import loading from '../../images/loading.gif'


import {connect} from 'react-redux'
import {actions} from "../../reducers/ArticleReducer";
import {bindActionCreators} from 'redux'
import article from "../../reducers/ArticleReducer";
const {get_article_list_data,set_select_all_list,set_select_list} =actions




const options = [
    { value: 'all', label: '所有文章' },
    { value: 'javascript', label: 'JavaScript和ES6' },
    { value: 'java', label: 'Java和Java框架' },
    { value: 'htmlcss', label: 'HTML&CSS' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'cpp', label: 'C和C++' },
    { value: 'data', label: '数据结构和算法' },
    { value: 'other', label: '其他杂碎' }
];



class Article extends React.Component{


    componentDidMount(){
        this.props.get_article_list_data('all');
        this.props.set_select_all_list()
    }

    getArticle=(id)=>{
        this.props.history.push('/article/'+id)
    }

    typename=(key) =>{
        let typen;
        switch (key){
            case 'javascript':
                typen='JavaScript和ES6'; break;
            case 'java':
                typen='Java和Java框架'; break;
            case 'htmlcss':
                typen='HTML&CSS'; break;
            case 'react':
                typen='React'; break;
            case 'vue':
                typen='Vue'; break;
            case 'angular':
                typen='Angular'; break;
            case 'cpp':
                typen='C和C++'; break;
            case 'data':
                typen='数据结构和算法'; break;
            case 'other':
                typen='其他杂碎'; break;
        }
        return typen
    }



    handleChange = (selectedOption) => {
        this.props.set_select_list({ selectedOption });
        this.props.get_article_list_data(selectedOption.value);
    }





    render(){

        const { selectedOption } = this.props;


        return(
            <div>
                <div className={'articless'}>
                <div className={"article_sidebar"}>
                    <div className={"article_sidebar_type_name"}>分类</div>
                    <div className={"title_list"}>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('all')}
                             id={'aall'}>所有文章</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('javascript')}
                             id={'ajavascript'}>JavaScript和ES6</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('htmlcss')}
                             id={'ahtmlcss'}>HTML&CSS</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('react')}
                             id={'areact'}>React</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('vue')}
                             id={'avue'}>Vue</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('angular')}
                             id={'aangular'}>Angular</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('java')}
                             id={'ajava'}>Java和Java框架</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('cpp')}
                             id={'acpp'}>C和C++</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('data')}
                             id={'adata'}>数据结构和算法</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('other')}
                             id={'aother'}>其他杂碎</div>
                        <div className={"title_list_item"}
                             onClick={()=>this.props.get_article_list_data('all')}style={{visibility:'hidden'}}>...</div>
                    </div>
                </div>




                <div className={"article_main"}>
                    <div className={"article_main_list"}>
                        {this.props.ArticleListData.length>0?this.props.ArticleListData.map((item,index)=>(
                            <div className={"item"} onClick={()=>this.getArticle(item.ID)} key={index}>
                                <a  className={"title"} >{item.article_title}</a>
                                <div className={"status"}>发布于：{item.article_push_time} | 分类：{this.typename(item.article_type)}</div>
                                <div className={"content"}>
                                    {item.article_summary}
                                </div>
                            </div>
                        )):<div style={{width:'100%',textAlign:'center',paddingTop:'25px'}}><img src={loading} width={'25%'}/></div>}
                    </div>
                </div>
                </div>


                <div className={'mo-articless'} style={{marginTop:60}}>
                    <Select
                        className={'sele'}
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        isSearchable={this.props.searstate}
                    />

                    <div className={"article-list"}>
                        {this.props.ArticleListData.length>0?this.props.ArticleListData.map((item,index)=>(
                        <div className={"item"} onClick={()=>this.getArticle(item.ID)} key={index}>
                            <a className={"title"}>{item.article_title}</a>
                            <div className={"status"}>发布于：{item.article_push_time} | 分类：{this.typename(item.article_type)}</div>
                        </div>)):
                            <div style={{width:'100%',textAlign:'center',paddingTop:'10px'}}><img src={loading} width={'50%'}/></div>}



                        <div className={"item"} style={{visibility:'hidden'}}>
                            <a className={"title"}>hahahahahahaha</a>
                            <div className={"status"}>发布于：hahahahahahaha</div>
                        </div>
                    </div>
                </div>


            </div>




        )
    }

}

withRouter(Article)

const mapStateToProps=(state)=> {
    return{
        ArticleListData:state.article.ArticleListData,
        selectedOption:state.article.selectedOption,
        searstate:state.article.searstate
    }
}

const mapDispatchToProps=(dispatch)=> {
    return{
        get_article_list_data:bindActionCreators(get_article_list_data,dispatch),
        set_select_all_list:bindActionCreators(set_select_all_list,dispatch),
        set_select_list:bindActionCreators(set_select_list,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);

