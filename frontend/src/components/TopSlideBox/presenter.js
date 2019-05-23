import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg'
import {
    Segment,
} from "semantic-ui-react";
import {
    CarouselProvider,
    Image,
    Slide,
    Slider,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import CustomDotGroup from "./../CustomDotGroup";

const TopSlideBox = (props, context) => {
    if (props.slideInfo === null) {
        return (
            <div className={styles.RootDivision}>
            </div>
        )
    } else {
        return (
            <div className={styles.RootDivision}>
                <Segment
                    basic
                    className={styles.SegmentDivision}
                >
                    <CarouselProvider
                        naturalSlideWidth={3.5}
                        naturalSlideHeight={1}
                        totalSlides={props.slideInfo.length}
                    >
                        <Slider>
                            <RenderSlide slideInfo={props.slideInfo} />
                        </Slider>
                        <div
                            className={styles.InnerDivision}
                        >
                            <div className={styles.ArrowDivision}>
                                <ButtonBack
                                    className={styles.ButtonBack}
                                >
                                    <ReactSVG
                                        src={require("images/icons/svg/back_icon.svg")}
                                        svgClassName='SvgArrowLeft'
                                        className={styles.SvgArrowLeft}
                                    />
                                </ButtonBack>
                            </div>
                            <div className={styles.ArrowDivision}>
                                <ButtonNext
                                    className={styles.ButtonNext}
                                >
                                    <ReactSVG
                                        src={require("images/icons/svg/forward_icon.svg")}
                                        svgClassName='SvgArrowRight'
                                        className={styles.SvgArrowRight}
                                    />
                                </ButtonNext>
                            </div>
                        </div>
                        <div className={styles.DotGroup}>
                            <CustomDotGroup slides={props.slideInfo.length} />
                        </div>
                    </CarouselProvider>
                </Segment>
            </div>
        )
    }
};

const RenderSlide = (props) => {
    return (
        props.slideInfo.map((t,index) => {
            return (
                <Slide tag="a" index={index} key={index}>
                    <Image
                        src={t.image}
                        className={styles.Image}
                    />
                </Slide>
            )
        })
    )
}

TopSlideBox.propTypes = {
    handleOnClick: PropTypes.func.isRequired,
    slideInfo: PropTypes.array,
}

TopSlideBox.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TopSlideBox;
