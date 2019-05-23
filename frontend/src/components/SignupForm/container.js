import React, { Component } from "react";
import PropTypes from "prop-types"
import SignupForm from "./presenter";
import { SERVER_ERROR_TYPE } from "./../../config/constants";
import "isomorphic-fetch";

class Container extends Component {    
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: '',
            password1: '',
            password2: '',
            signupFailReason: null,
            visibleTermsModal: false,
            visibleResultModal: false,
            isAgreeTerms: false,
            isEnableSubmit: false,
            formErrorMessage: this.context.t("아이디/비밀번호를 입력해 주세요."),
            SignupSuccessUsername: null,
        }
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    static porpTypes = {
        Signup: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        changeMode: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
    }

    render() {
        const { username, password1, password2} = this.state;
        return (
            <SignupForm 
                username={username}
                password1={password1} 
                password2={password2} 
                handleInputChange = {this._handleInputChange}
                handleSubmit = {this._handleSubmit}
                signupFailReason = {this.state.signupFailReason}
                visibleTermsModal = {this.state.visibleTermsModal}
                visibleResultModal = {this.state.visibleResultModal}
                handleCloseTermsModal = {this._handleCloseTermsModal}
                handleCloseResultModal = {this._handleCloseResultModal}
                handleOnClickTerms = {this._handleOnClickTerms}
                handelClickAgreeTerms = {this._handelClickAgreeTerms}
                isEnableSubmit = {this.state.isEnableSubmit}
                formErrorMessage = {this.state.formErrorMessage}
                changeMode = {this.props.changeMode}
                SignupSuccessUsername = {this.state.SignupSuccessUsername}
                isMobile = {this.props.isMobile}
            />
        )
    }

    _isEnableSubmit = () => {
        const { isAgreeTerms, username, password1, password2 } = this.state;
        if (username === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("아이디를 입력해 주세요."),
            })
        } else if (password1 === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("첫번째 비밀번호를 입력해 주세요."),
            })
        } else if (password2 === "") {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("두번째 비밀번호를 입력해 주세요."),
            })
        } else if (password1 !== password2) {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("비밀번호가 동일하지 않습니다."),
            })
        } else if (isAgreeTerms === false) {
            this.setState({
                isEnableSubmit: false,
                formErrorMessage: this.context.t("약관 및 정책을 확인하고 동의해 주세요."),
            })
        } else {
            this.setState({
                isEnableSubmit: true,
                formErrorMessage: this.context.t("회원가입 버튼을 눌러주세요."),
            })
        } 
    }

    _handelClickAgreeTerms = (event, data) => {        
        this.setState({
            isAgreeTerms: data.checked,
        })
        setTimeout(() => {
            this._isEnableSubmit();    
        }, );
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        })
        setTimeout(() => {
            this._isEnableSubmit();    
        }, );
    }

    _handleOnClickTerms = () => {
        this.setState({
            visibleTermsModal: true,
        })
    }

    _handleCloseTermsModal = () => {
        this.setState({
            visibleTermsModal: false,
        })
    }

    _handleCloseResultModal = () => {
        this.setState({
            visibleResultModal: false,
        })
    }

    _SignupResultCallback = (result, username, json) => {
        if (result === true) {
            this._setSignupResultReason(json)
            setTimeout(() => {
                if (this.state.signupFailReason !== null) {
                    this.setState({
                        visibleResultModal: true,
                    })
                }
                else {
                    this.setState({
                        SignupSuccessUsername: username,
                    })
                }
            }, );
        }
    }
    
    _handleSubmit = (event) => {
        const { username, password1, password2 } = this.state;
        this.props.Signup(username, password1, password2, this._SignupResultCallback.bind(this));
    }

    _setSignupResultReason = (json) => {
        if (json.token !== undefined) {
            this.setState({                    
                signupFailReason: null,
                username: "",
                password1: "",
                password2: "",
            });  
        }
        else if (json.detail !== undefined) {
            if (json.detail.toString() === SERVER_ERROR_TYPE.SIGN_UP_EMAIL_SENT.toString()) {
                this.setState({                    
                    signupFailReason: null,
                    username: "",
                    password1: "",
                    password2: "",
                });          
            }
        }
        else if (json.username !== undefined) {
            switch (json.username.toString()) {
                case SERVER_ERROR_TYPE.SIGN_UP_USERNAME_EXIST.toString():
                    this.setState({
                        signupFailReason: this.context.t("동일한 아이디가 존재합니다."),
                        username: "",
                        password1: "",
                        password2: "",
                    })
                    break;

                case SERVER_ERROR_TYPE.SIGN_UP_PASSWORD_IS_TOO_SHORT.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력하신 패스워드가 너무 짧습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("아이디와 패스워드를 정확히 입력해 주세요."),
                        username: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
        else if (json.password1 !== undefined) {
            switch (json.password1[0].toString()) {
                case SERVER_ERROR_TYPE.SIGN_UP_PASSWORD_IS_TOO_SHORT.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력하신 패스워드가 너무 짧습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;
                
                case SERVER_ERROR_TYPE.SIGN_UP_PASSWORD_IS_ONLY_NUMERIC.toString():
                    this.setState({
                        signupFailReason: this.context.t("패스워드는 최소한 한개의 문자가 포함되어야 합니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                case SERVER_ERROR_TYPE.SIGN_UP_PASSWORD_IS_TOO_COMMON.toString():
                    this.setState({
                        signupFailReason: this.context.t("패스워드가 너무 평범합니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("아이디와 패스워드를 정확히 입력해 주세요."),
                        username: "",
                        password1: "",
                        password2: "",
                    })
                    break;
            }
        }
        else if (json.non_field_errors !== undefined) {
            switch (json.non_field_errors.toString()) {
                case SERVER_ERROR_TYPE.SIGN_UP_TWO_PASSWORD_IS_NOT_MATCH.toString():
                    this.setState({
                        signupFailReason: this.context.t("입력한 두개의 패스워드가 일치하지 않습니다."),
                        password1: "",
                        password2: "",
                    })
                    break;

                default:
                    this.setState({
                        signupFailReason: this.context.t("아이디와 패스워드를 정확히 입력해 주세요."),
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