import actionTypes from "../actionTypes";
import { 
    LOCAL_STORE_JWT, 
    LOCAL_STORE_REMEMBERME,
    LOCAL_STORE_USERID,
} from "../../config/constants"

const initialState = {
    userInfo: null,
    isLoggedIn: (localStorage.getItem(LOCAL_STORE_JWT) ? true : false) || false,
    userid: (localStorage.getItem(LOCAL_STORE_USERID) ? localStorage.getItem(LOCAL_STORE_USERID) : null) || null,
    token: localStorage.getItem(LOCAL_STORE_JWT),    
    rememberme: (localStorage.getItem(LOCAL_STORE_REMEMBERME) ? localStorage.getItem(LOCAL_STORE_REMEMBERME) : null) || null,
}

export default (state = initialState, action) => {
    switch (action.type) {      
        case actionTypes.USER_SAVE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.payload.userInfo,
            });

        case actionTypes.USER_DELETE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: null,
            });

        case actionTypes.USER_SAVE_REMEMBER_ME:
            localStorage.setItem(LOCAL_STORE_REMEMBERME, action.payload.username);
            return Object.assign({}, state, {                
                rememberme: action.payload.username,
            });

        case actionTypes.USER_LOG_IN:
        case actionTypes.USER_LOG_OUT:
        case actionTypes.USER_SIGN_UP:
            return Object.assign({}, state, {
                isLoggedIn: false,
            });

        case actionTypes.USER_SAVE_IS_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLoggedIn,
            });

        case actionTypes.USER_SAVE_JWT:
            localStorage.setItem(LOCAL_STORE_JWT, action.payload.token);
            return Object.assign({}, state, {
                token: action.payload.token,
            });

        case actionTypes.USER_DELETE_JWT:
            localStorage.removeItem(LOCAL_STORE_JWT);
            return Object.assign({}, state, {
                token: null,
            });

        case actionTypes.USER_SAVE_USERID:
            localStorage.setItem(LOCAL_STORE_USERID, action.payload.userid);
            return Object.assign({}, state, {
                userid: action.payload.userid,
            });

        case actionTypes.USER_DELETE_USERID:
            localStorage.removeItem(LOCAL_STORE_USERID);
            return Object.assign({}, state, {
                userid: null,
            });

        default: 
            return state;
    }
}
