import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing, GameList, AppVersion } from '_components/core';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends Component {
	render = ({ dashboard }) => {
	  if (dashboard.fetching) {
	    return <LoaderRing fullpage />;
	  }

	  if (!dashboard.data) {
	    return <h1>No Record Found!</h1>;
	  }

	  return (
	    <div className="dashboard">
	      {dashboard.data.map((props) => {
	        // eslint-disable-next-line react/jsx-props-no-spreading
	        return <GameList {...props} />;
	      })}
	      <AppVersion />
	    </div>
	  );
	};
}
export default connect(['dashboard'])(Dashboard);
