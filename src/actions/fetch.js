import 'es6-promise'
import fetch from 'isomorphic-fetch'
import fetchJsonp from 'fetch-jsonp'

export default {
    fetchJsonp: () => {
        fetchJsonp('https://cms.ppmoney.com/json/57eb758209c131dc7243ec3f.json')
        .then(function(res){
            return res.json();
        }).then((json) => {
            console.log(json)
        })
        .catch(function(err){
            console.log(err)
        })
    }
    
}