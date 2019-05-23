import actionTypes from '../actionTypes';
import ActionCreator from ".";
import store from "../store";


export const SaveNewModel = (new_model_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_NEW_MODEL,
        payload: {
            new_model_list
        }
    };
}

export const SaveNewModelExpansion = (new_model_expansion_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_NEW_MODEL_EXPANSION,
        payload: {
            new_model_expansion_list
        }
    };
}

export const SaveRatingModel = (rating_model_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_RATING_MODEL,
        payload: {
            rating_model_list
        }
    };
}


export const SaveRatingModelExpansion = (rating_model_expansion_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_RATING_MODEL_EXPANSION,
        payload: {
            rating_model_expansion_list
        }
    };
}

export const SaveModelFilter = (model_filter) => {
    return {
        type: actionTypes.CONFIG_SAVE_MODEL_FILTER,
        payload: {
            model_filter,
        }
    };
}

export const SaveModelFilterList = (modelFilterList) => {
    return {
        type: actionTypes.CONFIG_SAVE_MODEL_FILTER_LIST,
        payload: {
            modelFilterList
        }
    };
}

export const SaveMypostedModel = (myposted_model_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_MYPOSTED_MODEL,
        payload: {
            myposted_model_list
        }
    };
}

export const FetchNewModel = (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {    
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelers/${numOfModel}/new/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },   
        body: JSON.stringify(model_filter),
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, json);
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_NEW_MODEL,
    };
}

export const FetchRatingModel = (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelers/${numOfModel}/popular/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },   
        body: JSON.stringify(model_filter),
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, json);
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_RATING_MODEL,
    };
}

export const FetchAddModelProfile = (userid, isNeedSpinner, token, request_data, callbackFunc) => {
    const data = new FormData();
    if (request_data.cover_image !== null) {
        data.append('cover_image', request_data.cover_image);     
    }
    if (request_data.full_image !== null) {
        data.append('full_image', request_data.full_image);     
    }
    if (request_data.half_image !== null) {
        data.append('half_image', request_data.half_image);     
    }    
    data.append('gender', request_data.gender);
    data.append('age_range', request_data.age_range);
    data.append('job', request_data.job);
    data.append('entertainment', request_data.entertainment);
    data.append('style', request_data.style);
    data.append('career', request_data.career);
    data.append('height', request_data.height);
    data.append('weight', request_data.weight);
    data.append('blood_type', request_data.blood_type);
    data.append('age', request_data.age);
    data.append('bust', request_data.body_size_bust);
    data.append('wiast', request_data.body_size_wiast);
    data.append('hip', request_data.body_size_hip);
    data.append('description', request_data.description);    
    data.append('birth_year', request_data.birth_year);
    data.append('birth_month', request_data.birth_month);
    data.append('birth_day', request_data.birth_day);
    data.append('register_block_chain', request_data.register_block_chain);    

    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelers/${userid}/profile/`, {
        method: "POST",
        headers: {
            "Authorization": `JWT ${token}`,
        },   
        body: data
    })        
    .then( response => {
        if (response.status === 401){
            store.dispatch(ActionCreator.Logout());
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        } else {
            store.dispatch(ActionCreator.GetUserInfo(userid, token));
            return response.json();
        }
    })
    .then(json => {
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
        if (json === undefined || json.result === undefined || json.result === null) {
            store.dispatch(ActionCreator.SaveUserInfo(null));
            callbackFunc(false, json);
        } else if (json.status === "1") {
            callbackFunc(true, json);
        } else {
            callbackFunc(false, json);
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_ADD_MODEL_PROFILE,
    };
}


export const FetchRegisterModel = (userid, isNeedSpinner, token, request_data, callbackFunc) => {
    const data = new FormData();
    data.append('nickname', request_data.gender);
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelers/${userid}/register/`, {
        method: "POST",
        headers: {
            "Authorization": `JWT ${token}`,
        },   
        body: data
    })        
    .then( response => {
        if (response.status === 401){
            store.dispatch(ActionCreator.Logout());
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        } else {
            return response.json();
        }
    })
    .then(json => {
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
        if (json === undefined || json.result === undefined || json.result === null) {
            store.dispatch(ActionCreator.SaveUserInfo(null));
            callbackFunc(false, json);
        } else if (json.status === "1") {
            callbackFunc(true, json);
        } else {
            callbackFunc(false, json);
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_REGISTER_MODEL,
    };
}


export const FetchMypostedModel = (userid, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelphotos/${userid}/mypost/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },   
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, json);
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_MYPOSTED_MODEL,
    };
}


export const FetchDetailModel = (modelId, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/modelers/${modelId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },   
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, json);
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_DETAIL_MODEL,
    };
}



export const VerifyModelPhotoContent = (file, token, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    const data = new FormData();
    if (file !== null) {
        data.append('file', file);     
    }
    fetch(`/modelphotos/verify/`, {
        method: "POST",
        headers: {
            "Authorization": `JWT ${token}`,
        },   
        body: data
    })        
    .then( response => {
        if (response.status === 401){
            store.dispatch(ActionCreator.Logout());
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        } else {
            return response.json();
        }
    })
    .then(json => {
        if (isNeedSpinner) {
            store.dispatch(ActionCreator.HideDefaultSpinner());
        }
        if (json === undefined || json.result === undefined || json.result === null) {
            callbackFunc(false, null);
        } else if (json.status === "1") {
            callbackFunc(true, json);
        } else {
            callbackFunc(false, json);
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
            if (isNeedSpinner) {
                store.dispatch(ActionCreator.HideDefaultSpinner());
            }
        }
    )   

    return {
        type: actionTypes.CONFIG_VERIFY_MUISC_CONTENT,
    };
}