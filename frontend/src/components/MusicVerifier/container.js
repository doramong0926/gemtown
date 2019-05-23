import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicVerifier from "./presenter";
import { GetHashrightMetadata } from "./../../utils/web3Control"

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected_music_file: null,
            db_copyright: "",
            db_hash: "",
            db_music: null,
            blockchain_metadata: null,
        };    
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        VerifyMusicContent: PropTypes.func.isRequired,
    }
    
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        return (
            <MusicVerifier 
                handleInputChange={this._handleInputChange}     
                handleOnSubmit={this._handleOnSubmit}          
                selected_music_file={this.state.selected_music_file}  
                db_copyright={this.state.db_copyright}
                db_hash={this.state.db_hash}
                db_music={this.state.db_music}
                blockchain_metadata={this.state.blockchain_metadata}
            />
        )
    }

    _handleOnSubmit = () => {
        this.setState({
            db_copyright: "",
            db_hash: "",
            db_music: null,
            blockchain_metadata: null,
        })
        this.props.VerifyMusicContent(this.state.selected_music_file, this.props.token, true, this._VerifyMusicContentCallback)
    }
    
    _VerifyMusicContentCallback = (result, json) => {
        if (result === true) {
            console.log(json.result)
            this.setState({
                db_copyright: json.result.copyright,
                db_hash: json.result.hash,
                db_music: json.result.song !== undefined && json.result.song !== null  ? json.result.song : null,
            })    
            if (json.result.song.blockchain_id !== undefined && json.result.song.blockchain_id !== null && json.result.song.blockchain_id !== '') {
                this._getMeatadata(process.env.REACT_APP_CONTRACT_ADDR, json.result.song.blockchain_id)
            }
        }
    }

    _getMeatadata = async (contractAddr, hashId, ) => {
        const result = await GetHashrightMetadata(contractAddr, hashId);
        if (result !== null && result !== undefined && result !== '') {
            this.setState({
                blockchain_metadata : JSON.parse(result[0]),
            })
        }
    }

    _handleInputChange = (event) => {
        const { target: { files, id, value } } = event;
        if (id === "selected_music_file") {
            if (files[0] === undefined) {
                return;
            }    
            this.setState({
                [id]: files[0],
            })
        } else {
            this.setState({
                [id]: value,
            })
        }
    }
}

export default Container;