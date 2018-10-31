const initialState={
    share_data:[],
    shareList_data:[]
};
export const actionTypes = {
    GET_SHARE_DATA:'GET_SHARE_DATA',
    GET_SHARE_LIST_DATA:'GET_LIST_DATA',
    SET_SHARE_DATA:'SET_SHARE_DATA',
    SET_SHARE_LIST_DATA:'SET_LIST_DATA'
};
export const actions = {
    get_share_data:function (n) {
        return{
            type:actionTypes.GET_SHARE_DATA,
            payload:n
        }
    },
    get_share_list_data:function () {
        return{
            type:actionTypes.GET_SHARE_LIST_DATA
        }
    }
};

const weekshare=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.SET_SHARE_DATA:
            return{...state,share_data:action.data};
        case actionTypes.SET_SHARE_LIST_DATA:
            return{...state,shareList_data:action.data};

        default:return state;
    }
}

export default weekshare

