import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Image,
    Button,
    Icon,
    Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss"

const MusicCoverSelectorModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            // dimmer={'blurring'}
            // closeIcon
            basic
            className={styles.rootDivision}
            style={{color:'black'}}
        >        
            <Segment className={styles.SegmentDivision}>       
                <Modal.Content scrolling>
                    <div className={styles.FreeCoverDivision}>
                        <div className={styles.TitleDivision}>
                            <p className={styles.Text}>{context.t("무료 앨범커버 이미지 (Default Image)")}</p>
                        </div>
                        <div className={styles.CoverImageListDivision}>
                            <RenderFreeCoverImage {...props} />
                        </div>
                    </div>
                    <div className={styles.PaidCoverDivision}>
                        <div className={styles.TitleDivision}>
                            <p className={styles.Text}>{context.t("유료 앨범커버 이미지 (Paid Album Title Image)")}</p>
                        </div>
                        <div className={styles.CoverImageListDivision}>
                            <RenderPaidCoverImage {...props} />
                        </div>
                    </div>
                </Modal.Content>
                
                <Modal.Actions>
                    <div className={styles.ButtonDivision}>
                        <Button className={styles.Button} onClick={props.handleClose}>
                            <Icon name='cancel' />{context.t('취소')}
                        </Button>
                    </div>
                </Modal.Actions>
            </Segment>
        </Modal>
    )
}

const RenderFreeCoverImage = (props, context) => {
    if (props.music_cover_list === null || props.music_cover_list === undefined || props.music_cover_list === '') {
        return null
    } else {
        return (        
            props.music_cover_list.map( (t, index) => {
                if (parseInt(t.price) === 0) {
                    return (
                        <div 
                            key={index} 
                            className={styles.CoverImageDivision}
                            onClick={()=>{props.handleSelect(t)}}
                        >
                            <div className={styles.ImageDivision}>
                                <Image 
                                    src= {`${t.file}`}
                                    size="small"
                                    className={styles.Image}
                                    alt="music cover image"                                    
                                />
                            </div>
                        </div>
                    )
                } else {
                    return null;
                }
            })
        )
    }
}

const RenderPaidCoverImage = (props, context) => {
    if (props.music_cover_list === null || props.music_cover_list === undefined || props.music_cover_list === '') {
        return null
    } else {
        return (        
            props.music_cover_list.map( (t, index) => {
                if (parseInt(t.price) !== 0) {
                    return (
                        <div 
                            key={index} 
                            className={styles.CoverImageDivision}
                            onClick={()=>{props.handleSelect(t)}}
                        >
                            <div className={styles.ImageDivision}>
                                <Image 
                                    src= {`${t.file}`}
                                    size="small"
                                    className={styles.Image}
                                    alt="music cover image"
                                />
                            </div>
                            <div className={styles.PriceDivision}>
                                <p className={styles.Text}>@</p>
                                <p className={styles.Text}>{t.price}</p>
                            </div>
                        </div>
                    )
                } else {
                    return null;
                }
            })
        )
    }
}


MusicCoverSelectorModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    music_cover_list: PropTypes.array,
    handleClose: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
}

MusicCoverSelectorModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default MusicCoverSelectorModal;
