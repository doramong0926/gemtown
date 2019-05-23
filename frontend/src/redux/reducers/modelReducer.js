import actionTypes from "../actionTypes";

const initialState = {
    new_model_list: [],
    new_model_expansion_list: [],
    rating_model_list: [],
    rating_model_expansion_list: [],   
    myposted_model_list: [],  
    model_filter: {
        gender : [],
        age_range: [],
        job: [],
        entertainment: [],
        style: [],
        career: [],
    },
    modelFilterList: null,
}

export default (state = initialState, action) => {
    switch (action.type) {  
        case actionTypes.CONFIG_SAVE_MYPOSTED_MODEL:
            return Object.assign({}, state, {                
                myposted_model_list: action.payload.myposted_model_list,
            });

        case actionTypes.CONFIG_SAVE_NEW_MODEL:
            return Object.assign({}, state, {                
                new_model_list: action.payload.new_model_list,
            });        

        case actionTypes.CONFIG_SAVE_NEW_MODEL_EXPANSION:
            return Object.assign({}, state, {                
                new_model_expansion_list: action.payload.new_model_expansion_list,
            });

        case actionTypes.CONFIG_SAVE_RATING_MODEL:
            return Object.assign({}, state, {                
                rating_model_list: action.payload.rating_model_list,
            });
            
        case actionTypes.CONFIG_SAVE_RATING_MODEL_EXPANSION:
            return Object.assign({}, state, {                
                rating_model_expansion_list: action.payload.rating_model_expansion_list,
            });

        case actionTypes.CONFIG_SAVE_MODEL_FILTER:
            return Object.assign({}, state, {                
                model_filter: action.payload.model_filter,
            });
        
        case actionTypes.CONFIG_SAVE_MODEL_FILTER_LIST:
            return Object.assign({}, state, {                
                modelFilterList: action.payload.modelFilterList,
            });
            
        default: 
            return state;
    }
}
