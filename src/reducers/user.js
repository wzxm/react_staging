/**
 * Created by wangzhe on 2016/12/7.
 */
import { fromJS } from 'immutable';

export default (state = {
    users: []
}, action) => {
    let newState;
    switch (action.type) {
        case 'user/ADD':
            state.users.push(action.data);
            return fromJS(state).set("users", state.items).toJS();;
        default:
            return state;
    }
};