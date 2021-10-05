import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import loginReducer from '../reducers/loginReducer';
import indicadorReducer from '../reducers/IndicadorReducer';
import boletaReducer from '../reducers/boletaReducer';
import configReducer from '../reducers/configuracionReducer';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    login: loginReducer,
    indicador: indicadorReducer,
    boleta: boletaReducer,
    config: configReducer,
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));