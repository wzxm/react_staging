import 'es6-promise'
import fetch from 'isomorphic-fetch'
import fetchJsonp from 'fetch-jsonp'

export default {
	addItem: (data) => {
		return {
			type: 'testPage/ADDITEM',
			data: data
		};
	}
}