import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing, GameList } from '_components/core';

// eslint-disable-next-line react/prefer-stateless-function
class Games extends Component {
	render = ({ title, moreLink, games }) => {
	  if (games.fetching) {
	    return <LoaderRing fullpage />;
	  }

	  if (!games.data) {
	    return <h1>No Record Found!</h1>;
	  }

	  const p = {
	    title,
	    moreLink,
	    games: games.data
	  };
	  // eslint-disable-next-line react/jsx-props-no-spreading
	  return <GameList {...p} />;
	};
}
export default connect(['games'])(Games);
