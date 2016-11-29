import { fromJS } from 'immutable';

export default (state = {
    items: ["aaa", "bbb", "ccc"]
}, action) => {
    let newState;
    switch (action.type) {
        case 'testPage/ADDITEM':
            state.items.push(action.data);
            return fromJS(state).set("items", state.items).toJS();;
        default:
            return state;
    }
};