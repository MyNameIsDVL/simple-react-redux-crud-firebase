import { LOGIN, LOGOUT, FETCHABOUTUSER, FETCHSTREAMS } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                uid: action.uid
            };
        case LOGOUT:
            return {};
        case FETCHABOUTUSER:
            return {
                ...state,
                userInfo: action.userInfo
            };
        case FETCHSTREAMS:
            return {
                ...state,
                streams: action.streams
            };    
        default:
            return state;       
    }
};