const initialState={
    regModal: false,
    pushModal: false,
    vsrDeskPushModal: false,
    updateModal: false,
    vsrPushModal: false,

    avatar_select:'alpaca1',
    user_avatar:'alpaca1',


    loginFlag:false,

    user_data:[{ "avatar":"no" , "signature":"no" ,"username":"no"}],

    message_data:[]





};
export const actionTypes = {
    OPEN_REG_MODAL:'OPEN_REG_MODAL',
    CLOSE_REG_MODAL:'CLOSE_REG_MODAL',
    OPEN_PUSH_MODAL:'OPEN_PUSH_MODAL',
    CLOSE_PUSH_MODAL:'CLOSE_PUSH_MODAL',
    OPEN_VSRDESKPUSH_MODAL:'OPEN_VSRDESKPUSH_MODAL',
    CLOSE_VSRDESKPUSH_MODAL:'CLOSE_VSRDESKPUSH_MODAL',
    OPEN_UPDATE_MODAL:'OPEN_UPDATE_MODAL',
    CLOSE_UPDATE_MODAL:'CLOSE_UPDATE_MODAL',
    OPEN_VSRPUSH_MODAL:'OPEN_VSRPUSH_MODAL',
    CLOSE_VSRPUSH_MODAL:'CLOSE_VSRPUSH_MODAL',


    CHANGE_AVATAR_SELECT:'CHANGE_AVATAR_SELECT',
    CHANGE_USER_AVATAR:'CHANGE_USER_AVATAR',

    CHANGE_USER_DATA:'CHANGE_USER_DATA',
    UPDATE_USER_DATA:'UPDATE_USER_DATA',

    SET_MESSAGE_DATA:'SET_MESSAGE_DATA',




    CHECK_LOGIN_STATE:'CHECK_LOGIN_STATE',
    SET_USER_DATA:'SET_USER_DATA',


    REG:'REG',

    LOGIN:'LOGIN',
    LOGOUT:'LOGOUT',
    SETLOGIN:'SETLOGIN',
    SETLOGOUT:'SETLOGOUT',


    VSR_PUSH_MESSAGE:'VSR_PUSH_MESSAGE',
    PUSH_MESSAGE:'PUSH_MESSAGE'

};
export const actions = {
    open_reg_modal:function () {return{type:actionTypes.OPEN_REG_MODAL}},
    close_reg_modal:function () {return{type:actionTypes.CLOSE_REG_MODAL}},
    open_push_modal:function () {return{type:actionTypes.OPEN_PUSH_MODAL}},
    close_push_modal:function () {return{type:actionTypes.CLOSE_PUSH_MODAL}},
    open_vsrdeskpush_modal:function () {return{type:actionTypes.OPEN_VSRDESKPUSH_MODAL}},
    close_vsrdeskpush_modal:function () {return{type:actionTypes.CLOSE_VSRDESKPUSH_MODAL}},
    open_update_modal:function () {return{type:actionTypes.OPEN_UPDATE_MODAL}},
    close_update_modal:function () {return{type:actionTypes.CLOSE_UPDATE_MODAL}},
    open_vsrpush_modal:function () {return{type:actionTypes.OPEN_VSRPUSH_MODAL}},
    close_vsrpush_modal:function () {return{type:actionTypes.CLOSE_VSRPUSH_MODAL}},


    check_login_state:function () {return{type:actionTypes.CHECK_LOGIN_STATE}},
    logins:function (n) {return{type:actionTypes.LOGIN,data:n}},
    logouts:function () {return{type:actionTypes.LOGOUT}},



    change_avatar_select:function (n) {
        return{
            type:actionTypes.CHANGE_AVATAR_SELECT,payload:n
        }},

    change_user_avatar:function (n) {
        return{
            type:actionTypes.CHANGE_USER_AVATAR,payload:n
        }},

    vsr_push_message:function (n) {
        return{
            type:actionTypes.VSR_PUSH_MESSAGE,data:n
        }},

    push_message:function (n) {
        return{
            type:actionTypes.PUSH_MESSAGE,data:n
        }},

    reg:function (n) {
        return{
            type:actionTypes.REG,data:n
        }},

    change_user_data:function (n) {
        return{
            type:actionTypes.CHANGE_USER_DATA,data:n
        }},

    update_user_data:function (n) {
        return{
            type:actionTypes.UPDATE_USER_DATA,data:n
        }}

};



const messagebroad=(state=initialState,action)=>{
    if(action===undefined) return state
    switch (action.type) {
        case actionTypes.OPEN_REG_MODAL: return{...state,regModal: true};
        case actionTypes.CLOSE_REG_MODAL: return{...state,regModal: false};

        case actionTypes.OPEN_PUSH_MODAL: return{...state,pushModal: true};
        case actionTypes.CLOSE_PUSH_MODAL: return{...state,pushModal: false};

        case actionTypes.OPEN_VSRDESKPUSH_MODAL: return{...state,vsrDeskPushModal: true};
        case actionTypes.CLOSE_VSRDESKPUSH_MODAL: return{...state,vsrDeskPushModal: false};

        case actionTypes.OPEN_UPDATE_MODAL: return{...state,updateModal: true};
        case actionTypes.CLOSE_UPDATE_MODAL: return{...state,updateModal: false};

        case actionTypes.OPEN_VSRPUSH_MODAL: return{...state,vsrPushModal: true};
        case actionTypes.CLOSE_VSRPUSH_MODAL: return{...state,vsrPushModal: false};



        case actionTypes.CHANGE_AVATAR_SELECT: return{...state,avatar_select: action.payload};
        case actionTypes.CHANGE_USER_AVATAR: return{...state,user_avatar: action.payload};



        case actionTypes.SETLOGIN: return{...state,loginFlag: true};
        case actionTypes.SETLOGOUT: return{...state,loginFlag: false};



        case actionTypes.SET_USER_DATA: return{...state,user_data: action.data};


        case actionTypes.SET_MESSAGE_DATA: return{...state,message_data: action.data};

        case actionTypes.CHANGE_USER_DATA: return{...state,user_data: action.data};




        default:return state;
    }
}

export default messagebroad

