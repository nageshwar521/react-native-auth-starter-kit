import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {authReducer} from './reducers/authReducer';
import {commonReducer} from './reducers/commonReducer';
import {userReducer} from './reducers/userReducer';

const composeEnhancers = composeWithDevTools();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  common: commonReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
