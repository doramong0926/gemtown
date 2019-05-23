import actionTypes from '../actionTypes';

export const TogglePlayMusic = (music) => {
    return {
        type: actionTypes.MUSIC_PLAYER_TOGGLE_PLAY,
        payload: {
            music
        }
    };
}

export const DeleteMusic = (music) => {
    return {
        type: actionTypes.MUSIC_PLAYER_DELETE_MUSIC,
        payload: {
            music
        }
    };
}

export const AddMusic = (music) => {
    return {
        type: actionTypes.MUSIC_PLAYER_ADD_MUSIC,
        payload: {
            music
        }
    };
}