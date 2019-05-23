import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicTable from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibleMusicInfoModal: false,
            selectedMusicId: null,
        }
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        music_list: PropTypes.array,
        tableType: PropTypes.string.isRequired,
        music: PropTypes.object,
        isPlay: PropTypes.bool.isRequired,
        token: PropTypes.string,
        FetchPlayMusic: PropTypes.func.isRequired,
    }

    render() {
        return (
            <MusicTable
                music_list={this.props.music_list}
                tableType={this.props.tableType}
                hadleTogglePlay={this._hadleTogglePlay}
                handleOnClick={this._handleOnClick}
                isPlay={this.props.isPlay}
                music={this.props.music}
                visibleMusicInfoModal={this.state.visibleMusicInfoModal}
                selectedMusicId={this.state.selectedMusicId}
                handleCloseMusicInfoModal={this._handleCloseMusicInfoModal}
            />
        )
    }


    _handleCloseMusicInfoModal = () => {
        this.setState({
            selectedMusicId: null,
            visibleMusicInfoModal: false,
        })
    }

    _handleOnClick = (music) => {
        console.log("dddddddddddd");
        this.setState({
            selectedMusicId: music.id,
            visibleMusicInfoModal: true,
        })
    }

    _hadleTogglePlay = (music) => {
        if (this.props.isPlay === false
            && ((this.props.music === null || this.props.music === undefined) || this.props.music.id !== music.id)) {
            this.props.FetchPlayMusic(music.id, this.props.token, this._FetchPlayMusicCallback.bind(this))
        }
        this.props.TogglePlayMusic(music);
    }

    _FetchPlayMusicCallback = () => {

    }
}

export default Container;
