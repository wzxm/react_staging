import '../lib/css/m-base.css';
//import '../lib/css/router.css';
import '../lib/js/compatible.js';
//let PageRouter = require('../lib/js/router.js');
import TestPage from './testPage/index.js';
import User from './user/index';
import reducers from '../reducers/index.js';

import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers);

class Root extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={TestPage} />
					<Route path="/user" component={User}/>
				</Router>
			</Provider>
		)
	}
}
ReactDOM.render(<Root />, document.getElementById("container"));