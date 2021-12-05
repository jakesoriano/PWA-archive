import { Component } from 'preact';
import { connect } from 'unistore/preact';

// eslint-disable-next-line react/prefer-stateless-function
class PageTitle extends Component {
	componentDidMount = () => {};

	render = ({ title }) => {
	  return <h1>{title}bagooom</h1>;
	};
}
export default connect(['authUser'])(PageTitle);
