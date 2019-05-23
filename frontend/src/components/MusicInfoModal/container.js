import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicInfoModal from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            music: null,
        }
    }   

    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        musicId: PropTypes.number,
        FetchDetailMusic: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.musicId !== undefined && this.props.musicId !== null) {
            this.props.FetchDetailMusic(this.props.musicId, false, this.FetchDetailMusicCallback.bind(this))
        }
    } 

    componentWillReceiveProps(nextPros) {
        if (nextPros.musicId !==  this.props.musicId && nextPros.musicId !== null && nextPros.musicId !== undefined) {
            this.props.FetchDetailMusic(nextPros.musicId, false, this.FetchDetailMusicCallback.bind(this))
        }
        if (nextPros.visible !== this.props.visible) {
            if (nextPros.visible === false) {
                this.setState({
                    music: null,
                })
            }
        }
    }
    
    FetchDetailMusicCallback = (result, json) => {
        if (result === true) {
            this.setState({
                music: json.result,
            })
        }
    }

    render() {
        return (
            <MusicInfoModal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                music={this.state.music}
            />
        )
    }
}

export default Container;

