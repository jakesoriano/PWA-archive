import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import { getTranslation } from '_helpers';

// eslint-disable-next-line react/prefer-stateless-function
class Account extends Component {
	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (!authUser) {
	    fetchUserData();
	  } else if (authUser) {
	    fetchUserPoints();
	  }
	};

	render = ({ authUser }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className="account-wrap">
	      <div className="account">
	        <h1>
	          {authUser.fname}
	          {' '}
	          {authUser.lname}
	        </h1>
	        <p>
	          {authUser.members}
	          {' '}
	          {getTranslation('MEMBERS')}
	        </p>
	        <p>
	          {authUser.points}
	          {' '}
	          {getTranslation('HERO_POINTS')}
	        </p>
	      </div>
	      <div className="invite">
	        <button type="button">Invite a Member</button>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(Account);
