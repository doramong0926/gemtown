import React from "react";
import PropTypes from "prop-types";
import { Dot } from "pure-react-carousel";
import { Button, Container } from "semantic-ui-react";

import styles from "./styles.module.scss";

const CustomDotGroup = (props, context) => {
    return (
    <Container textAlign="center">
        <Button.Group size={props.size}>
            {[...Array(props.slides).keys()].map(slide => (
                <Button
                    className={styles.Button}
                    as={Dot}
                    key={slide}
                    //icon="circle"
                    slide={slide}
                />
            ))}
        </Button.Group>
    </Container>
    )
}

CustomDotGroup.defaultProps = {
    size: "mini"
};

CustomDotGroup.propTypes = {
    slides: PropTypes.number.isRequired,
    size: PropTypes.string
}

CustomDotGroup.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CustomDotGroup;

