import * as userAction from './userAction';
import * as spinnerAction from './spinnerAction';
import * as musicAction from './musicAction';
import * as modelAction from './modelAction';
import * as musicPlayerAction from './musicPlayerAction';
import * as gemAction from './gemAction';
import * as advertisingAction from './advertisingAction';

const ActionCreator = Object.assign({},
    userAction,
    spinnerAction,
    musicAction,
    modelAction,
    musicPlayerAction,
    gemAction,
    advertisingAction,
);

export default ActionCreator;
