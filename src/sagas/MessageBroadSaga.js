import {actionTypes as MessageBroadTypes} from '../reducers/MessageBroadReducer'
import {take,call,put} from 'redux-saga/effects'
import {get,post} from '../ajax/index'


import {actionTypes as ArticleContentTypes} from '../reducers/ArticleContentReudcer'




export function* setMessageData () {
    let msg=yield call(get,'/getMessage')
    yield put({type:MessageBroadTypes.SET_MESSAGE_DATA,data:msg})
}




export function* getUserLoginState () {
        let res = yield call(get,'/getUserLogin');
        if(res=='unLogin'){
            yield put({type: MessageBroadTypes.SETLOGOUT});
        }else {
            yield put({type:MessageBroadTypes.SET_USER_DATA,data:res})
            yield put({type: MessageBroadTypes.SETLOGIN});
        }
}





export function* getUserLoginStateFlow() {
    while (true) {
        yield take(MessageBroadTypes.CHECK_LOGIN_STATE);
        yield getUserLoginState()
        yield setMessageData()
    }
}


export function* loginFlow () {
    while (true){
        let req=yield take(MessageBroadTypes.LOGIN);
        let res = yield call(post,'/userLogin',req.data);
        yield alert(res.message)
        yield getUserLoginState()
        yield put({type: ArticleContentTypes.CLOSE_LOGIN_MODAL})
    }
}


export function* logoutFlow () {
    while (true){
        yield take(MessageBroadTypes.LOGOUT);
        yield call(get,'/userLogOut');
        yield alert('您已注销')
        yield getUserLoginState()
    }
}


export function* vsrPushMessageFlow () {
    while (true){
        let req=yield take(MessageBroadTypes.VSR_PUSH_MESSAGE);
        yield call(post,'/vsr_pushMessage',req.data);
        yield alert('发表成功！！')
        yield put({type:MessageBroadTypes.CLOSE_VSRDESKPUSH_MODAL})
        yield put({type:MessageBroadTypes.CLOSE_VSRPUSH_MODAL})
        yield setMessageData()
    }
}



export function* pushMessageFlow () {
    while (true){
        let req=yield take(MessageBroadTypes.PUSH_MESSAGE);
        yield call(post,'/pushMessage',req.data);
        yield alert('发表成功！！')
        yield put({type:MessageBroadTypes.CLOSE_PUSH_MODAL})
        yield setMessageData()
    }
}


export function* updateUserDataFlow () {
    while (true){
        let req=yield take(MessageBroadTypes.UPDATE_USER_DATA);
        yield call(post,'/updateUserInfo',req.data);
        yield alert('更改成功！！')
        yield put({type:MessageBroadTypes.CLOSE_UPDATE_MODAL})
    }
}


export function* reg() {
    while (true){
        let req=yield take(MessageBroadTypes.REG);
        yield call(post,'/userReg',req.data);
        yield alert('注册成功！！')
        yield put({type:MessageBroadTypes.CLOSE_REG_MODAL})

    }
}