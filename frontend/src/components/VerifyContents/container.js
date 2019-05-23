import React, { Component } from "react";
import PropTypes from "prop-types";
import VerifyContents from "./presenter";
import { 
    CONTENTS_TYPE,
} from "../../config/constants"

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedMenu: CONTENTS_TYPE.MUSIC,
        };    
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        userid: PropTypes.string,
        token: PropTypes.string,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        if (this.props.userInfo === null || this.props.userInfo === null) {
            return null;
        } else {
            return (
                <VerifyContents 
                    userInfo={this.props.userInfo}
                    selectedMenu={this.state.selectedMenu}
                    handleOnClickSubMenu={this._handleOnClickSubMenu}
                />
            )
        }
    }

    _handleOnClickSubMenu = (event) => {
        const { target: { id } } = event;
        this.setState({
            selectedMenu: id,
        })
    }
}

export default Container;