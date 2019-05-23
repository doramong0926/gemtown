import actionTypes from "../actionTypes";

const initialState = {
    music_player_list: [],
    music: null,
    isPlay: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_PLAYER_TOGGLE_PLAY:
            if (state.music === null || state.music === undefined ||  state.music !== action.payload.music) {                
                return Object.assign({}, state, {                
                    music: action.payload.music,
                    isPlay: true,
                });
            } else if (state.music === action.payload.music) {
                return Object.assign({}, state, {   
                    isPlay: !state.isPlay,
                });
            } else {
                return Object.assign({}, state, {                
                    music: null,
                    isPlay: false,
                });
            }
                    
        case actionTypes.MUSIC_PLAYER_DELETE_MUSIC:
            return Object.assign({}, state, {                
                music_player_list: state.music_player_list.filter(t=>{return (t.id !== action.payload.music.id)}),
            }); 

        case actionTypes.MUSIC_PLAYER_ADD_MUSIC:
            return Object.assign({}, state, {                
                music_player_list: state.music_player_list.concat(action.payload.music),
            }); 
            
        default: 
            return state;
    }
}