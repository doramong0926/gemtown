import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, model } = state;
    return {
        pathname: location.pathname,

        new_model_expansion_list: model.new_model_expansion_list,
        
        model_filter: model.model_filter,
        modelFilterList: model.modelFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchNewModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewModelExpansion: (new_model_expansion_list) => {
            dispatch(ActionCreator.SaveNewModelExpansion(new_model_expansion_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)