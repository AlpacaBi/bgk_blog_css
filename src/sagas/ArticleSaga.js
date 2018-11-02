import {actionTypes as ArticleTypes} from '../reducers/ArticleReducer'
import {take,call,put} from 'redux-saga/effects'
import {get} from '../ajax/index'


export function* getArticleListDataFlow () {
    while (true){
        let req=yield take(ArticleTypes.GET_ARTICLE_LIST_DATA);
        let res = yield call(get,'/getArticleList?tabid='+req.payload);
        if(res){
            yield put({type: ArticleTypes.SET_ARTICLE_LIST_DATA, data: res});
        }
    }
}