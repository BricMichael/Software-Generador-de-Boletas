import { combineReducers, compose, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
// Reducers




const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    // registro: registro,
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));