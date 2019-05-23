import actionTypes from './../actionTypes';
import ActionCreator from "./";
import store from "./../store";

export const GetUserInfo = (userid, token) => {
    _GetUserInfo(userid, token);
    return {
        type: actionTypes.USER_GET_USER_INFO,
    };
}

export const SaveUserInfo = (userInfo) => {
    return {
        type: actionTypes.USER_SAVE_USER_INFO,
        payload: {
            userInfo
        }
    };
}

export const DeleteUserInfo = () => {
    return {
        type: actionTypes.USER_DELETE_USER_INFO,
    };
}

export const SaveRememberMe = (username) => {
    return {
        type: actionTypes.USER_SAVE_REMEMBER_ME,
        payload: {
            username
        }
    };
}

export const SaveIsLoggedIn = (isLoggedIn) => {
    return {
        type: actionTypes.USER_SAVE_IS_LOGGED_IN,
        payload: {
            isLoggedIn
        }
    };
}

export const Signup = (username, password1, password2, callbackFunc) => {
    _Signup(username, password1, password2, callbackFunc);
    return {
        type: actionTypes.USER_SIGN_UP,
    };
}

export const Login = (username, password, isRememberme, callbackFunc) => {    
    _Login(username, password, isRememberme, callbackFunc);
    return {
        type: actionTypes.USER_LOG_IN,
    };
}

export const Logout = () => {    
    _LogOut();
    return {
        type: actionTypes.USER_LOG_OUT,
    };
}

export const SaveJwt = (token) => {
    return {
        type: actionTypes.USER_SAVE_JWT,
        payload: {
            token
        }
    };
}

export const DeleteJwt = () => {
    return {
        type: actionTypes.USER_DELETE_JWT,
    }
}

export const SaveUserid = (userid) => {
    return {
        type: actionTypes.USER_SAVE_USERID,
        payload: {
            userid
        }
    };
}

export const DeleteUserid = () => {
    return {
        type: actionTypes.USER_DELETE_USERID,
    };
}

const _Login = (username, password, isRememberme, callbackFunc) => {
    store.dispatch(ActionCreator.ShowDefaultSpinner());
    fetch("/rest-auth/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: username,               
            password: password,                
        })
    })
    .then(
        response => response.json()
    )
    .then(json => {
        store.dispatch(ActionCreator.HideDefaultSpinner());
        if (json.token && json.user) {
            callbackFunc(true, json);
            store.dispatch(ActionCreator.SaveJwt(json.token));  
            store.dispatch(ActionCreator.SaveUserid(json.user.pk.toString()));            
            if (isRememberme) {
                store.dispatch(ActionCreator.SaveRememberMe(json.user.username));
            }            
            store.dispatch(ActionCreator.GetUserInfo(json.user.pk, json.token))
            store.dispatch(ActionCreator.SaveIsLoggedIn(true));            
        } else {
            store.dispatch(ActionCreator.SaveIsLoggedIn(false));
            callbackFunc(false, json);
        }
    })
    .catch (
        err => {
            store.dispatch(ActionCreator.SaveIsLoggedIn(false));
            store.dispatch(ActionCreator.HideDefaultSpinner());
            callbackFunc(false, "");
        }
    )
}

const _LogOut = () => {
    store.dispatch(ActionCreator.ShowDefaultSpinner());
    fetch("/rest-auth/logout/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(
        response => response.json()
    )
    .then(json => {
        store.dispatch(ActionCreator.HideDefaultSpinner());
    })
    .catch (
        err => {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
    )
    store.dispatch(ActionCreator.DeleteJwt());
    store.dispatch(ActionCreator.DeleteUserInfo());
    store.dispatch(ActionCreator.DeleteUserid());
}

const _Signup = (username, password1, password2, callbackFunc) => {
    store.dispatch(ActionCreator.ShowDefaultSpinner());
    fetch(`/rest-auth/registration/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password1: password1,
            password2: password2,
        })
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, username, json);
        store.dispatch(ActionCreator.HideDefaultSpinner());
    })
    .catch(
        err => {
            store.dispatch(ActionCreator.HideDefaultSpinner());
            callbackFunc(false, "", "");
        }
    )
}

const _GetUserInfo = (userid, token) => {
    fetch(`/users/${userid}/`, {
        method: "GET",
        headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json"
        },
    })
    .then( response => {
        if (response.status === 401){
            store.dispatch(ActionCreator.Logout());
        } else {
            return response.json();
        }
    })
    .then(json => {
        if (json === undefined || json.result === undefined || json.result === null) {
            store.dispatch(ActionCreator.SaveUserInfo(null));
        } else {
            store.dispatch(ActionCreator.SaveUserInfo(json.result));
        }
    })
    .catch (
        console.log("Fail to get userInfo")
    )
}