
const actionTypes = {
    //USER ACTION
    USER_SIGN_UP: "USER_SIGN_UP",
    USER_LOG_IN: "USER_LOG_IN",
    USER_LOG_OUT: "USER_LOG_OUT",
    USER_SAVE_IS_LOGGED_IN: "USER_SAVE_IS_LOGGED_IN",
    USER_SAVE_JWT: "USER_SAVE_JWT",
    USER_DELETE_JWT: "USER_DELETE_JWT",
    USER_SAVE_USERID: "USER_SAVE_USERID",
    USER_DELETE_USERID: "USER_DELETE_USERID",
    USER_SAVE_REMEMBER_ME: "USER_SAVE_REMEMBER_ME",
    USER_GET_USER_INFO: "USER_GET_USER_INFO",
    USER_SAVE_USER_INFO: "USER_SAVE_USER_INFO",
    USER_DELETE_USER_INFO: "USER_DELETE_USER_INFO",

    //SPINNER ACTION
    SPINNER_SHOW_DEFAULT_SPINNER: "SPINNER_SHOW_DEFAULT_SPINNER",
    SPINNER_HIDE_DEFAULT_SPINNER: "SPINNER_HIDE_DEFAULT_SPINNER",

    //MUSIC ACTION
    CONFIG_FETCH_NEW_MUSIC: "CONFIG_FETCH_NEW_MUSIC",
    CONFIG_SAVE_MUSIC_COVER_LIST: "CONFIG_SAVE_MUSIC_COVER_LIST",
    CONFIG_SAVE_NEW_MUSIC: "CONFIG_SAVE_NEW_MUSIC",
    CONFIG_SAVE_NEW_MUSIC_EXPANSION: "CONFIG_SAVE_NEW_MUSIC_EXPANSION",
    CONFIG_FETCH_RATING_MUSIC: "CONFIG_FETCH_RATING_MUSIC",
    CONFIG_SAVE_RATING_MUSIC_EXPANSION: "CONFIG_SAVE_RATING_MUSIC_EXPANSION",
    CONFIG_FETCH_MYPOSTED_MUSIC: "CONFIG_FETCH_MYPOSTED_MUSIC",
    CONFIG_FETCH_REGISTER_MUSIC: "CONFIG_FETCH_REGISTER_MUSIC",
    CONFIG_FETCH_MUSIC_COVER: "CONFIG_FETCH_MUSIC_COVER",
    CONFIG_SAVE_MYPOSTED_MUSIC: "CONFIG_SAVE_MYPOSTED_MUSIC",
    CONFIG_SAVE_RATING_MUSIC: "CONFIG_SAVE_RATING_MUSIC",
    CONFIG_SAVE_MUSIC_FILTER: "CONFIG_SAVE_MUSIC_FILTER",
    CONFIG_SAVE_MUSIC_FILTER_LIST: "CONFIG_SAVE_MUSIC_FILTER_LIST",
    CONFIG_FETCH_PLAY_MUSIC: "CONFIG_FETCH_PLAY_MUSIC",
    CONFIG_FETCH_DETAIL_MUSIC: "CONFIG_FETCH_DETAIL_MUSIC",
    CONFIG_VERIFY_MUISC_CONTENT: "CONFIG_VERIFY_MUISC_CONTENT",

    //MODEL ACTION
    CONFIG_SAVE_NEW_MODEL: "CONFIG_SAVE_NEW_MODEL",
    CONFIG_SAVE_NEW_MODEL_EXPANSION: "CONFIG_SAVE_NEW_MODEL_EXPANSION",
    CONFIG_SAVE_RATING_MODEL: "CONFIG_SAVE_RATING_MODEL",
    CONFIG_SAVE_RATING_MODEL_EXPANSION: "CONFIG_SAVE_RATING_MODEL_EXPANSION",
    CONFIG_SAVE_MODEL_FILTER: "CONFIG_SAVE_MODEL_FILTER",
    CONFIG_SAVE_MODEL_FILTER_LIST: "CONFIG_SAVE_MODEL_FILTER_LIST",
    CONFIG_SAVE_MYPOSTED_MODEL: "CONFIG_SAVE_MYPOSTED_MODEL",
    CONFIG_FETCH_NEW_MODEL: "CONFIG_FETCH_NEW_MODEL",
    CONFIG_FETCH_RATING_MODEL: "CONFIG_FETCH_RATING_MODEL",
    CONFIG_FETCH_REGISTER_MODEL: "CONFIG_FETCH_REGISTER_MODEL",
    CONFIG_FETCH_MYPOSTED_MODEL: "CONFIG_FETCH_MYPOSTED_MODEL",
    CONFIG_FETCH_ADD_MODEL_PROFILE: "CONFIG_FETCH_ADD_MODEL_PROFILE",
    CONFIG_FETCH_DETAIL_MODEL: "CONFIG_FETCH_DETAIL_MODEL",

    //MUSIC_PLAYER ACTION
    MUSIC_PLAYER_TOGGLE_PLAY: "MUSIC_PLAYER_TOGGLE_PLAY",
    MUSIC_PLAYER_ADD_MUSIC: "MUSIC_PLAYER_ADD_MUSIC",
    MUSIC_PLAYER_DELETE_MUSIC: "MUSIC_PLAYER_DELETE_MUSIC",

    //GEM ACTION
    GEM_PURCHASE: "GEM_PURCHASE",
    GEM_FETCH_PURCHASE: "GEM_FETCH_PURCHASE",

    //ADVERTISING ACTION
    ADVERTISING_FETCH_ADVERTISING: "ADVERTISING_FETCH_ADVERTISING",
    ADVERTISING_SAVE_ADVERTISING: "ADVERTISING_SAVE_ADVERTISING",
};

export default actionTypes;
