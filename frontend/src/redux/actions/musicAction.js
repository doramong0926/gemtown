import actionTypes from '../actionTypes';
import ActionCreator from ".";
import store from "../store";


export const SaveMusicCoverList = (music_cover_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_MUSIC_COVER_LIST,
        payload: {
            music_cover_list
        }
    };
}

export const SaveNewMusic = (new_music_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_NEW_MUSIC,
        payload: {
            new_music_list
        }
    };
}

export const SaveNewMusicExpansion = (new_music_expansion_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_NEW_MUSIC_EXPANSION,
        payload: {
            new_music_expansion_list
        }
    };
}

export const SaveRatingMusic = (rating_music_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_RATING_MUSIC,
        payload: {
            rating_music_list
        }
    };
}


export const SaveRatingMusicExpansion = (rating_music_expansion_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_RATING_MUSIC_EXPANSION,
        payload: {
            rating_music_expansion_list
        }
    };
}

export const SaveMypostedMusic = (myposted_music_list) => {
    return {
        type: actionTypes.CONFIG_SAVE_MYPOSTED_MUSIC,
        payload: {
            myposted_music_list
        }
    };
}

export const SaveMusicFilter = (music_filter) => {
    return {
        type: actionTypes.CONFIG_SAVE_MUSIC_FILTER,
        payload: {
            music_filter,
        }
    };
}

export const SaveMusicFilterList = (musicFilterList) => {
    return {
        type: actionTypes.CONFIG_SAVE_MUSIC_FILTER_LIST,
        payload: {
            musicFilterList
        }
    };
}

export const FetchNewMusic = (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {    
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/songs/${numOfMusic}/new/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },   
        body: JSON.stringify(music_filter),
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
        type: actionTypes.CONFIG_FETCH_NEW_MUSIC,
    };
}

export const FetchRatingMusic = (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/songs/${numOfMusic}/popular/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },   
        body: JSON.stringify(music_filter),
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
        type: actionTypes.CONFIG_FETCH_RATING_MUSIC,
    };
}

export const FetchMypostedMusic = (userid, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/songs/${userid}/mypost/`, {
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
        type: actionTypes.CONFIG_FETCH_MYPOSTED_MUSIC,
    };
}

export const FetchRegisterMusic = (userid, isNeedSpinner, token, request_data, callbackFunc) => {
    const data = new FormData();
    if (request_data.file !== null) {
        data.append('file', request_data.file);     
    }
    data.append('musician_nickname', request_data.musician_nickname)
    data.append('cover_image', request_data.cover_image);     
    data.append('album_title', request_data.album_title);
    data.append('title', request_data.title);
    data.append('description', request_data.description);
    data.append('genre', request_data.genre);
    data.append('genre_detail', request_data.genre_detail);
    data.append('career', request_data.career);
    data.append('register_block_chain', request_data.register_block_chain);    

    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/songs/${userid}/register/`, {
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
        type: actionTypes.CONFIG_FETCH_REGISTER_MUSIC,
    };
}


export const FetchMusicCover = (userid, token, callbackFunc) => {
    fetch(`/songs/${userid}/cover_images/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`,
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
        callbackFunc(true, json);
    })
    .catch(
        err => {
            callbackFunc(false, null);
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_MUSIC_COVER,
    };
}

export const FetchPlayMusic = (songid, token, callbackFunc) => {
    fetch(`/songs/${songid}/play/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`,
        },   
    })        
    .then(response => response.json())
    .then(json => {
        callbackFunc(true, json);
    })
    .catch(
        err => {
            callbackFunc(false, null);
        }
    )   

    return {
        type: actionTypes.CONFIG_FETCH_PLAY_MUSIC,
    };
}



export const FetchDetailMusic = (musicId, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/songs/${musicId}/`, {
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
        type: actionTypes.CONFIG_FETCH_DETAIL_MUSIC,
    };
}

export const VerifyMusicContent = (file, token, isNeedSpinner, callbackFunc) => {
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    const data = new FormData();
    if (file !== null) {
        data.append('file', file);     
    }
    fetch(`/songs/verify/`, {
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