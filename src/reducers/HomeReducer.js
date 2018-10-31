const initialState={
    homeArticleData:[],
    infoModal: false,
    payModal:false
};

export const actionTypes = {
    HOME_ARTICLE_DATA:'HOME_ARTICLE_DATA',
    SET_DATA:'SET_DATA',

    OPEN_INFO_MODEL:'OPEN_INFO_MODEL',
    CLOSE_INFO_MODEL:'CLOSE_INFO_MODEL',
    OPEN_PAY_MODEL:'OPEN_PAY_MODEL',
    CLOSE_PAY_MODEL:'CLOSE_PAY_MODEL'
};

export const actions = {
    home_article_data:function () {
        return{
            type:actionTypes.HOME_ARTICLE_DATA
        }
    },
    open_info_model:function () {
        return{
            type:actionTypes.OPEN_INFO_MODEL
        }
    },
    close_info_model:function () {
        return{
            type:actionTypes.CLOSE_INFO_MODEL
        }
    },
    open_pay_model:function () {
        return{
            type:actionTypes.OPEN_PAY_MODEL
        }
    },
    close_pay_model:function () {
        return{
            type:actionTypes.CLOSE_PAY_MODEL
        }
    }
};

const home=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.SET_DATA:
            return{...state,homeArticleData:action.data};
        case actionTypes.OPEN_INFO_MODEL:
            return{...state,infoModal:true};
        case actionTypes.CLOSE_INFO_MODEL:
            return{...state,infoModal:false};
        case actionTypes.OPEN_PAY_MODEL:
            return{...state,payModal:true};
        case actionTypes.CLOSE_PAY_MODEL:
            return{...state,payModal:false};

        default:return state;
    }
}

export default home

