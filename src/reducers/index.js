import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
});

export default rootReducer;