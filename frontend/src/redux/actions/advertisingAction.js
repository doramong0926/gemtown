import actionTypes from '../actionTypes';
import ActionCreator from ".";
import store from "../store";

export const SaveAdvertising = (advertising_list) => {
    return {
        type: actionTypes.ADVERTISING_SAVE_ADVERTISING,
        payload: {
            advertising_list
        }
    };
}

export const FetchAdvertising = (callbackFunc) => {
    fetch(`/advertisings/all/`, {
        method: "GET",
    })
    .then(response => response.json())
    .then(json => {
        if (json === undefined || json.result === undefined || json.result === null) {
            callbackFunc(false, json);
        } else if (json.status === "1") {
            callbackFunc(true, json);
            store.dispatch(ActionCreator.SaveAdvertising(json.result));
        } else {
            callbackFunc(false, json);
        }
    })
    .catch(
        err => {
            callbackFunc(false, null);
        }
    )

    return {
        type: actionTypes.ADVERTISING_FETCH_ADVERTISING,
    };
}
