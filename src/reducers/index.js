import {combineReducers} from 'redux'

import home from './HomeReducer'
import weekshare from './WeekShareReudcer'
import article from './ArticleReducer'
import weeksharecontent from './WeekShareContentReducer'
import messagebroad from './MessageBroadReducer'
import articlecontent from './ArticleContentReudcer'




export default combineReducers({
    home,
    weekshare,
    article,
    weeksharecontent,
    messagebroad,
    articlecontent
})