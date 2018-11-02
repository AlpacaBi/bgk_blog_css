const initialState={
    loginModal:false,
    vsrModal:false,
    moVsrModal:false,

    article_data:[],
    comment_data:[]
};
export const actionTypes = {
    OPEN_LOGIN_MODAL:'OPEN_LOGIN_MODAL',
    CLOSE_LOGIN_MODAL:'CLOSE_LOGIN_MODAL',

    OPEN_VSR_MODAL:'OPEN_VSR_MODAL',
    CLOSE_VSR_MODAL:'CLOSE_VSR_MODAL',

    OPEN_MOVSR_MODAL:'OPEN_MOVSR_MODAL',
    CLOSE_MOVSR_MODAL:'CLOSE_MOVSR_MODAL',

    GET_ARTICLE:'GET_ARTICLE',
    SET_ARTICLE:'SET_ARTICLE',

    GET_COMMENT:'GET_COMMENT',
    SET_COMMENT:'SET_COMMENT',

    PUBLISH_COMMENT:'PUBLISH_COMMENT',
    VSR_PUBLISH_COMMENT:'VSR_PUBLISH_COMMENT',

};
export const actions2 = {
    open_login_modal:function () {return{type:actionTypes.OPEN_LOGIN_MODAL}},
    close_login_modal:function () {return{type:actionTypes.CLOSE_LOGIN_MODAL}},
    open_vsr_modal:function () {return{type:actionTypes.OPEN_VSR_MODAL}},
    close_vsr_modal:function () {return{type:actionTypes.CLOSE_VSR_MODAL}},
    open_movsr_modal:function () {return{type:actionTypes.OPEN_MOVSR_MODAL}},
    close_movsr_modal:function () {return{type:actionTypes.CLOSE_MOVSR_MODAL}},

    get_article:function (n) {return{type:actionTypes.GET_ARTICLE,payload:n}},
    get_comment:function (n) {return{type:actionTypes.GET_COMMENT,payload:n}},


    publish_comment:function (n) {return{type:actionTypes.PUBLISH_COMMENT,data:n}},
    vsr_publish_comment:function (n) {return{type:actionTypes.VSR_PUBLISH_COMMENT,data:n}},
};

const articlecontent=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.OPEN_LOGIN_MODAL:return{...state,loginModal:true};
        case actionTypes.CLOSE_LOGIN_MODAL:return{...state,loginModal:false};
        case actionTypes.OPEN_VSR_MODAL:return{...state,vsrModal:true};
        case actionTypes.CLOSE_VSR_MODAL:return{...state,vsrModal:false};
        case actionTypes.OPEN_MOVSR_MODAL:return{...state,moVsrModal:true};
        case actionTypes.CLOSE_MOVSR_MODAL:return{...state,moVsrModal:false};


        case actionTypes.SET_ARTICLE:return{...state,article_data:action.data};
        case actionTypes.SET_COMMENT:return{...state,comment_data:action.data};

        default:return state;
    }
}


export default articlecontent

