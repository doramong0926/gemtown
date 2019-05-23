import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { 
    Divider, 
    Button,
} from 'semantic-ui-react'
import ReactSVG from 'react-svg';
import { 
    NETWORK, 
    NETWORK_TYPE 
} from "../../config/constants"

const ModelVerifier = (props, context) => {
    return(
        <div className={styles.RootDivision}>
            <div className={styles.OutterDivision}>           
                <div className={styles.SelectFileFormDivision}>
                    <RenderSelectFile {...props} />
                </div>
                <RenderSubmitButton {...props} />  
                <RenderContentInfo {...props}/>                    
                <RenderBlockChainInfo {...props}/>                
            </div>        
        </div>
    )
}

const RenderBlockChainInfo = (props, context) => {
    if (props.blockchain_metadata === null || props.blockchain_metadata === undefined) {
        return null
    } else {
        return (
            <React.Fragment>
                <RenderTitle 
                    icon={require("images/icons/svg/home_music_icon.svg")}
                    titleText={context.t("Blockchain Info.")}
                />  
                <div className={styles.BlockchainInfoDivision}>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Hashright ID.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.db_model_photo.blockchain_id}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Transction ID.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                        {
                            NETWORK === NETWORK_TYPE.ROPSTEN ? 
                            (
                                <a 
                                    href={`https://ropsten.etherscan.io/tx/${props.db_model_photo.blockchain_txid}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.TxidText}
                                >
                                    {props.db_model_photo.blockchain_txid}
                                </a>
                            ) :
                            (
                                <a 
                                    href={`https://etherscan.io/tx/${props.db_model_photo.blockchain_txid}`} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.TxidText}
                                >
                                    {props.db_model_photo.blockchain_txid}
                                </a>
                            )
                        }
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Type of contents")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.blockchain_metadata.properties.contents_type}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Hash")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.blockchain_metadata.hash}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Publisher.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.blockchain_metadata.properties.publisher}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Country.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.blockchain_metadata.properties.country}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Vender.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.blockchain_metadata.properties.vender}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Vender Homepage.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <a 
                                href={`${props.blockchain_metadata.properties.vender_homepage}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.Text}
                            >
                                {props.blockchain_metadata.properties.vender_homepage}
                            </a>
                        </div>
                    </div>          
                </div>
            </React.Fragment>   
        )
    }
}

const RenderContentInfo = (props, context) => {
    if (props.db_hash === null || props.db_hash === undefined || props.db_hash === "") {
        return null
    } else {
        return (
            <React.Fragment>
                <Divider />
                <RenderTitle 
                    icon={require("images/icons/svg/home_music_icon.svg")}
                    titleText={context.t("Content Info.")}
                />
                <div className={styles.TagDivision}>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("TAG Info.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.db_copyright}
                            </p>
                        </div>
                    </div>
                    <div className={styles.InnerDivision}>
                        <div className={styles.LeftDivision}>
                            <p className={styles.Text}>
                                {context.t("Hash.")}
                            </p>
                        </div>
                        <div className={styles.RightDivision}>
                            <p className={styles.Text}>
                                {props.db_hash}
                            </p>
                        </div>
                    </div>
                    <RenderModelPhotoInfo {...props} />                    
                </div>
            </React.Fragment>
        )
    }
}

const RenderModelPhotoInfo = (props, context) => {
    if (props.db_model_photo === undefined || props.db_model_photo === null) {
        return (
            <div className={styles.InnerDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>
                        {context.t("Model photo")}
                    </p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}></p>
                </div>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>
                            {context.t("Modeler")}
                        </p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.db_model_photo.modeler.nickname}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>
                            {context.t("Photo Type")}
                        </p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.db_model_photo.photo_type}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 

const RenderTitle = (props, context) => {
    return (
        <div className={styles.TitleDivision}>
            <ReactSVG
                className={styles.LeftSvgIcon} 
                src={props.icon}
                svgStyle={{width: "50px", height: "50px"}}
            />
            <p className={styles.Text}>{context.t(`${props.titleText}`)}</p>
        </div>
    )
}

const RenderSubmitButton = (props, context) => {
    return (
        <div className={styles.SubmitDivision}>
            <Button 
                disabled={props.selected_model_photo_file === null || props.selected_model_photo_file === undefined}
                className={styles.SubmitButton}
                onClick={props.handleOnSubmit}
            >
                {context.t('VERIFY')}
            </Button>
        </div>
    )
}

const RenderSelectFile = (props, context) => {
    let modelPhotoFileRef = React.createRef();
    return (        
        <div className={styles.SelectFileDivision}>
            <div className={styles.SelectedInput}>
                <input 
                    type='file' 
                    accept="image/jpeg"
                    onChange={props.handleInputChange}
                    id='selected_model_photo_file'
                    ref={modelPhotoFileRef}                        
                />
                <p className={
                    (props.selected_model_photo_file === undefined || props.selected_model_photo_file === null)
                    ?  styles.FilenamePlaceholderText : styles.FilenameText}
                >
                    <span className={styles.StarText}>*</span>
                    {
                        props.selected_model_photo_file === undefined || props.selected_model_photo_file === null
                        ? context.t('파일선택 (Choose Your File)') 
                        : props.selected_model_photo_file.name
                    }
                </p>
            </div>
            <div className={styles.FileRegisterRightDivision}>
                <div 
                    className={styles.DefaultIconDivision}
                    onClick={()=> {
                        modelPhotoFileRef.current.click()
                    }}
                >
                    <p className={styles.DefaultIconText}>{context.t("REGISTER")}</p>
                </div>
            </div>                
        </div>
    )
}

ModelVerifier.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    selected_model_photo_file: PropTypes.any, 
    db_copyright: PropTypes.string.isRequired,
    db_hash: PropTypes.string.isRequired,
    db_model_photo: PropTypes.object,
    blockchain_metadata: PropTypes.object,
}

ModelVerifier.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderModelPhotoInfo.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSubmitButton.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSelectFile.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderTitle.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderContentInfo.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderBlockChainInfo.contextTypes = {
    t: PropTypes.func.isRequired,
}

export default ModelVerifier;