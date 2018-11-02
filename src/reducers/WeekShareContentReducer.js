const initialState={
    min_share_data:[],
};
export const actionTypes = {
    GET_MIN_SHARE_DATA:'GET_MIN_SHARE_DATA',
    SET_MIN_SHARE_DATA:'SET_MIN_SHARE_DATA',
};
export const actions = {
    get_min_share_data:function (n) {
        return{
            type:actionTypes.GET_MIN_SHARE_DATA,
            payload:n
        }
    }
};

const weeksharecontent=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.SET_MIN_SHARE_DATA:
            return{...state,min_share_data:action.data};

        default:return state;
    }
}

export default weeksharecontent

