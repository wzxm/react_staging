import "./index.scss"
class MyList extends React.Component {
	render () {
		return (
			<ul className="myList">{this.props.data.map(function(item, index){
				return <li key={index}>{item}</li>
			})}</ul>
		)
	}
};
module.exports = MyList;