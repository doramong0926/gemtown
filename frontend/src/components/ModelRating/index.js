import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, model } = state;
    return {
        pathname: location.pathname,

        rating_model_expansion_list: model.rating_model_expansion_list,
        
        model_filter: model.model_filter,
        modelFilterList: model.modelFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchRatingModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },           
        SaveRatingModelExpansion: (rating_model_expansion_list) => {
            dispatch(ActionCreator.SaveRatingModelExpansion(rating_model_expansion_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)