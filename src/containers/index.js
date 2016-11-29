import '../lib/css/m-base.css';
import '../lib/css/router.css';
import '../lib/js/compatible.js';
let PageRouter = require('../lib/js/router.js');
import TestPage from './testPage/index.js';
import reducers from '../reducers/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers);

class Root extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<TestPage />
			</Provider>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById("container"));


window.router = new PageRouter({
    hash:"#testPage", 
    params: {
        title: "测试哦"
    }
});