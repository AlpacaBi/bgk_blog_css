import {actionTypes as ArticleContentTypes} from '../reducers/ArticleContentReudcer'
import {take,call,put} from 'redux-saga/effects'
import {get, post} from '../ajax/index'
import {actionTypes as MessageBroadTypes} from "../reducers/MessageBroadReducer";




export function* getArticleFlow () {
    while (true){
        let req=yield take(ArticleContentTypes.GET_ARTICLE);
        let res = yield call(get,'/getArticles?id='+req.payload);
        if(res){
            yield put({type: ArticleContentTypes.SET_ARTICLE, data: res});
        }
    }
}




export function* setComment (n) {
    let res = yield call(get,'/getComment?id='+n);
    if(res){
        yield put({type: ArticleContentTypes.SET_COMMENT, data: res});
    }
}



export function* getCommentFlow () {
    while (true){
        let req=yield take(ArticleContentTypes.GET_COMMENT);
        yield setComment (req.payload)
    }
}



export function* pushCommentFlow () {
    while (true){
        let req=yield take(ArticleContentTypes.PUBLISH_COMMENT);
        yield call(post,'/pushComment',req.data);
        yield alert('发表成功！！')
        yield setComment (req.data.aID)

    }
}

export function* vsrPushCommentFlow () {
    while (true){
        let req=yield take(ArticleContentTypes.VSR_PUBLISH_COMMENT);
        yield call(post,'/vsr_pushComment',req.data);
        yield alert('发表成功！！')
        yield put({type:ArticleContentTypes.CLOSE_VSR_MODAL})
        yield put({type:ArticleContentTypes.CLOSE_MOVSR_MODAL})
        yield setComment (req.data.aID)
    }
}