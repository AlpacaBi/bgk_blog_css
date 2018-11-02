import {fork} from 'redux-saga/effects'
import {getArticleListFlow} from './HomeSaga'
import {getShareListFlow,getShareFlow} from './WeekShareSaga'
import {getArticleListDataFlow} from './ArticleSaga'
import {getWeekShareContentFlow} from './WeekShareContentSaga'
import {getUserLoginStateFlow,loginFlow,logoutFlow,vsrPushMessageFlow,pushMessageFlow,reg,updateUserDataFlow} from './MessageBroadSaga'
import {getArticleFlow,getCommentFlow,vsrPushCommentFlow,pushCommentFlow} from './ArticleContentSaga'


export default  function* rootSages() {
    yield fork(getArticleListFlow)
    yield fork(getShareListFlow)
    yield fork(getShareFlow)
    yield fork(getArticleListDataFlow)
    yield fork(getWeekShareContentFlow)
    yield fork(getUserLoginStateFlow)
    yield fork(loginFlow)
    yield fork(logoutFlow)
    yield fork(vsrPushMessageFlow)
    yield fork(pushMessageFlow)
    yield fork(reg)
    yield fork(updateUserDataFlow)
    yield fork(getArticleFlow)
    yield fork(getCommentFlow)
    yield fork(pushCommentFlow)
    yield fork(vsrPushCommentFlow)
}