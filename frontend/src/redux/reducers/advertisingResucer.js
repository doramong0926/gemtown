import actionTypes from "../actionTypes";

const initialState = {
    advertising_list: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADVERTISING_SAVE_ADVERTISING:
            return Object.assign({}, state, {
                advertising_list: action.payload.advertising_list,
            });
        default:
            return state;
    }
}



