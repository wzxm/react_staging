import actions from '../../actions/index.js';
import { connect } from 'react-redux';
let MyList = require('../../components/list/index.js');

import { Link, browserHistory } from 'react-router';

class testPage extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return true;
	}
	handleClick () {
		let { dispatch } = this.props;
		let action = actions.testPageActions;
		dispatch(action.addItem((Math.random()*100).toFixed(2)));
	}

	render(){
		let { state } = this.props;
		
		return (
			<div className="page" id="testPage" data-router="#testPage">
				<MyList data={state.items} />
				<button onClick={this.handleClick.bind(this)}>增加一条</button>
				<ul role="nav">
					<li><Link to="/user" activeStyle={{color: 'red'}}>User</Link></li>
					<li><Link to="/repos">Repos</Link></li>
				</ul>
			</div>
		);
	}
}

//mapStateToProps
function select(state) {
    return {
    	state: state.testPageReducer
    }
}

export default connect(select)(testPage);