/**
 * Created by wangzhe on 2016/12/7.
 */
import actions from '../../actions/index.js';
import { connect } from 'react-redux';
let MyList = require('../../components/list/index.js');

class UserPage extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        return true;
    }
    handleClick () {
        let { dispatch } = this.props;
        let action = actions.fetch;
        dispatch(action.fetchJsonp());
    }
    render(){
        let { state } = this.props;

        return (
            <div className="page" id="user" data-router="#user">
                <button onClick={this.handleClick.bind(this)}>获取数据</button>
            </div>
        );
    }
}

//mapStateToProps
function select(state) {
    return {
        state: state.userReducer
    }
}

export default connect(select)(UserPage);