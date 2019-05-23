import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelVerifier from "./presenter";
import { GetHashrightMetadata } from "../../utils/web3Control"

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected_model_photo_file: null,
            db_copyright: "",
            db_hash: "",
            db_model_photo: null,
            blockchain_metadata: null,
        };    
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.string,
        VerifyModelPhotoContent: PropTypes.func.isRequired,
    }
    
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        return (
            <ModelVerifier 
                handleInputChange={this._handleInputChange}     
                handleOnSubmit={this._handleOnSubmit}          
                selected_model_photo_file={this.state.selected_model_photo_file}  
                db_copyright={this.state.db_copyright}
                db_hash={this.state.db_hash}
                db_model_photo={this.state.db_model_photo}
                blockchain_metadata={this.state.blockchain_metadata}
            />
        )
    }

    _handleOnSubmit = () => {
        this.setState({
            db_copyright: "",
            db_hash: "",
            db_model_photo: null,
            blockchain_metadata: null,
        })
        this.props.VerifyModelPhotoContent(this.state.selected_model_photo_file, this.props.token, true, this._VerifyModelPhotoContentCallback)
    }
    
    _VerifyModelPhotoContentCallback = (result, json) => {
        if (result === true) {
            console.log(json.result)
            this.setState({
                db_copyright: json.result.copyright,
                db_hash: json.result.hash,
                db_model_photo: json.result.modelphoto !== undefined && json.result.modelphoto !== null  ? json.result.modelphoto : null,
            })    
            if (json.result.modelphoto.blockchain_id !== undefined && json.result.modelphoto.blockchain_id !== null && json.result.modelphoto.blockchain_id !== '') {
                this._getMeatadata(process.env.REACT_APP_CONTRACT_ADDR, json.result.modelphoto.blockchain_id)
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
        if (id === "selected_model_photo_file") {
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