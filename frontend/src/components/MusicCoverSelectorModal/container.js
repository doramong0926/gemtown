import React, { Component } from "react";
import MusicCoverSelectorModal from "./presenter";

class Container extends Component {
    render() {
        return (
            <MusicCoverSelectorModal
                visible={this.props.visible}
                music_cover_list={this.props.music_cover_list}
                handleClose={this.props.handleClose}
                handleSelect={this.props.handleSelect}
            />
        )
    }    
}

export default Container;

