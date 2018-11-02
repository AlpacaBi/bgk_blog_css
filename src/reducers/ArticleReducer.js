const initialState={
    ArticleListData:[],
    selectedOption: null,
    searstate:false
};
export const actionTypes = {
    GET_ARTICLE_LIST_DATA:'GET_ARTICLE_LIST_DATA',
    SET_ARTICLE_LIST_DATA:'SET_ARTICLE_LIST_DATA',

    SET_SELECT_ALL_LIST:'SET_SELECT_ALL_LIST',
    SET_SELECT_LIST:'SET_SELECT_LIST'
};
export const actions = {
    get_article_list_data:function (n) {
        return{
            type:actionTypes.GET_ARTICLE_LIST_DATA,
            payload:n
        }
    },
    set_select_all_list:function () {
        return{
            type:actionTypes.SET_SELECT_ALL_LIST
        }
    },
    set_select_list:function (n) {
        return{
            type:actionTypes.SET_SELECT_LIST,
            payload:n
        }
    },

};

const article=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.SET_SELECT_ALL_LIST:
            return{...state,selectedOption:{ value: 'all', label: '所有文章' }};
        case actionTypes.SET_SELECT_LIST:
            return{...state,selectedOption:action.payload};
        case actionTypes.SET_ARTICLE_LIST_DATA:
            return{...state,ArticleListData:action.data};

        default:return state;
    }
}

export default article

