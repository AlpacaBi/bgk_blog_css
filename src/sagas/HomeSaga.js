import {actionTypes as HomeTypes} from '../reducers/HomeReducer'
import {take,call,put} from 'redux-saga/effects'
import {get} from '../ajax/index'


export function* getArticleListFlow () {
    while (true){
        yield take(HomeTypes.HOME_ARTICLE_DATA);
        let res = yield call(get,'/homeArticleList');
        if(res){
            yield put({type: HomeTypes.SET_DATA, data: res});
        }
    }
}