import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelUploader from "./presenter";
import _ from "lodash";
import {resize} from "./../../utils/resizeImage"

import { 
    MODEL_UPLOADER_THUMNAIL_WIDTH, 
    MODEL_UPLOADER_THUMNAIL_HEIGHT
} from "./../../config/constants"

class Container extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected_model_cover_image_file: null,  
            selected_model_full_image_file: null,   
            selected_model_half_image_file: null,   
            model_cover_image_file_buf: null,
            model_full_image_file_buf: null,
            model_half_image_file_buf: null,            
            selected_model_gender: '',
            selected_model_age_range: '',
            selected_model_job: [],
            selected_model_entertainment: [],
            selected_model_style: [],
            selected_model_career: "",       
            modeler_nickname: "",              
            model_height: "",
            model_weight: "",
            model_blood_type: "",
            model_age: "",
            model_body_size_bust: "",
            model_body_size_wiast: "",
            model_body_size_hip: "",
            model_birth_year: "",
            model_birth_month: "",
            model_birth_day: "",
            model_description: "",
            terms: false,
            register_block_chain: '1',
            visibleResultModal: false,
            upload_result: false,
            resultMessage: "",
            visibleConfirmModal: false,
            confirmData: null,
        };    
    }

    static propTypes = {
        userInfo: PropTypes.shape({
            modeler: PropTypes.shape({
                nickname: PropTypes.string,
            }),
        }),
        pathname: PropTypes.string.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        userid: PropTypes.string,
        FetchMypostedModel: PropTypes.func.isRequired,
        SaveMypostedModel: PropTypes.func.isRequired,
        FetchAddModelProfile: PropTypes.func.isRequired,
        token: PropTypes.string,
        SaveNewModel: PropTypes.func.isRequired,
        SaveRatingModel: PropTypes.func.isRequired,
        SaveNewModelExpansion: PropTypes.func.isRequired,
        SaveRatingModelExpansion: PropTypes.func.isRequired,
    }
    
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        return (
            <ModelUploader             
                selected_model_gender={this.state.selected_model_gender}
                selected_model_age_range={this.state.selected_model_age_range}
                selected_model_job={this.state.selected_model_job}                
                selected_model_entertainment={this.state.selected_model_entertainment}                
                selected_model_style={this.state.selected_model_style}                
                selected_model_career={this.state.selected_model_career}  
                selected_model_cover_image_file={this.state.selected_model_cover_image_file}        
                selected_model_full_image_file={this.state.selected_model_full_image_file}        
                selected_model_half_image_file={this.state.selected_model_half_image_file}         
                modeler_nickname={this.state.modeler_nickname}
                model_height={this.state.model_height}                
                model_weight={this.state.model_weight}                 
                model_blood_type={this.state.model_blood_type}       
                model_age={this.state.model_age}       
                model_birth_year={this.state.model_birth_year}      
                model_birth_month={this.state.model_birth_month}      
                model_birth_day={this.state.model_birth_day}      
                model_body_size_bust={this.state.model_body_size_bust}
                model_body_size_wiast={this.state.model_body_size_wiast}
                model_body_size_hip={this.state.model_body_size_hip}
                model_description={this.state.model_description}                
                terms={this.state.terms}
                handleInputChange={this._handleInputChange}       
                handleOnClickFilter={this._handleOnClickFilter}
                handleOnSubmit={this._handleOnSubmit}    
                visibleResultModal={this.state.visibleResultModal}
                upload_result={this.state.upload_result}
                resultMessage={this.state.resultMessage}
                handleCloseResultModal={this._handleCloseResultModal}        
                userInfo_modeler_nickname={
                    (this.props.userInfo.modeler !== null && this.props.userInfo.modeler !== undefined && this.props.userInfo.modeler !== "")
                        ? this.props.userInfo.modeler.nickname
                        : null
                }
                visibleConfirmModal={this.state.visibleConfirmModal}
                handleCloseConfirmModal={this._handleCloseConfirmModal.bind(this)}
                handleConfirm={this._handleConfirm.bind(this)}
                confirmData={this.state.confirmData}                
            />
        )
    }

    _handleCloseResultModal = () => {
        this.setState({
            visibleResultModal: false,
        })
    }

    _handleOnSubmit = () => {
        const gem_amount = this._calculateGemAmount();
        const data = {
            modeler_nickname: (this.props.userInfo.modeler !== null && this.props.userInfo.modeler !== undefined
                && this.props.userInfo.modeler.nickname !== null && this.props.userInfo.modeler.nickname !== undefined && this.props.userInfo.modeler.nickname !== '')
                ?  this.props.userInfo.modeler.nickname 
                : this.state.modeler_nickname,
            cover_image : this.state.model_cover_image_file_buf,
            full_image : this.state.model_full_image_file_buf,
            half_image : this.state.model_half_image_file_buf,            
            gender: this.state.selected_model_gender,
            age_range: this.state.selected_model_age_range,            
            job: this.state.selected_model_job,
            entertainment: this.state.selected_model_entertainment,
            style: this.state.selected_model_style,
            career: this.state.selected_model_career,
            height: this.state.model_height,
            weight: this.state.model_weight,
            blood_type: this.state.model_blood_type,
            age: this.state.model_age,  
            birth_year: this.state.model_birth_year,  
            birth_month: this.state.model_birth_month,  
            birth_day: this.state.model_birth_day,       
            body_size_bust: this.state.model_body_size_bust,
            body_size_wiast: this.state.model_body_size_wiast,
            body_size_hip: this.state.model_body_size_hip,
            description: this.state.model_description,
            gemAmountToRegister: gem_amount,
            register_block_chain: this.state.register_block_chain,
        }

        this.setState({
            confirmData: data,
            visibleConfirmModal: true,
        })
    }

    _calculateGemAmount = () => {
        return 10;
    }

    _handleCloseConfirmModal = () => {
        this.setState({
            visibleConfirmModal: false,
            confirmData: null,
        })
    }

    _handleConfirm = () => {
        const request_data = {
            modeler_nickname: (this.props.userInfo.modeler !== null && this.props.userInfo.modeler !== undefined
                && this.props.userInfo.modeler.nickname !== null && this.props.userInfo.modeler.nickname !== undefined && this.props.userInfo.modeler.nickname !== '')
                ?  this.props.userInfo.modeler.nickname 
                : this.state.modeler_nickname,
            cover_image : this.state.selected_model_cover_image_file,
            full_image : this.state.selected_model_full_image_file,
            half_image : this.state.selected_model_half_image_file,            
            gender: this.state.selected_model_gender,
            age_range: this.state.selected_model_age_range,            
            job: this.state.selected_model_job,
            entertainment: this.state.selected_model_entertainment,
            style: this.state.selected_model_style,
            career: this.state.selected_model_career,
            height: this.state.model_height,
            weight: this.state.model_weight,
            blood_type: this.state.model_blood_type,
            age: this.state.model_age,  
            birth_year: this.state.model_birth_year,  
            birth_month: this.state.model_birth_month,  
            birth_day: this.state.model_birth_day,       
            body_size_bust: this.state.model_body_size_bust,
            body_size_wiast: this.state.model_body_size_wiast,
            body_size_hip: this.state.model_body_size_hip,
            description: this.state.model_description,
            register_block_chain: this.state.register_block_chain,            
        }        
        this.props.FetchAddModelProfile(this.props.userid, true, this.props.token, request_data, this.FetchAddModelProfileCallback);
    }

    _handleOnClickFilter = (event) => {
        const { target: { id } } = event;
        const name = event.target.getAttribute('name')

        let array = null;
        switch (name) {
            case "selected_model_job":
                array = this.state.selected_model_job
                break;
            case "selected_model_entertainment":
                array = this.state.selected_model_entertainment
                break;
            case "selected_model_style":
                array = this.state.selected_model_style
                break;
            default:
                break;
        }
        
        if (array != null) {
            if (_.find(array, t=>t===id) === undefined) {
                this.setState({
                    [name]: _.concat(array, id)
                })                
            } else {
                this.setState({
                    [name] : _.pull(array, id)
                })
            }
        } else {
            this.setState({
                [name]: id,
            })
        }
    }    

    _handleInputChange = (event, data) => {
        const { target: { files, id, value } } = event;
        const self = this;
        if (id === "terms") {
            this.setState({
                terms: !this.state.terms,
            })
        } else if (id === "selected_model_cover_image_file"
                    || id === "selected_model_full_image_file"
                    || id === "selected_model_half_image_file") {
            if (files[0] === undefined) {
                return;
            }    
            switch (id) {
                case "selected_model_cover_image_file":
                    resize(files[0], MODEL_UPLOADER_THUMNAIL_WIDTH, MODEL_UPLOADER_THUMNAIL_HEIGHT, "height", 1, function (resizedDataUrl) {
                        self.setState({ 
                            model_cover_image_file_buf: resizedDataUrl 
                        });
                    });
                    break;
                case "selected_model_full_image_file":
                    resize(files[0], MODEL_UPLOADER_THUMNAIL_WIDTH, MODEL_UPLOADER_THUMNAIL_HEIGHT, "height", 1, function (resizedDataUrl) {
                        self.setState({ 
                            model_full_image_file_buf: resizedDataUrl 
                        });
                    });
                    break;
                case "selected_model_half_image_file":
                    resize(files[0], MODEL_UPLOADER_THUMNAIL_WIDTH, MODEL_UPLOADER_THUMNAIL_HEIGHT, "height", 1, function (resizedDataUrl) {
                        self.setState({ 
                            model_half_image_file_buf: resizedDataUrl 
                        });
                    });
                    break;
                default:
                    break;
            }
            this.setState({
                [id]: files[0],
            })
        } else if (data.id === "model_blood_type") {
            this.setState({
                [data.id]: data.value,
            })
        } else {
            this.setState({
                [id]: value,
            })
        }
    }

    FetchAddModelProfileCallback  = (result, json) => {
        this.setState({
            visibleConfirmModal: false,
        })
        if (result === true) {
            this.setState({
                upload_result: true,
                visibleResultModal: true,
                resultMessage: json === null || json === undefined ? "" : json.message,
            })
            this.setState({
                selected_model_gender: '',
                selected_model_age_range: '',
                selected_model_job: [],
                selected_model_entertainment: [],
                selected_model_style: [],
                selected_model_career: '',
                selected_model_cover_image_file: null,
                selected_model_full_image_file: null,
                selected_model_half_image_file: null,
                modeler_nickname: '',
                model_height: '',
                model_weight: '',
                model_blood_type: '',
                model_age: '',
                model_birth_year: '',
                model_birth_month: '',
                model_birth_day: '',
                model_body_size_bust: '',
                model_body_size_wiast: '',
                model_body_size_hip: '',
                model_description: '',
                terms: false,
                confirmData: null,
                model_cover_image_file_buf: null,
                model_full_image_file_buf: null,
                model_half_image_file_buf: null,
            })
            this.props.FetchMypostedModel(this.props.userid, false, this.FetchMypostedModelCallback);
            this.props.SaveNewModel([]);
            this.props.SaveRatingModel([]);
            this.props.SaveNewModelExpansion([]);
            this.props.SaveRatingModelExpansion([]);
        } else {
            this.setState({
                upload_result: false,
                visibleResultModal: true,
                resultMessage: json === null || json === undefined ? "" : json.message,
            })
        }
    }

    FetchMypostedModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveMypostedModel(json.result)
        }
    }
}

export default Container;