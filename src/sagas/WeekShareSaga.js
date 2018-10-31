import {actionTypes as WeekShareTypes} from '../reducers/WeekShareReudcer'
import {take,call,put} from 'redux-saga/effects'
import {get} from '../ajax/index'


export function* getShareListFlow () {
    while (true){
        yield take(WeekShareTypes.GET_SHARE_LIST_DATA);
        let res = yield call(get,'/getShareList');
        if(res){
            yield put({type: WeekShareTypes.SET_SHARE_LIST_DATA, data: res});
        }
    }
}

export function* getShareFlow () {
    while (true){
        let req=yield take(WeekShareTypes.GET_SHARE_DATA);
        let res = yield call(get,'/getShares?id='+req.payload);
        if(res){
            yield put({type: WeekShareTypes.SET_SHARE_DATA, data: res});
        }
    }
}