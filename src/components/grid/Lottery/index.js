import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing, GameList } from '_components/core';

// eslint-disable-next-line react/prefer-stateless-function
class Lottery extends Component {
	render = ({ title, moreLink, lottery }) => {
	  if (lottery.fetching) {
	    return <LoaderRing fullpage />;
	  }

	  if (!lottery.data) {
	    return <h1>No Record Found!</h1>;
	  }

	  const p = {
	    title,
	    moreLink,
	    games: lottery.data
	  };
	  // eslint-disable-next-line react/jsx-props-no-spreading
	  return <GameList {...p} />;
	};
}
export default connect(['lottery'])(Lottery);
