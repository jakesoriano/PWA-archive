import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchMembers } from '_mutations';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Members extends Component {
	componentDidMount = () => {
	  const { members } = this.props;
	  if (!members.result && !members.fetching) {
	    fetchMembers();
	  }
	};

	render = ({ members }) => {
	  if (!members.result) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <dv className={style.membersWrap}>
				{members.data.map(item => (
					<div className={style.item}>
						<ImageLoader 
							src={item.image}
							style={{container: style.avatar}} />
						<div className={style.nameMember}>
							<div>
								<p className={`light ${style.name}`}>{`${item.fname} ${item.lname}, ${item.region}. ${item.municipality}`}</p>
								<p className={`light ${style.members}`}>{`${item.members} ${getTranslation('MEMBERS')}`}</p>
							</div>
						</div>
					</div>
				))}
			</dv>
	  );
	};
}
export default connect(['members'])(Members);
