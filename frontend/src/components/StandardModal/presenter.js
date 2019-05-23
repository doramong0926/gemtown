import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Header,
    Button,
    Icon,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const StandardModal = (props, context) => {
    return (        
        <Modal
            open={props.visible}
            onClose={props.handleClose}
            size={props.size}
            // dimmer={'blurring'}
            // closeIcon
        >
            <Modal.Header className={styles.HederBox}>
                <h2>{props.title}</h2>
            </Modal.Header>
            <Modal.Content image scrolling className={styles.ContentBox}>
                <Modal.Description>
                    {_renderModalContents(props.contents)}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={props.handleClose}>
                <Icon name='checkmark' />{context.t('닫기')}
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

const _renderModalContents = (contents) => {
    return (        
        contents.map( (t, index) => {
            return (
                <div key={index}>
                    <Header className={styles.TitleText}>{t.title}</Header>
                    <div className={styles.DescriptionBox}>
                        {
                            t.text.map( (t, index) =>{
                                return (<p key={index}>{t}</p>)
                            })
                        }
                    </div>
                </div>
            )
        })
    )
}

StandardModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
}

StandardModal.contextTypes = {
    t: PropTypes.func.isRequired
};


export default StandardModal;
