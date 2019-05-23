import actionTypes from '../actionTypes';
import ActionCreator from ".";
import store from "../store";

export const FetchPurchaseGem = (userid, isNeedSpinner, token, request_data, callbackFunc) => {
    const data = new FormData();
    data.append('amount', request_data.amount);
    data.append('purchase_type', request_data.purchase_type);
    if (isNeedSpinner) {
        store.dispatch(ActionCreator.ShowDefaultSpinner());
    }
    fetch(`/gems/${userid}/purchase/`, {
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
            store.dispatch(ActionCreator.GetUserInfo(userid, token));
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
        type: actionTypes.GEM_PURCHASE,
    };
}