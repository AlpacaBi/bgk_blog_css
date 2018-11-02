import {actionTypes as WeekShareContentTypes} from '../reducers/WeekShareContentReducer'
import {take,call,put} from 'redux-saga/effects'
import {get} from '../ajax/index'


export function* getWeekShareContentFlow () {
    while (true){
        let req=yield take(WeekShareContentTypes.GET_MIN_SHARE_DATA);
        let res = yield call(get,'/getShares?id='+req.payload);
        if(res){
            yield put({type: WeekShareContentTypes.SET_MIN_SHARE_DATA, data: res});
        }
    }
}