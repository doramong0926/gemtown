import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, i18nState } = state;
    return {
        pathname: location.pathname,
        lang: i18nState.lang,
    };
};

export default connect(mapStateToProps)(Container);