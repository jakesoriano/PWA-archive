import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing } from '_components/core';
import { getTranslation } from '_helpers';

// eslint-disable-next-line react/prefer-stateless-function
class PageTitle extends Component {
	constructor (props) {
		super(props);
	}

	componentDidMount = (props) => {
	};

	render = ({ title }) => {
	  return <h1>{title}</h1>;
	};
}
export default connect(['authUser'])(PageTitle);
