import React from "react";
import PropTypes from "prop-types";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";

const BottomAdvertising = (props, context) => {
    const backgroundImage = {
        backgroundImage : "url(" + props.advertisingInfo.path + ")"
    };
    return (
        <div className={styles.RootDivision}>
            <div className={styles.InnerDivision} style={backgroundImage} >
                <div className={styles.TitleDivision}>
                    <p className={styles.Text}>{props.advertisingInfo.title}</p>
                </div>
                <div className={styles.ButtonDivision}>
                    <p className={styles.Text}>{props.advertisingInfo.buttonText}</p>
                </div>
            </div>   
        </div>
    )
}


BottomAdvertising.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    advertisingInfo: PropTypes.object.isRequired,
    advertisingType: PropTypes.string.isRequired,
}

BottomAdvertising.contextTypes = {
    t: PropTypes.func.isRequired
};

export default BottomAdvertising;