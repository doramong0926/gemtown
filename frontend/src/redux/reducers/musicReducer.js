import actionTypes from "../actionTypes";

const initialState = {
    new_music_list: [],
    new_music_expansion_list: [],
    rating_music_list: [],
    rating_music_expansion_list: [],        
    myposted_music_list: [],        
    music_filter: {
        genre : [],
        genre_detail: [],
        career: [],
    },
    musicFilterList: null,
    music_cover_list: null,
}

export default (state = initialState, action) => {
    switch (action.type) {  
        case actionTypes.CONFIG_SAVE_MUSIC_COVER_LIST:
            return Object.assign({}, state, {                
                music_cover_list: action.payload.music_cover_list,
            });       

        case actionTypes.CONFIG_SAVE_NEW_MUSIC:
            return Object.assign({}, state, {                
                new_music_list: action.payload.new_music_list,
            });        

        case actionTypes.CONFIG_SAVE_NEW_MUSIC_EXPANSION:
            return Object.assign({}, state, {                
                new_music_expansion_list: action.payload.new_music_expansion_list,
            });

        case actionTypes.CONFIG_SAVE_RATING_MUSIC:
            return Object.assign({}, state, {                
                rating_music_list: action.payload.rating_music_list,
            });
            
        case actionTypes.CONFIG_SAVE_RATING_MUSIC_EXPANSION:
            return Object.assign({}, state, {                
                rating_music_expansion_list: action.payload.rating_music_expansion_list,
            });

        case actionTypes.CONFIG_SAVE_MYPOSTED_MUSIC:
            return Object.assign({}, state, {                
                myposted_music_list: action.payload.myposted_music_list,
            });

        case actionTypes.CONFIG_SAVE_MUSIC_FILTER:
            return Object.assign({}, state, {                
                music_filter: action.payload.music_filter,
            });
        
        case actionTypes.CONFIG_SAVE_MUSIC_FILTER_LIST:
            return Object.assign({}, state, {                
                musicFilterList: action.payload.musicFilterList,
            });
            
        default: 
            return state;
    }
}
