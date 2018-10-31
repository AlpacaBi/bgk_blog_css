import {fork} from 'redux-saga/effects'
import {getArticleListFlow} from './HomeSaga'
import {getShareListFlow,getShareFlow} from './WeekShareSaga'


export default  function* rootSages() {
    yield fork(getArticleListFlow)
    yield fork(getShareListFlow)
    yield fork(getShareFlow)
}