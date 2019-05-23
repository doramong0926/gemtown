import React, { Component } from "react";
import PropTypes from "prop-types";
import UploadContents from "./presenter";
import { 
    CONTENTS_TYPE,
} from "./../../config/constants"

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedMenu: CONTENTS_TYPE.MUSIC,
        };    
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
            username: PropTypes.string.isRequired,
            musician_creator: PropTypes.shape({
                nickname: PropTypes.string,
            }),
            email: PropTypes.string,
            user_class: PropTypes.string.isRequired,
            first_name: PropTypes.string,
            last_name: PropTypes.string,
            country: PropTypes.string,
        }),
        FetchMypostedMusic: PropTypes.func.isRequired,
        SaveMypostedMusic: PropTypes.func.isRequired,
        FetchMypostedModel: PropTypes.func.isRequired,
        SaveMypostedModel: PropTypes.func.isRequired,
        myposted_music_list: PropTypes.array,
        myposted_model_list: PropTypes.array,
        isLoggedIn: PropTypes.bool.isRequired,
        userid: PropTypes.string,
        FetchPurchaseGem: PropTypes.func.isRequired,
        token: PropTypes.string,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.isLoggedIn === true && this.props.userid !== null && this.props.userid !== undefined) {
            this.props.FetchMypostedMusic(this.props.userid, true, this.FetchMypostedMusicCallback);
            this.props.FetchMypostedModel(this.props.userid, true, this.FetchMypostedModelCallback);
        }
    }    

    render() {
        if (this.props.userInfo === null || this.props.userInfo === null) {
            return null;
        } else {
            return (
                <UploadContents 
                    userInfo={this.props.userInfo}
                    myposted_music_list={this.props.myposted_music_list}
                    myposted_model_list={this.props.myposted_model_list}
                    selectedMenu={this.state.selectedMenu}
                    handleOnClickSubMenu={this._handleOnClickSubMenu}
                    handlePurchaseGem={this._handlePurchaseGem}
                />
            )
        }
    }

    _handlePurchaseGem = () => {
        const request_data = {
            amount : 100,
            purchase_type : "test",
        }
        this.props.FetchPurchaseGem(this.props.userid, true, this.props.token, request_data, this.FetchPurchaseGemCallback);
    }

    _handleOnClickSubMenu = (event) => {
        const { target: { id } } = event;
        this.setState({
            selectedMenu: id,
        })
    }

    FetchMypostedMusicCallback = (result, json) => {        
        if (result === true) {
            this.props.SaveMypostedMusic(json.result)
        }
    }

    FetchMypostedModelCallback = (result, json) => {     
        if (result === true) {
            this.props.SaveMypostedModel(json.result)
        }
    }

    FetchPurchaseGemCallback = (result, json) => {     
        if (result === true) {
        }
    }
}

export default Container;