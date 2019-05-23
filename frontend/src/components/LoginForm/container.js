import React, { Component } from "react";
import PropTypes from "prop-types"
import LoginForm from "./presenter";
import "isomorphic-fetch";
import { SERVER_ERROR_TYPE } from "./../../config/constants";

class Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: '',
            password: '',
            visibleErrorModal: false,
            isEnableSubmit: false,
            loginFailReason: null,
            isRememberme: false,
        }
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    static porpTypes = {
        Login: PropTypes.func.isRequired,
        changeMode: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        rememberme: PropTypes.string,
        SaveRememberMe: PropTypes.func.isRequired,
    }

    componentDidMount() {
        if (this.props.rememberme !== null && this.props.rememberme !== undefined && this.props.rememberme !== "") {
            this.setState({
                username: this.props.rememberme,
                isRememberme: true,
            })
        }
    }

    render() {
        const { username, password} = this.state;
        return (
            <LoginForm 
                username={username} 
                password={password} 
                handleInputChange = {this._handleInputChange}
                handleSubmit = {this._handleSubmit}
                visibleErrorModal = {this.state.visibleErrorModal}
                handleCloseErrorModal = {this._handleCloseErrorModal}
                isEnableSubmit = {this.state.isEnableSubmit}
                changeMode = {this.props.changeMode}
                loginFailReason = {this.state.loginFailReason}
                isMobile = {this.props.isMobile}
                handleClickForgotPassword = {this._handleClickForgotPassword}
                handelClickRememberMe = {this._handelClickRememberMe}
                isRememberme = {this.state.isRememberme}
            />
        )
    }

    _handelClickRememberMe = () => {
        const isRememberme = this.state.isRememberme;
        if (isRememberme === true) {
            this.props.SaveRememberMe('');
        }
        this.setState({
            isRememberme: !isRememberme,
        })
    }

    _isEnableSubmit = () => {
        const { username, password } = this.state;
        if (username === "" || password === "") {
            this.setState({
                isEnableSubmit: false
            })
        } else {
            this.setState({
                isEnableSubmit: true
            })
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        })
        setTimeout(() => {
            this._isEnableSubmit()
        }, );
    }

    _handleCloseErrorModal = () => {
        this.setState({
            visibleErrorModal: false,
        })
    }
    _logInResultCallback = (result, json) => {
        if (result === false) {
            this._setErrorModalText(json)
            this.setState({
                visibleErrorModal: true,
            })
        }
        this.setState({
            username: "",
            password: "",
        })
    }

    _handleSubmit = (event) => {
        const {username, password} = this.state;
        this.props.Login(username, password, this.state.isRememberme, this._logInResultCallback.bind(this));        
    }

    _handleClickForgotPassword = () => {
        ;
    }

    _setErrorModalText = (json) => {
        if (json.non_field_errors !== undefined) {
            switch (json.non_field_errors.toString()) {
                case SERVER_ERROR_TYPE.LOGIN_EMAIL_IS_NOT_VERIFIED.toString():
                    this.setState({
                        loginFailReason: this.context.t("이메일 인증이 완료되지 않았습니다."),
                        username: "",
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        loginFailReason: this.context.t("이메일과 패스워드를 정확히 입력해 주세요."),
                        username: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
    }
}

export default Container;