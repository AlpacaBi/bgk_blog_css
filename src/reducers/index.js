import {combineReducers} from 'redux'

import home from './HomeReducer'
import weekshare from './WeekShareReudcer'
import article from './ArticleReducer'




export default combineReducers({
    home,
    weekshare,
    article
})