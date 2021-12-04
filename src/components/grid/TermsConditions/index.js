import { Component } from 'preact';

// eslint-disable-next-line react/prefer-stateless-function
class TermsConditions extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isRead: false
    };
  }

	componentDidMount = () => {};

	checkIfRead = () => {
	  this.setState({
	    isRead: true
	  });
	};

	render = () => {
	  return (
	    <div className="termsWrapper">{this.state.isRead ? <h1>test</h1> : ''}</div>
	  );
	};
}
export default TermsConditions;
