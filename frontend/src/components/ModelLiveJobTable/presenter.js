import React from "react";
import PropTypes from "prop-types";
import {
    Card,
} from "semantic-ui-react";

import styles from "./styles.module.scss";

const ModelLiveJobTable = (props, context) => (
    <div className={styles.RootDivision}>
        <RenderLiveJob />
    </div>
)

const RenderLiveJob = (props, context) => {
    return (
        <div className={styles.OutterDivision}>
            <div className={styles.InnerDivision}>
                <div className={styles.CardDivision}>
                    <CardPost />
                </div>
                <div className={styles.CardDivision}>
                    <CardPost />
                </div>
            </div>
            <div className={styles.InnerDivision}>
                <div className={styles.CardDivision}>
                    <CardPost />
                </div>
                <div className={styles.CardDivision}>
                    <CardPost />
                </div>
            </div>
        </div>
    )
}

const CardPost = (props, context) => {
    return (
        <Card className={styles.Card}>
            <div className={styles.ImageDIvision}>
            </div>
            <div className={styles.TitleDivision}>
                <p className={styles.TitleText}>POST WITH IMAGE</p>
                <p className={styles.SubTitleText}>17 OCT</p>
            </div>
            <div className={styles.DescriptionDivision}>
                <p className={styles.Text}>
                    {context.t("The practical consequence […is…] for the first time, a way for one Internet user to transfer a unique piece of digital property to another Internet user, such that the transfer is guaranteed to be safe and secure, everyone knows that the transfer has taken place, and nobody can challenge the legitimacy of the transfer. The consequences of this breakthrough are hard to overstate.")}
                </p>
            </div>
            <div className={styles.ButtonDivision}>
                <div className={styles.Button}>
                    <p className={styles.Text}>{context.t("READ MORE")}</p>
                </div>
            </div>
        </Card>
    )
}


ModelLiveJobTable.propTypes = {
}

ModelLiveJobTable.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderLiveJob.contextTypes = {
    t: PropTypes.func.isRequired
};

CardPost.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ModelLiveJobTable;
